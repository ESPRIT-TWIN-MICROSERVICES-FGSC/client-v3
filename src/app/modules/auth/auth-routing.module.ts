import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login-register/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ErrorPageComponent } from '@shared/components/error-page/error-page.component';
import { ErrorPage2Component } from '@shared/components/error-page2/error-page2.component';
import { ConfirmEmailComponent } from '@app/modules/auth/confirm-email/confirm-email.component';
import {ResetPasswordComponent} from '@app/modules/auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: ':: Epic :: Log In' }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: ':: Epic :: Forgot Password' }
  },
  {
    path: 'confirm-email/:token',
    component: ConfirmEmailComponent
  },
  {
    path: 'reset-pw/:token/:email',
    component: ResetPasswordComponent
  },
  // {
  //   path: '**',
  //   component: ErrorPageComponent,
  //   data: { title: 'Vodoo - 404' }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent
  ];

}
