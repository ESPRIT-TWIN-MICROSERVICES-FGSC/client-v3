import {Component, OnDestroy, OnInit} from '@angular/core';
import {CarouselConfig} from 'ngx-bootstrap/carousel';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {EnterTriggerAnimation, SimpleFadeAnimation} from '@animations/animations';
import {FormControl, Validators} from '@angular/forms';
import {LoginRequest, SignUpRequest} from '@app/modules/auth/shared/_models/requests/auth-requests';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    EnterTriggerAnimation,
    SimpleFadeAnimation
  ],
  providers: [
    AuthService,
    {provide: CarouselConfig, useValue: {interval: 3000, noPause: true, showIndicators: false}}
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  public CCS = CurrentComponentState;
  toggleForms = CurrentComponentState.LOGIN;
  registerError: string;
  loginError: string;
  userName: FormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.minLength(6),
    Validators.maxLength(255)
  ]);
  email: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.nullValidator,
      Validators.minLength(10),
      Validators.email,
      Validators.maxLength(255)
    ]);
  password: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]);
  confirmPassword: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(255)
    ]);
  rememberMe = false;
  err: any;
  isVisible = true;
  isLoading = false;
  returnUrl?: string;
  constructor(private as: AuthService, private router: Router, private ar: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ar.queryParams.subscribe(params => this.returnUrl = params.returnUrl);
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (this.toggleForms === CurrentComponentState.LOGIN && this.email.valid && this.password.valid){
          this.login();
        } else if (this.toggleForms === CurrentComponentState.REGISTER &&
          this.userName.valid && this.email.valid && this.password.valid && this.confirmPassword.valid){
          this.register();
        }
      }
    });
    if (localStorage.getItem('token') && this.as.currentUserValue) {
      this.isVisible = false;
      Swal.fire('Already logged in, redirecting to dashboard').then(() => null);
      Swal.getActions().remove();
      setTimeout(() => this.router.navigate([ this.returnUrl ?? '../dashboard']).then(() => Swal.close()), 2000);
    }
  }


  async login() {
    this.isLoading = true;
    await this.as.attemptToLogin(new LoginRequest(this.email.value, this.password.value)).then(promise =>
      promise.subscribe(
        async isLogged => {
          isLogged.subscribe(() => {
            this.isVisible = false;
            Swal.fire('Logged in, redirecting.').then(() => undefined);
            Swal.getActions().remove();
            console.log(this.returnUrl ?? '../dashboard');
            setTimeout(() => this.router.navigate([this.returnUrl ?? '../dashboard']).then(() => {
              if (Swal.isVisible()){
                Swal.close();
              }
            }), 2000);
          });
        },
        error => {
          this.loginError = error;
          setTimeout(() => this.loginError = undefined, 3500);
        }
      ).add(() => this.isLoading = false)
    );

  }

  register() {
    this.isLoading = true;
    this.as.attemptToRegister(new SignUpRequest(this.userName.value, this.email.value, this.password.value))
      .subscribe(body => {
        this.isVisible = false;
        // @ts-ignore
        Swal.fire(body.message)
          .then(result => {
            if (result.isDismissed){
              this.isVisible = true;
            }
          });
        Swal.getActions().remove();
      }, error => {
        this.registerError = error.error.message;
        setTimeout(() => this.registerError = undefined, 3500);
      })
      .add(() => this.isLoading = false);
  }

  ngOnDestroy(): void {

  }
}

enum CurrentComponentState {
  LOGIN,
  REGISTER,
  GENERATE_PW_TOKEN,
  RESET_PW
}
