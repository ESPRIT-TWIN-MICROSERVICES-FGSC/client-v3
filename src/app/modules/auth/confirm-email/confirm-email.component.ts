import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {EnterTriggerAnimation, SimpleFadeAnimation} from '@animations/animations';
import {CarouselConfig} from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-test',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  animations: [
    SimpleFadeAnimation, EnterTriggerAnimation
  ],
  providers: [
    {provide: CarouselConfig, useValue: {interval: 3000, noPause: true, showIndicators: false}}
  ]
})
export class ConfirmEmailComponent implements OnInit {

  CS = ConfirmStatus;
  status = ConfirmStatus.LOADING;
  message: string;
  visible = true;
  constructor(private ar: ActivatedRoute, private as: AuthService, private r: Router) {
  }

  ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      console.log(params.get('token'));
      this.as.attemptToConfirmEmail(params.get('token')).subscribe(message => {
        this.message = message;
        this.status = ConfirmStatus.SUCCESS;
        setTimeout(() => {
          setTimeout(() => {
            this.visible = false;
            this.r.navigateByUrl('login').then(console.log);
          }, 2000);
        }, 5000);
      }, errorResponse => {
        this.message = errorResponse.error;
        this.status = ConfirmStatus.ERROR;
      });
    });
  }

}
enum ConfirmStatus {
  LOADING,
  SUCCESS,
  ERROR
}
