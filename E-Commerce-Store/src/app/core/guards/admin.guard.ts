import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map } from "rxjs";
import { ADMIN_AUTHORIZATION } from "src/app/features/constants";
import { UserService } from "src/app/services/user.service";


@Injectable({ providedIn: 'root' })

export class AdminGuard implements CanActivate {

  isAdminId: boolean = false;
  adminId = ADMIN_AUTHORIZATION;

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {

    return this.userService.user$.pipe(
      map(_user => {
        this.isAdminId = _user?._id == this.adminId;

        if (this.isAdminId) {
          // console.log(this.isAdminId);
          return true;
        }
        return this.router.createUrlTree(['/home']);
      })
    );
  }
}