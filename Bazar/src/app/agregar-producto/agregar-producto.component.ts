import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FotoServiceService } from '../foto-service.service';
import { Foto } from '../foto.model';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss'],
})
export class AgregarProductoComponent implements OnInit {
  fotos: Foto[] = [];
  product = {
    title: '',
    description: '',
    price: null,
    category: '',
    image: null as string | null 
  };

  photo: string | null = null;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    public fotoService: FotoServiceService
  ) {}

  ngOnInit() {
    this.fotos = this.fotoService.fotos;
  }

  async tomarFoto() {
    const capturedPhoto = await this.fotoService.addNewToGallery();
    this.product.image = capturedPhoto.webViewPath ?? null;
    this.photo = capturedPhoto.webViewPath ?? null;
  }

  submitProduct() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        const productRef = this.firestore.collection('products').doc();
        productRef.set({
          ...this.product,
          userId: user.uid,
          createdAt: new Date()
        }).then(() => {
          this.router.navigate(['/inicio']);
        }).catch(error => {
          console.error('Error al agregar producto: ', error);
        });
      } else {
        console.error('Usuario no iniciado');
      }
    });
  }
}
