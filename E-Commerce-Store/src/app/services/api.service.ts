import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createNewProduct(title: string, price: number, category: string, image: string, description: string) {
    return this.http.post<Product>('/api/themes', { title, price, category, image, description })
  }

  getAllProducts(): Observable<Array<Product>> {
    const { apiUrl } = environment;

    return this.http.get<Array<Product>>(`${apiUrl}/themes`);
  }

  getThemesCategory(category?: string) {
    const { apiUrl } = environment;

    return this.http.get<Array<Product>>(`${apiUrl}/themes${category ? '/category/' + category : ''}`);
  }

  editProduct(productId: string, title: string, price: Number, category: string, image: string, description: string) {
    return this.http.put(`/api/themes/edit/${productId}`, { title, price, category, image, description })
  }

  deleteProduct(productId:string) {
    return this.http.delete(`/api/themes/${productId}`);
  }
}
