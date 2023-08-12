import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/types/product';
import { ROWS_HEIGHT } from '../constants';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];

  isLoading: boolean = true;

  error!: string;

  products: Array<Product> | undefined;

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

  constructor(private cartService: CartService, private apiService: ApiService, private titlePage: Title) { };

  ngOnInit(): void {
    this.titlePage.setTitle('Home page');
    this.getProducts();
  }

  getCategoryProduct() {
    this.categorySubscription = this.apiService.getThemesCategory(this.category).subscribe({
      next: (_products) => {
        this.products = _products
        // console.log(this.products);
      },
      error: (err) => {
        this.error = err.error.message;
      }
    })
  }

  getProducts() {
    this.productsSubscription = this.apiService.getAllProducts().subscribe({
      next: (_products) => {
        this.products = _products;
        // console.log(this.products);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.error.message
        this.isLoading = false;
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

    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
