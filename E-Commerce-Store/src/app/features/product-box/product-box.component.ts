import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/types/product';
import { User } from 'src/app/types/user';
import { ADMIN_AUTHORIZATION } from '../constants';
import { UserService } from 'src/app/services/user.service';
import { DeleteService } from 'src/app/shared/popup/delete.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit, OnDestroy {
  @Input() fullWidthMode = false;

  @Input() product!: Product;

  @Output() addToCart = new EventEmitter();

  Subscription!: Subscription;

  adminAuthorization = ADMIN_AUTHORIZATION;

  user: User | undefined;

  error!: string;

  constructor(
    private userService: UserService, 
    private deleteService: DeleteService,
    private apiService: ApiService,
    private router: Router,
    // private location: Location,
    ) { }

  ngOnInit(): void {
    // console.log(this.product);
    // this.Subscription = this.userService.user$.subscribe((user) => {
    //   this.user = user;
    //   // console.log(this.user);
    // });

    this.Subscription = this.userService.user$.subscribe({
      next: (_user) => {
        this.user = _user;
      },
      error: (err) => this.error = err.error.message
    });
  }

  onAddToCart(): void {
    // console.log(this.product);
    
    this.addToCart.emit(this.product);
  }
  

  onDeleteProduct(productId:string) {
    const message = 'Are you sure you want to delete this product?';

    this.Subscription = this.deleteService.conform(message).subscribe((hasConfirm:boolean) => {
      if (hasConfirm) {
        this.Subscription = this.apiService.deleteProduct(productId).subscribe({
          next: () => {
            window.location.reload()
          },
          error: (err) => this.error = err.error.message
        })
      }
    })
  }

  ngOnDestroy(): void {
    if(this.Subscription) {
      this.Subscription.unsubscribe();
    }
  }
}
