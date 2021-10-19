import {Component, OnInit} from '@angular/core';
import {EnterTriggerAnimation, SimpleFadeAnimation} from '@animations/animations';
import {CarouselConfig} from 'ngx-bootstrap/carousel';
import {LoginRequest, ResetPasswordRequest} from '@app/modules/auth/shared/_models/requests/auth-requests';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  animations: [
    SimpleFadeAnimation, EnterTriggerAnimation
  ],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 3000, noPause: true, showIndicators: false}}
  ]
})
export class ResetPasswordComponent implements OnInit {
  CCSEnum = CurrentComponentState;
  CurrentState = CurrentComponentState.INITIAL;
  message: string;
  isVisible = true;
  token: string;
  email: FormControl = new FormControl('', [
    Validators.required,
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
  resetPwFB = new FormGroup({
    password: this.password,
    confirmPassword: this.confirmPassword
  });

  constructor(private as: AuthService, private ar: ActivatedRoute) {
    this.ar.paramMap.subscribe(params => {
      this.token = params.get('token');
      this.email.setValue(params.get('email'));
    });
  }

  ngOnInit(): void {
  }

  async verifyEmailAndSendPassword(): Promise<void> {
    this.CurrentState = CurrentComponentState.LOADING;
    const attempt = new ResetPasswordRequest(this.email.value, this.password.value, this.token);
    await this.as.attemptToResetPassword(attempt).subscribe(async value => {
      this.message = value + 'logging in and redirecting';
      this.CurrentState = CurrentComponentState.COMPLETE;
      value.subscribe(value1 => {
        value1.subscribe(value2 => console.log(value2));
      });
    }, error => {
      this.message = error.error;
      this.CurrentState = CurrentComponentState.ERROR;
    });
  }

}

enum CurrentComponentState {
  INITIAL,
  LOADING,
  ERROR,
  COMPLETE
}
