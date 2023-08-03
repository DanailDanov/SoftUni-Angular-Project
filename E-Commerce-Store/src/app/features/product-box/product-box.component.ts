import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;

  @Input() product!: Product;

  @Output() addToCart = new EventEmitter();

  ngOnInit(): void {
    // console.log(this.product);
    
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
