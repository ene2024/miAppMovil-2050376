import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddcardModalComponent } from '../addcard-modal/addcard-modal.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  cards: any[] = [];
  selectedCard: any = null;
  cartItems: any[] = [];

  constructor(
    private modalController: ModalController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.firestore.collection(`users/${user.uid}/cards`).valueChanges({ idField: 'id' }).subscribe(cards => {
          this.cards = cards;
        });

        this.firestore.collection(`users/${user.uid}/cart`).valueChanges({ idField: 'id' }).subscribe(cartItems => {
          this.cartItems = cartItems;
        });
      }
    });
  }

  close() {
    this.modalController.dismiss();
  }

  selectCard(card: any) {
    this.selectedCard = card;
  }

  async addCard() {
    const modal = await this.modalController.create({
      component: AddcardModalComponent, 
    });

    return await modal.present();
  }

  pay() {
    this.afAuth.currentUser.then(user => {
      if (!user) {
        console.error('El usuario no está autenticado.');
        return;
      }
  
      const userId = user.uid;
      const batch = this.firestore.firestore.batch();
      this.cartItems.forEach(item => {
        const cartItemRef = this.firestore.collection(`users/${userId}/cart`).doc(item.id);
        const productRef = this.firestore.collection('products').doc(item.productId);
        batch.delete(cartItemRef.ref);
        batch.delete(productRef.ref); // Elimina el producto de la colección products
      });
  
      batch.commit().then(() => {
        console.log('Productos eliminados del carrito y de la colección products.');
        this.cartService.clearCart(); // Limpiar carrito local
        this.modalController.dismiss({ success: true });
      }).catch(error => {
        console.error('Error al eliminar productos del carrito:', error);
      });
    });
  }
}
