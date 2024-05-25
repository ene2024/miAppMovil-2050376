import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { environment } from '../environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ProductService } from './productos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Mi Perfil', url: '/profile', icon: 'person' },
    { title: 'Mis Productos', url: '/my-products', icon: 'pricetag' },
    { title: 'Carrito de Compras', url: '/cart', icon: 'cart' }
  ];

  public showSidemenu: boolean = true;

  public userName: string = 'Cargando...';
  public userEmail: string = '';
  public userPhotoURL: string = '';

  public products$: Observable<any[]> | undefined;
  public searchQuery: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router, private productService: ProductService) {}

  toggleSidemenu() {
    this.showSidemenu = !this.showSidemenu;
  }

  isLoginPage(): boolean {
    return this.router.url.includes('/login');
  }

  isRegisterPage(): boolean {
    return this.router.url.includes('/register');
  }

  ngOnInit() {
    const app = initializeApp(environment.firebaseConfig);
    const analytics = getAnalytics(app);

    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
        this.userName = user.displayName || 'Usuario';
        this.userEmail = user.email || '';
        this.userPhotoURL = user.photoURL || '';
      } else {
        this.userName = '';
        this.userEmail = '';
        this.userPhotoURL = '';
      }
    });

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showSidemenu = !this.isLoginPage() && !this.isRegisterPage();
    });

    this.showSidemenu = !this.isLoginPage() && !this.isRegisterPage();

    // Load initial products
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getProducts();
  }

  searchProducts() {
    if (this.searchQuery.trim() === '') {
      this.loadProducts();
    } else {
      this.products$ = this.productService.searchProductsByTitle(this.searchQuery);
    }
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
