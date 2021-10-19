import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {EnterTriggerAnimation, SimpleFadeAnimation} from '@animations/animations';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {ResetPasswordAttemptRequest, ResetPasswordRequest} from '@app/modules/auth/shared/_models/requests/auth-requests';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [
    EnterTriggerAnimation,
    SimpleFadeAnimation
  ]
})
export class ForgotPasswordComponent implements OnInit {
  CCSEnum = CurrentComponentState;
  CurrentState = CurrentComponentState.email;
  message: string;
  isLoading = false;
  @Input() email: FormControl;
  @Output() goBack = new EventEmitter<void>();
  constructor(private as: AuthService) {
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && this.email.valid) {
        if (this.CurrentState === CurrentComponentState.email){
          this.sendResetToken();
        }
      }
    });
  }

  ngOnInit(): void {

  }
  sendResetToken(): void {
    this.isLoading = true;
    this.as.attemptToSendResetToken(new ResetPasswordAttemptRequest(this.email.value)).subscribe(value => {
      this.message = value;
      this.CurrentState = CurrentComponentState.success;
    }, error => {
      this.message = error.error;
      this.CurrentState = CurrentComponentState.error;
    }).add(() => this.isLoading = false);
  }
}
enum CurrentComponentState {
  email,
  error,
  success
}
