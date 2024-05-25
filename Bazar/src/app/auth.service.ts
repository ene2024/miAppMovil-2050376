import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.User | null = null;
  userDisplayName: string | null = null; 

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private firestore: AngularFirestore
  ) { 
    this.afAuth.authState.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.getUserDisplayName(user.uid);
      } else {
        this.userDisplayName = null;
      }
    });
  }

  async getUserDisplayName(userId: string) {
    try {
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();
      if (userDoc && userDoc.exists) {
        const userData = userDoc.data() as { username: string };
        this.userDisplayName = userData.username;
      } else {
        this.userDisplayName = null;
      }
    } catch (error) {
      console.error('Error getting user display name:', error);
      this.userDisplayName = null;
    }
  }

  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error("Error registering", error);
    }
  }

  async getUserProfile(): Promise<firebase.User | null> {
    const userCredential = await this.afAuth.currentUser;
    return userCredential ?? null;
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error("Error logging in", error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error("Error logging out", error);
    }
  }
}
