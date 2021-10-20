import {AfterViewInit, Component, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {NotificationService} from '@services/notification.service';
import {FormControl} from '@angular/forms';
import {OverlayContainer} from '@angular/cdk/overlay';
import {GatewayService} from '@services/gateway.service';
import {Title} from '@angular/platform-browser';
import {MatAccordion} from '@angular/material/expansion';
import {RouterOutlet} from '@angular/router';
import {SlideAnimation} from '@animations/animations';

@Component({
  selector: 'app-navigation',
  templateUrl: './dashboard-navigation.component.html',
  styleUrls: ['./dashboard-navigation.component.scss'],
  animations: [
    SlideAnimation
  ]
})
export class DashboardNavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public notificationService: NotificationService,
    private overlay: OverlayContainer,
    private titleService: Title
  ) {
    DashboardNavigationComponent.activeTitle.next(this.titleService.getTitle());
  }

  public static activeTitle: BehaviorSubject<string> = new BehaviorSubject<string>('');
  notificationFetchPage: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  fetching = false;
  // this.authService.currentUserValue.firstName+' '+ this.authService.currentUserValue.lastName

  ngOnDestroy(): void {
    this.notificationFetchPage.unsubscribe();
  }

  async ngAfterViewInit(): Promise<void> {
    // await this.gatewayService.ping();
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animation;
  }
  async ngOnInit() {
    await this.notificationService.countUnreadNotifications();
    await this.notificationService.fetchNotifications(0);
    this.notificationService.notifications$.subscribe((value) => {
      if (!this.fetching) {
        this.notificationService.notificationCount.next(this.notificationService.notificationCount.value + 1);
        this.titleService.setTitle(`(${this.notificationService.notificationCount.value})
        ${DashboardNavigationComponent.activeTitle.value}`);
        // this.materialOverlayComponents._snackbar.open('New notification recieved', undefined, {
        //   politeness: 'assertive',
        //   horizontalPosition: 'left',
        //   announcementMessage: 'New notification recieved'
        // })._dismissAfter(6000);
      }
    });
    this.notificationFetchPage.subscribe(async value => {
      if (this.fetching) {
        await this.notificationService.fetchNotifications(value).then(() => this.fetching = false);
      }
    });
  }

  loadMore($event: MouseEvent) {
    $event.stopPropagation();
    this.fetching = true;
    this.notificationFetchPage.next(this.notificationFetchPage.value + 1);
  }

}



