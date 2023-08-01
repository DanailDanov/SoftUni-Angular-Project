import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { User } from '../types/user';
import { BehaviorSubject, Subscription, pipe, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();
  subscription: Subscription;

  user: User | undefined;

  get isLogged(): boolean {
    return !!this.user;
  }

  constructor(private http: HttpClient) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  getProfile() {
    return this.http
      .get<User>('/api/users/profile', {})
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(email: string, password: string, rePassword: string) {
    return this.http
      .post<User>('/api/register', { email, password })
      .pipe(tap((user) => this.user$$.next(user)))
  }

  login(email: string, password: string) {
    return this.http
      .post<User>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }


  logout() {
    return this.http
      .post<User>('/api/logout', {})
      .pipe(tap(() => this.user$$.next(undefined)));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
