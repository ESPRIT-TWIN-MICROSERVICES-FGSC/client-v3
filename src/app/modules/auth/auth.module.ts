import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {JwtInterceptor} from '@shared/_helpers/jwt.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {LoginComponent} from '@app/modules/auth/login-register/login.component';

@NgModule({
  declarations: [
    AuthRoutingModule.components,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [
    LoginComponent
  ]
})
export class AuthModule {
}
