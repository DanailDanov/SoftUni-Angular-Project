import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ALLOWED_DOMAINS_FOR_EMAIL } from '../../constants';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  appEmailDomains = ALLOWED_DOMAINS_FOR_EMAIL;
  subscription!: Subscription;
  errMessage!: string;
  
  constructor(
    private titlePage: Title,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.titlePage.setTitle('Login page');
  }

  

  LoginSubmit(form: NgForm) {
   
    if(form.invalid) {
      return;
    }

    const {email, password} = form.value;

    this.subscription = this.userService.login(email,password)
    .subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => this.errMessage = err.error.message
    });
  }
}
