import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CargarPService } from '../cargar-p.service';
import { ProductService } from '../productos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  products$: Observable<any[]> | undefined;
  searchQuery: string = '';

productos: any[] = [];
  constructor(private appComponent: AppComponent, private router: Router, private firestore: AngularFirestore, private cargarPService: CargarPService, private productService: ProductService) { }

  ngOnInit() {
    this.productService.products$.subscribe((products: any[]) => {
      this.productos = products;
    });
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

  
   


  toggleSidemenu() {
    this.appComponent.toggleSidemenu();
  }

  getSidemenuIconName() {
    return this.appComponent.showSidemenu ? 'menu-outline' : 'menu-sharp';
  }

  verProducto(producto: any) {
    this.router.navigate(['/producto-detalle', producto.id]);
  }
}
