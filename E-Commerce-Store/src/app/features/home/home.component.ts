import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/types/product';
import { ROWS_HEIGHT } from '../constants';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];

  errMesagge!: string;

  products:  Array<Product> | undefined;
  // sort = 'desc';
  // count = '12';

  productsSubscription!: Subscription;

  categorySubscription!: Subscription

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getCategoryProduct();
  }

  constructor(private cartService: CartService, private apiService: ApiService) { };

  ngOnInit(): void {
    this.getProducts();
  }

  getCategoryProduct() {
    this.categorySubscription = this.apiService.getThemesCategory(this.category).subscribe({
      next: (_products) => {
        this.products = _products
        console.log(this.products);
      },
      error: (err) => {
        this.errMesagge = err.error.message
      }
    })
  }

  getProducts() {
    this.productsSubscription = this.apiService.getAllProducts().subscribe({
      next: (_products) => {
        this.products = _products;
        // console.log(this.products);
      },
      error: (err) => {
        this.errMesagge = err.error.message
      }
    })
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      _id: product._id
    })
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
