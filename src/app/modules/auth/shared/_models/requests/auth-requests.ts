const url = `${location.protocol}//${location.host}`;
export class SignUpRequest {
  public returnUrl = url + '/confirm-email/';
  constructor(public name: string, public email: string, public password: string) {}
}
export class LoginRequest{
  constructor(public email: string, public password: string) {}
}
export class ResetPasswordAttemptRequest {
  public returnUrl = url + '/reset-pw/';
  constructor(public email: string) {}
}
export class ResetPasswordRequest extends ResetPasswordAttemptRequest{
  constructor(public email: string, public newPassword: string, public resetToken: string) {
    super(email);
  }
}
