import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore'; // Importa DocumentReference
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  addCard(cardData: any): Promise<DocumentReference<unknown>> { // Cambia el tipo de retorno
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const cardsCollection = this.firestore.collection(`users/${user.uid}/cards`);
        return cardsCollection.add(cardData);
      } else {
        throw new Error('User not logged in');
      }
    });
  }
}
