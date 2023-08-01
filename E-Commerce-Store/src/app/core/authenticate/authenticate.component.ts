import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  isAuth = false;
  // errMessage!: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => { this.isAuth = true },
      error: () => { this.isAuth = true },
      complete: () => { this.isAuth = true },
    })
  }
}
