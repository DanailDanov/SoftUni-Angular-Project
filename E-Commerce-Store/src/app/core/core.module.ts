import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AuthenticateComponent } from './authenticate/authenticate.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [HeaderComponent, FooterComponent, AuthenticateComponent],
})
export class CoreModule { }
