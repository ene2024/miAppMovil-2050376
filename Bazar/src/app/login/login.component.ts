import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Asegúrate de tener configurado AngularFire

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  login() {
    this.afAuth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      this.router.navigate(['/inicio']);
    }).catch((error) => {
      // Manejo de errores específicos
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'Usuario no encontrado. Verifica tu correo electrónico.';
      } else if (error.code === 'auth/invalid-email') {
        this.errorMessage = 'El correo electrónico no tiene un formato válido.';
      } else {
        // Otros errores genéricos
        this.errorMessage = 'Usuario no encontrado. Verifica tu correo electrónico.';
      }
    });
  }
  register() {
    // Redirigir al usuario a la página de registro al hacer clic en "Registrarse"
    this.router.navigate(['/register']);
  }
}
