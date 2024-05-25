import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productos.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-mis-productos',
  templateUrl: './mis-productos.component.html',
  styleUrls: ['./mis-productos.component.scss'],
})
export class MisProductosComponent implements OnInit {
  userProducts: Observable<any[]> = of([]);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.userProducts = this.productService.getUserProducts();
  }
  borrarProducto(productId: string) {
    
    //this.productService.deleteProduct(productId);
  }
}
