import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  getUserData(uid: string) {
    return this.firestore.collection('users').doc(uid).valueChanges();
  }

  updateUserData(user: any) {
    const userRef = this.firestore.collection('users').doc(user.uid);
    return userRef.set(user, { merge: true });
  }
}
