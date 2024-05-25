import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CargarPService{

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  async fetchProductsFromAPI(): Promise<any[]> {
    try {
      const apiUrl = 'https://fakestoreapi.com/products';
      const products = await this.http.get<any[]>(apiUrl).toPromise();
      return products ?? [];
    } catch (error) {
      console.error('Error fetching products from API:', error);
      return [];
    }
  }

  async saveProductsToDatabase(products: any[]): Promise<void> {
    try {
      const batch = this.firestore.firestore.batch();

      products.forEach(product => {
        const productRef: DocumentReference<any> = this.firestore.firestore.collection('products').doc(); // Utiliza la API de Firestore de Firebase
        batch.set(productRef, product);
      });

      await batch.commit();
      console.log('Products saved to database successfully');
    } catch (error) {
      console.error('Error saving products to database:', error);
    }
  }

  async syncProductsFromAPI(): Promise<void> {
    try {
      const products = await this.fetchProductsFromAPI();
      await this.saveProductsToDatabase(products);
    } catch (error) {
      console.error('Error syncing products from API to database:', error);
    }
  }
}
