import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ProductService } from './productos.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';

interface CartItem {
  productId: string;
  quantity: number;
  name?: string;
  price?: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private productService: ProductService
  ) {}

  getCartItems(): Observable<CartItem[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection(`users/${user.uid}/cart`).valueChanges({ idField: 'id' }) as unknown as Observable<CartItem[]>;
        } else {
          return of([]);
        }
      })
    );
  }

  getCartItemsWithProductDetails(): Observable<CartItem[]> {
    return this.getCartItems().pipe(
      switchMap(cartItems => {
        if (cartItems.length === 0) {
          return of([]);
        }
  
        const productDetailObservables$ = cartItems.map(cartItem =>
          this.getProductById(cartItem.productId).pipe(
            map(product => ({
              ...cartItem,
              name: product ? product.title : 'Nombre desconocido',
              price: product ? product.price : 0,
              image: product ? product.image : 'assets/default-image.png',
            })),
            catchError(error => {
              console.error('Error fetching product:', error);
              return of({
                ...cartItem,
                name: 'Nombre desconocido',
                price: 0,
                image: 'assets/default-image.png',
              });
            })
          )
        );
  
        return combineLatest(productDetailObservables$);
      })
    );
  }

  addToCart(productId: string, quantity: number): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const cartRef = this.firestore.collection(`users/${user.uid}/cart`).doc(productId);
        return cartRef.set({ productId, quantity }, { merge: true });
      } else {
        throw new Error('User not logged in');
      }
    });
  }

  removeFromCart(productId: string): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        return this.firestore.collection(`users/${user.uid}/cart`).doc(productId).delete();
      } else {
        throw new Error('User not logged in');
      }
    });
  }

  getProductById(productId: string): Observable<any> {
    return this.productService.getProductById(productId);
  }

  clearCart(): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const batch = this.firestore.firestore.batch();
        return this.firestore.collection(`users/${user.uid}/cart`).get().toPromise().then(snapshot => {
          if (snapshot) { // Comprobación para evitar errores
            snapshot.forEach(doc => {
              batch.delete(doc.ref);
            });
            return batch.commit();
          } else {
            return Promise.resolve(); // Retorna una promesa vacía si no hay snapshot
          }
        });
      } else {
        throw new Error('User not logged in');
      }
    });
  }
}
