import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ALLOWED_DOMAINS_FOR_EMAIL } from '../../constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  appEmailDomains = ALLOWED_DOMAINS_FOR_EMAIL;
  subscription!: Subscription;
  error!: string;

  constructor(
    private titlePage: Title,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.titlePage.setTitle('Register page');
  }

  registerSubmit(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const { email, password, rePassword, tel } = form.value;

    this.subscription = this.userService
      .register(email, password, rePassword, tel)
      .subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (err) => this.error = err.error.message
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
