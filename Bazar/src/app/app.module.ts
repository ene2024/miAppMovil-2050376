import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegisterComponent } from './register/register.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { AddcardModalComponent } from './addcard-modal/addcard-modal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LibrosComponent } from './libros/libros.component';
import { HogarComponent } from './hogar/hogar.component';
import { JuguetesComponent } from './juguetes/juguetes.component';
import { ElectronicosComponent } from './electronicos/electronicos.component';
import { RopaComponent } from './ropa/ropa.component';


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent, LoginComponent, InicioComponent, RegisterComponent, CarritoComponent, AgregarProductoComponent, MisProductosComponent, PaymentModalComponent, AddcardModalComponent, PerfilComponent, RopaComponent, ElectronicosComponent, JuguetesComponent, HogarComponent, LibrosComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule, HttpClientModule,  AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"bazar-63c99","appId":"1:684837899212:web:87c5af3b0f9005de2dab69","storageBucket":"bazar-63c99.appspot.com","apiKey":"AIzaSyDnu5pGkPIiuTgsFynC60F_0pCkWkKPXZs","authDomain":"bazar-63c99.firebaseapp.com","messagingSenderId":"684837899212","measurementId":"G-ZM9F6QWC2M"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
