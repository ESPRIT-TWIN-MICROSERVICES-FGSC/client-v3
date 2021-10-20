import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {NotificationService} from '@services/notification.service';
import {BehaviorSubject} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DashboardNavigationComponent} from '@shared/components/navigation/dashboard-navigation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    public as: AuthService,
    public ns: NotificationService,
    private titleService: Title,
    private s: MatSnackBar
  ) {
    HeaderComponent.activeTitle$.next(this.titleService.getTitle());
  }
  public static activeTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  notificationFetchPage$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isFullScreen: boolean;
  contactTab: boolean;
  groupTab: boolean;
  chatTab = true;
  fetching = false;

  async ngOnInit(): Promise<void> {
    await this.ns.countUnreadNotifications();
    await this.ns.fetchNotifications(0);
    this.ns.notifications$.subscribe((value) => {
      if (!this.fetching) {
        this.ns.notificationCount.next(this.ns.notificationCount.value + 1);
        this.titleService.setTitle(`(${this.ns.notificationCount.value}) ${DashboardNavigationComponent.activeTitle.value}`);
        this.s.open('New notification recieved', undefined, {
          politeness: 'assertive',
          horizontalPosition: 'right',
          announcementMessage: 'New notification recieved'
        })._dismissAfter(6000);
      }
    });
    this.notificationFetchPage$.subscribe(async value => {
      if (this.fetching) {
        await this.ns.fetchNotifications(value).then(() => this.fetching = false);
      }
    });
  }

  ngOnDestroy() {
    this.notificationFetchPage$.unsubscribe();
    this.ns.notifications$.unsubscribe();
    HeaderComponent.activeTitle$.unsubscribe();
  }

  async logout() {
    await this.as.logout();
  }

  loadMore($event: MouseEvent) {
    $event.stopPropagation();
    this.fetching = true;
    this.notificationFetchPage$.next(this.notificationFetchPage$.value + 1);
  }























  mToggoleMenu() {
    document.getElementsByTagName('body')[0].classList.toggle('offcanvas-active');
    document.getElementsByClassName('overlay')[0].classList.toggle('open');

  }
  noteToggle() {
    document.getElementsByClassName('sticky-note')[0].classList.toggle('open');
    document.getElementsByClassName('overlay')[0].classList.toggle('open');
  }
  openRightMenu() {
    document.getElementById('rightbar').classList.toggle('open');
    document.getElementsByClassName('overlay')[0].classList.toggle('open');

  }
  openfullScreen() {

    const elem = document.documentElement;
    // @ts-ignore
    const methodToBeInvoked = elem.requestFullscreen || elem.requestFullscreen || elem.mozRequestFullscreen || elem.msRequestFullscreen;
    if (methodToBeInvoked) {
      methodToBeInvoked.call(elem);
    }
    this.isFullScreen = true;
  }

  closeFullScreen() {
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }
    this.isFullScreen = false;
  }

  onTab(tabnumber: string) {
    this.chatTab = false;
    this.groupTab = false;
    this.contactTab = false;
    if (tabnumber === '1') {
      this.chatTab = true;
    }
    else if (tabnumber === '2') {
      this.groupTab = true;
    }
    else if (tabnumber === '3') {
      this.contactTab = true;
    }
  }
}
