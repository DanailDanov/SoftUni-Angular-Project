import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/cart/cart.component';
import { ProductCreateComponent } from './features/product-create/product-create.component';
import { ProductEditComponent } from './features/product-edit/product-edit.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'create',
    component: ProductCreateComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit/:productId',
    component: ProductEditComponent,
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
