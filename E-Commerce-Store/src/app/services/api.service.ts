import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createNewProduct(title: string, price: number, category: string, image: string, description: string) {
    return this.http.post<Product>('/api/themes', { title, price, category, image, description })
  }

  getAllProducts() {
    const { apiUrl } = environment;
    return this.http.get<Product>(`${apiUrl}/themes`);
  }
}
