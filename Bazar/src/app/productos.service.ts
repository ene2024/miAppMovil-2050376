import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  products$: Observable<Product[]>;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.productsCollection = this.firestore.collection<Product>('products');
    this.products$ = this.productsCollection.valueChanges({ idField: 'id' });
  }

  getProducts(): Observable<any[]> {
    return this.firestore.collection('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  searchProductsByTitle(title: string): Observable<any[]> {
    return this.firestore.collection('products', ref => ref.where('title', '>=', title).where('title', '<=', title + '\uf8ff')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getProductsByCategory(category: string): Observable<any[]> {
    return this.firestore.collection('products', ref => ref.where('category', '==', category)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
        
      }))
    );
  }

  getProductById(productId: string): Observable<Product | undefined> {
    const productDoc: AngularFirestoreDocument<Product> = this.firestore.doc<Product>(`products/${productId}`);
    return productDoc.valueChanges().pipe(
      map(product => {
        if (!product) {
          console.error(`No se encontró el producto con la clave del documento: ${productId}`);
        }
        return product;
      }),
      catchError(error => {
        console.error('Error al obtener el producto:', error);
        return of(undefined);
      })
    );
  }
  

  getUserProducts(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('products', ref => ref.where('userId', '==', user.uid)).valueChanges();
        } else {
          return [];
        }
      })
    );
  }

   
}
