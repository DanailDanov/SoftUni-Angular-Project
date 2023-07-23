import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;

  product: Product | undefined = {
    id: 1,
    title: 'Athens',
    price: 250,
    category: 'chair',
    description: 'Very comfortable chair',
    image:'https://via.placeholder.com/150',
  }

  @Output() addToCart = new EventEmitter();

  onAddToCart() : void {
    this.addToCart.emit(this.product);
  }
}
