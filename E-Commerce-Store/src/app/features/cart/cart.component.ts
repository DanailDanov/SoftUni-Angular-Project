import { Component } from '@angular/core';
import { Cart } from 'src/app/types/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Cart = {items: []};
}
