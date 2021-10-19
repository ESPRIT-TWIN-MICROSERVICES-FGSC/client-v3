import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private snackBar: MatSnackBar) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].indexOf(err.status) !== -1) {
        this.snackBar.open('Unauthorized request or session expired, please login again!')._dismissAfter(3000);
        this.authenticationService.logout().then(() => location.reload());
      }
      const error = err.message || err.statusText;
      this.snackBar.open(err.message)._dismissAfter(3000);
      return throwError(error);
    }));
  }
}
