import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit {

  appEmailDomains = ALLOWED_DOMAINS_FOR_EMAIL;
  subscription!: Subscription;
  errMessage!: string;

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

    const { email, password, rePassword } = form.value;

    this.subscription = this.userService
      .register(email, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (err) => this.errMessage = err.error.message
      });
  }

}
