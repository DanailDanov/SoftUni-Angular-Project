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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
