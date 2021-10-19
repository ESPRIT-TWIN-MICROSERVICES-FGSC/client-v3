import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "@app/modules/auth/shared/_services/auth.service";
import {Role} from "@app/modules/auth/shared/_models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (route.data.roles) {
        if (!route.data.roles.some((ai: Role) => currentUser.roles.includes(ai))) {
          this.snackBar.open('Not authorised');
          this.router.navigate(['/login']).then();
          return false;
        }
      }
      return true;
    }
    // TODO : Check if return url works
    this.snackBar.open('Please log in 🙌');
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}}).then();
    return false;
  }

}
