import { Component, OnInit } from '@angular/core';
// @ts-ignore
import anime from 'animejs/lib/anime.es.js';
import {NavigationEnd, Router} from "@angular/router";
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  private history: string[] = []
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects)
      }
    })
  }

  ngOnInit(): void {
    anime({
      targets: '.row svg',
      translateY: 10,
      autoplay: true,
      loop: true,
      easing: 'easeInOutSine',
      direction: 'alternate'
    });

    anime({
      targets: '#zero',
      translateX: 10,
      autoplay: true,
      loop: true,
      easing: 'easeInOutSine',
      direction: 'alternate',
      scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
      rotateY: {value: '+=180', delay: 200},
    });

  }

  goBack(): void {
    this.history.pop()
    if (this.history.length > 0) {
      this.router.navigateByUrl("..").then(r => console);
    } else {
      this.router.navigateByUrl('/').then(r => console)
    }
  }
}
