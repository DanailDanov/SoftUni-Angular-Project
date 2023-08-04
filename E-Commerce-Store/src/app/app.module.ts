import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './features/home/home.component';
import { UserModule } from './features/user/user.module';
import { ProductsHeaderComponent } from './features/products-header/products-header.component';
import { FiltersComponent } from './features/filters/filters.component';
import { ProductBoxComponent } from './features/product-box/product-box.component';
import { CartComponent } from './features/cart/cart.component';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieInterceptorProvider } from './app.interceptor';
import { ProductCreateComponent } from './features/product-create/product-create.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { ApiService } from './services/api.service';
import { ProductEditComponent } from './features/product-edit/product-edit.component';
import { DeleteService } from './services/delete.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
    ProductCreateComponent,
    ProductEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    MaterialModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [CartService, UserService, ApiService, DeleteService, CookieInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
