import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart, CartItem } from 'src/app/types/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [] };

  subscription!: Subscription;

  dataSource: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
   this.subscription = this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem) : void {
    console.log(item);
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem) : void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onCheckout() {
    this.http.post('/api/checkout', {items: this.cart.items}).subscribe(async(res:any) => {
      let stripe = await loadStripe('pk_test_51NbNjYKmnZzSdyArHjxmhaUB4B7j5hrQrNmyo0ppk0PpYmrGwm0Ljin20utrb6SPcJZMomoPFs1EMSQossiiUZYU00kUzeDHDr');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
