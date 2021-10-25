import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthService} from '@auth/shared/_services/auth.service';
import {JwtInterceptor} from '@shared/_helpers/jwt.interceptor';
import {CommonModule} from '@angular/common';
import {EnqueteComponent} from '@satisfaction/enquete/enquete.component';
import {ThankYouComponent} from '@satisfaction/enquete/thank-you/thank-you.component';


@NgModule({
  declarations: [
    AppComponent,
    EnqueteComponent,
    ThankYouComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    })
  ],
  providers: [BsDatepickerModule, AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
