import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardService } from '../card.service';

@Component({
  selector: 'app-addcard-modal',
  templateUrl: './addcard-modal.component.html',
  styleUrls: ['./addcard-modal.component.scss'],
})
export class AddcardModalComponent  implements OnInit {
  formData = {
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
    cardHolderName: ''
  };
  constructor(private modalController: ModalController,private cardService: CardService) { }

  close() {
    this.modalController.dismiss();
  }
  ngOnInit() {}
  submitForm() {
    this.cardService.addCard(this.formData).then(() => {
      console.log('Tarjeta agregada correctamente');
      this.close();
    }).catch(error => {
      console.error('Error al agregar tarjeta:', error);
    });
  }

}
