import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '@environments/environment';
import {displayRole, Role, User} from '@app/modules/auth/shared/_models/User';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LoginRequest, SignUpRequest, ResetPasswordRequest, ResetPasswordAttemptRequest} from '@app/modules/auth/shared/_models/requests/auth-requests';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  async attemptToLogin(loginRequest: LoginRequest) {
    return this.http.post<any>(`${environment.gateway}auth/login`, loginRequest, {reportProgress: true}).pipe(
      catchError(() => throwError('Invalid credentials')),
      switchMap(async jwtInfo => {
        localStorage.setItem('bearer', jwtInfo.tokenType);
        localStorage.setItem('token', jwtInfo.accessToken);
        return await this.getCurrentUserInfo();
      })
    );
  }
  attemptToRegister(signupRequest: SignUpRequest){
    return this.http.post(`${environment.gateway}auth/signup`, signupRequest);
  }
  attemptToConfirmEmail(token: string){
    return this.http.patch(`${environment.gateway}auth/confirm-email?token=${token}`, {}, { responseType: 'text'});
  }
  attemptToSendResetToken(attempt: ResetPasswordAttemptRequest) {
    return this.http.patch(`${environment.gateway}auth/generate-pw-token`, attempt, {responseType: 'text'});
  }
  attemptToResetPassword(attempt: ResetPasswordRequest){
    return this.http.patch(`${environment.gateway}auth/reset-pw`, attempt, {responseType: 'text'}).pipe(
      catchError(err => throwError(err)),
      switchMap(() => this.attemptToLogin(new LoginRequest(attempt.email, attempt.newPassword)))
    );
  }
  async getCurrentUserInfo() {
    return this.http.get<User>(`${environment.gateway}auth/me`).pipe(
      catchError(() => {
        this.logout();
        return throwError('Internal server error');
      }),
      map(user => {
        user.imageUrl = user.imageUrl ?? `https://avatars.dicebear.com/api/bottts/${user.name}.svg`;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        setTimeout(() => this.router.navigate(['../dashboard']).then(() => {
          if (Swal.isVisible()){
            Swal.close();
          }
        }), 2000);
      })
    );
  }
  async logout(): Promise<void> {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('bearer');
    this.currentUserSubject.next(undefined);
    this.http.patch(`${environment.gateway}auth/logout`, {}).subscribe();
    await this.router.navigate(['../login']);
  }
  public get currentUserValue(): User { return this.currentUserSubject.value; }

  public inRole(role: Role): boolean { return this.currentUserSubject.value.roles.indexOf(role) !== -1; }

  displayRole(role: Role): string { return displayRole(role); }
}