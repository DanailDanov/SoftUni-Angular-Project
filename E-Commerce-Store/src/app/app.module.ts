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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
