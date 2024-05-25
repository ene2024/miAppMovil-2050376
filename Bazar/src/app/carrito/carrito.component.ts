import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ProductService } from '../productos.service';
import { ModalController } from '@ionic/angular';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent implements OnInit {
  cartItems: Observable<any> = of([]);
  total: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItemsWithProductDetails().pipe(
      map(items => {
        this.total = items.reduce((acc, item) => {
          if (item.price !== undefined) { // Comprobación para evitar errores
            return acc + (item.price * item.quantity);
          } else {
            return acc;
          }
        }, 0);
        return items;
      })
    );
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId).then(() => {
      console.log('Product removed from cart');
    }).catch(error => {
      console.error('Error removing product from cart:', error);
    });
  }

  async buy() {
    const modal = await this.modalController.create({
      component: PaymentModalComponent,
    });

    modal.onDidDismiss().then(result => {
      if (result.data && result.data.success) {
        this.cartService.clearCart().then(() => {
          console.log('Cart cleared');
        }).catch(error => {
          console.error('Error clearing cart:', error);
        });
      }
    });

    await modal.present();
  }
}
