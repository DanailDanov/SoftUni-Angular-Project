import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  subscription!: Subscription;
  error!: string;

  constructor(
    private titlePage: Title,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.titlePage.setTitle('Create Page')
  }

  CreateSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // console.log(form.value);

    let {title, price, category, image, description} =  form.value;

    price = Number(price);

    // console.log( title, price, category, image, description );

    this.subscription = this.apiService.createNewProduct(title, price, category, image, description ).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => this.error = err.error.message
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
