import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GatewayService {
  public connectionState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
  }

  public async ping(): Promise<void> {
    const timeout = setInterval(async () => {
      if (document.visibilityState === 'visible') {
        this.httpClient.get(`${environment.gateway}actuator/health`, {observe: 'response', reportProgress: true}).subscribe(
          value => {
            if (value.status === 200 && !this.connectionState.value) {
              this.connectionState.next(true);
              // this.overlayService._snackbar.open('Successfully connected to gateway', undefined, {horizontalPosition: 'start'})._dismissAfter(8000);
            } else {
              if (this.connectionState.value){
                this.connectionState.next(false);
              }
            }
          }
          , error => {
            if (this.connectionState.value){
              this.connectionState.next(false);
            }
            console.log(error);
          });
      }
    }, 5000);
  }

  public async routes(): Promise<Observable<any[]>> {
    return this.httpClient.get<any[]>(`${environment.gateway}/routes`);
  }
}
