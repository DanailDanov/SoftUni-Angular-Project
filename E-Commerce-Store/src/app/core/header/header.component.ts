import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { ADMIN_AUTHORIZATION } from 'src/app/features/constants';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart, CartItem } from 'src/app/types/cart';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _cart: Cart = { items: [] };

  errMessage!: string;
  userSubscription!: Subscription;

  adminAuthorization = ADMIN_AUTHORIZATION;

  user: User | undefined;

  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  get isLoggedin(): boolean {
    return this.userService.isLogged;
  }

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }


  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login'])
      },
      error: (err) => this.errMessage = err.errror.message
    })
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
