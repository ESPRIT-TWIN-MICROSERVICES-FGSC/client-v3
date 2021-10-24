import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${localStorage.getItem('bearer')} ${token}`,
        }
      });
    }
    return next.handle(request);
  }
}
//          'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT, OPTIONS',
//           // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization',
