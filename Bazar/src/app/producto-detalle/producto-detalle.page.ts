import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../productos.service'; // Asegúrate de que este es el nombre correcto del servicio
import { CartService } from '../cart.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
})
export class ProductoDetallePage implements OnInit {
  producto: any;
  productId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID from route:', this.productId); // Añadir esta línea para depuración

    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe((product) => {
        this.producto = product;
        console.log('Producto cargado:', this.producto); // Añadir esta línea para depuración
      });
    }
  }

  addToCart() {
    if (this.productId) {
      this.cartService.addToCart(this.productId, 1).then(() => {
        console.log('Producto agregado al carrito');
      }).catch(error => {
        console.error('Error al agregar el producto al carrito:', error);
      });
    } else {
      console.error('Product ID is null');
    }
  }
}
