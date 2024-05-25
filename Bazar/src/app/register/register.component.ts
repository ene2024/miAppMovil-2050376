import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  register() {
    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
    } else {
      this.afAuth.createUserWithEmailAndPassword(this.email, this.password).then((result) => {
        // Guardar el nombre de usuario en Firestore
        this.firestore.collection('users').doc(result.user?.uid).set({
          username: this.username,
          email: this.email
        }).then(() => {
          this.router.navigate(['/inicio']);
        }).catch((error) => {
          this.errorMessage = 'Error al guardar el usuario en la base de datos: ' + error.message;
        });
      }).catch((error) => {
        if (error.code === 'auth/invalid-email') {
          this.errorMessage = 'El correo electrónico no tiene un formato válido.';
        } else if (error.code === 'auth/email-already-in-use') {
          this.errorMessage = 'El correo electrónico ya está en uso.';
        } else {
          this.errorMessage = 'Error al registrar. Inténtalo de nuevo más tarde.';
        }
      });
    }
  }
}