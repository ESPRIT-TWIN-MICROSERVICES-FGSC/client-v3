import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: false } }
  ]
})
export class ErrorPageComponent implements OnInit {
  private history: string[] = [];
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit(): void {

  }

  goBack() {
    this.history.pop();
    if (this.history.length > 0) {
      this.router.navigateByUrl('..');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
