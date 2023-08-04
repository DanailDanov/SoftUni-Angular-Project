import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  productId!: string;
  product: Product | undefined;
  errMessage!: string;
  editSubscription!: Subscription

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['productId'];

    this.editSubscription = this.apiService.getAllProducts().subscribe({
      next: (_products) => {
        this.product = _products.find((product) => product._id == this.productId);
        // console.log(this.product);

      },
      error: (err) => this.errMessage = err.error.message
    })
  }

  editSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let { title, price, category, image, description } = form.value;

    price = Number(price);
    
    console.log(title, price, category, image, description);
    
    this.editSubscription = this.apiService.editProduct(this.productId, title, price, category, image, description).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => this.errMessage = err.error.message
    })
  }

  ngOnDestroy(): void {
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }
}
