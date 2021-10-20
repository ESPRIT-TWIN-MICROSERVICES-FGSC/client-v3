import {Injectable, OnInit} from '@angular/core';

import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {RSocketRxjsModuleConfig, RSocketService} from 'ng-rsocket-rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Notification} from '@models/Notification';
import {environment} from '@environments/environment';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {ConnectionStatus} from 'rsocket-types/ReactiveSocketTypes';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);
  config: RSocketRxjsModuleConfig = {
    connectMappingData: this.authService.currentUserValue.id,
    url: `${environment.rsocket}`,
    builderCustomizer: builder => builder.customizeMessageRoutingRSocket(messageRoutingSocket => {
      messageRoutingSocket._responder.addRequestFNFHandler('notifications', (payload) => {
        this.notifications$.next([payload.data, ...this.notifications$.value]);
      });
    })
  };
  webRSocketClient: RSocketWebSocketClient = new RSocketWebSocketClient({url: `${environment.rsocket}`});
  connectionStatus: ConnectionStatus = {kind: 'CONNECTING'};

  constructor(private rSocketService: RSocketService, private httpClient: HttpClient, private authService: AuthService) {
    // FOR CONNECTION STATUS SADLY I HAVE TO CREATE ANOTHER CLIENT, SAD 😢
    this.webRSocketClient.connect();
    this.webRSocketClient.connectionStatus().subscribe(status => {
      this.connectionStatus = status;
      const reconnectInterval = setInterval(() => {
        if (status.kind === 'CONNECTED') {
          this.rSocketService.connect(this.config);
          clearTimeout(reconnectInterval);
          this.fetchNotifications(0);
          console.log('cleared time out');
        } else if (status.kind === 'CLOSED' || status.kind === 'ERROR') {
          console.warn(`Connection failed : ${status.kind}`);
        }
      }, 5000);
    });
  }
  async sendNotification(notification: Notification): Promise<Observable<Notification>> {
    return this.httpClient.post<Notification>(`${environment.gateway}notifs`, notification);
  }

  async fetchNotifications(page: number): Promise<void> {
    await this.httpClient.get<Notification[]>(`${environment.gateway}notifs/notifications?clientId=${1}&page=${page}&size=${5}`)
      .subscribe(newNotifications => {
        this.notifications$.next([...newNotifications, ...this.notifications$.value]);
      });
  }

  async countUnreadNotifications(): Promise<void> {
    await this.httpClient.get<number>(`${environment.gateway}notifs/notifications/count?clientId=${1}`)
      .subscribe(count => this.notificationCount.next(count));
  }

  async setSeen(m: Notification): Promise<Subscription> {
    return this.httpClient.post(`${environment.gateway}notifs/seen`, m.id).subscribe();
  }

  async createNotification(notification: Notification): Promise<Observable<Notification>> {
    return this.httpClient.post<Notification>(`${environment.gateway}notifs`, notification);
  }

  async deleteNotificationsByClientId(clientId: string): Promise<Observable<HttpResponse<number>>> {
    return this.httpClient.get<number>(`${environment.gateway}notifs/notifications/count?clientId=${1}`, {observe: 'response'});
  }

}
