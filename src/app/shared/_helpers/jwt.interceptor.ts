import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token && request.url.startsWith(environment.gateway)) {
      request = request.clone({
        setHeaders: {
          Authorization: `${localStorage.getItem('bearer')} ${localStorage.getItem('token')}`,
        }
      });
    }
    return next.handle(request);
  }
}
