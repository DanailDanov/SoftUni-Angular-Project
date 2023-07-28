import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
