import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
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

  ],
  bootstrap: [
    LoginComponent
  ]
})
export class AuthModule {
}
