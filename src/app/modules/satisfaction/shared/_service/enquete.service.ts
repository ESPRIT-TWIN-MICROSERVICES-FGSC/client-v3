import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {InviteUrl} from '@satisfaction/shared/_models/InviteUrl';

@Injectable({
  providedIn: 'root'
})
export class EnqueteService {
  constructor(private http: HttpClient) {}
  addReponse(invite: InviteUrl): Observable<any>{
    return this.http.post(`${environment.gateway}invite?inviteUrl=${invite.Id}`, invite.Response);
  }
  updateReponse(invite: InviteUrl): Observable<any>{
    return this.http.put(`${environment.gateway}invite?inviteUrl=${invite.Id}`, invite.Response);
  }
  getSurveyByInviteUrl(inviteId: string): Observable<InviteUrl>{
    return this.http.get<InviteUrl>(`${environment.gateway}invite?u=${inviteId}`);
  }
}
