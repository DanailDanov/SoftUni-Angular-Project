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
import { DeleteService } from './shared/popup/delete.service';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { SharedModule } from './shared/shared.module';

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
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [CartService, UserService, ApiService, DeleteService, CookieInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
