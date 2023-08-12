import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { ALLOWED_DOMAINS_FOR_EMAIL } from '../../constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User | undefined;
  userSubscription!: Subscription

  error!: string;

  appEmailDomains = ALLOWED_DOMAINS_FOR_EMAIL;

  isEdit: boolean = false;

  profileDetails = {
    email: '',
    tel: '',
  };

  constructor(
    private titlePage: Title,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.titlePage.setTitle('Profile page')

    this.userSubscription = this.userService.user$.subscribe({
      next: (_user) => {
        this.user = _user;
      },
      error: (err) => this.error = err.error.message
    })
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  updateProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.profileDetails = { ...form.value }

    const { email, tel } = this.profileDetails;

    this.userService.updateUserProfile(email, tel).subscribe({

      next: () => {
        this.toggleEdit();
      },
      error: (err) => {
        this.error = err.error.err.errors.tel.message
        
      }

    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
