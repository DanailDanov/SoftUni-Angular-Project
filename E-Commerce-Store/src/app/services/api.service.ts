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


//   `${STORE_BASE_URL}/products${
//     category ? '/category/' + category : ''
//   }?sort=${sort}&limit=${limit}`
// );

  getThemesCategory(category?: string) {
    const {apiUrl} = environment;

    return this.http.get<Array<Product>>(`${apiUrl}/themes${category? '/category/' + category : ''}`);
  }

}
