import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ALLOWED_DOMAINS_FOR_EMAIL } from '../../constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  appEmailDomains = ALLOWED_DOMAINS_FOR_EMAIL;
  subscription!: Subscription;
  errMessage!: string;
  
  constructor(private titlePage: Title) { }

  ngOnInit(): void {
    this.titlePage.setTitle('Login page');
  }

  

  LoginSubmit(form: NgForm) {
   
  }


}
