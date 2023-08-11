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

  appEmailDomains = ALLOWED_DOMAINS_FOR_EMAIL;

  isEdit: boolean = false;

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
      error: () => {},
    })
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  updateProfile(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const {email, tel} = form.value;

    this.userService.updateUserProfile(email, tel).subscribe(() => {
      this.toggleEdit();
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
