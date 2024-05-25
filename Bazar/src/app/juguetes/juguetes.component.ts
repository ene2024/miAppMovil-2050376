import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../productos.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-juguetes',
  templateUrl: './juguetes.component.html',
  styleUrls: ['./juguetes.component.scss'],
})
export class JuguetesComponent  implements OnInit {
  productos: any[] = []; 
  products$: Observable<any[]> | undefined;
  constructor(private productService: ProductService, private router: Router,private firestore: AngularFirestore) { }

  ngOnInit() {
    this.productService.products$.subscribe((products: any[]) => {
      this.productos = products;
    });
    this.loadProducts();
    this.loadElectronicos();
  }

  loadProducts() {
    this.products$ = this.productService.getProducts();
  }


  loadElectronicos() {
    this.productService.getProductsByCategory('Juguetes').subscribe(
      (productos: any[]) => {
        this.productos = productos;
        console.log("Productos:", this.productos);
      },
      (error) => {
        console.error("Error al cargar productos electrónicos:", error);
      }
    );
  }
  
  verProducto(producto: any) {
    this.router.navigate(['/producto-detalle', producto.id]);
  }

}
