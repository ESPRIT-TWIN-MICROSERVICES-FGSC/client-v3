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
  addReponse(campaignId: string, clientEmail: string, response: Map<string, object>): Observable<any>{
    return this.http.post(`${environment.gateway}responses?campaignId=${campaignId}&clientEmail=${clientEmail}`, response);
  }
  updateReponse(campaignId: string, clientEmail: string, response: Map<string, object>): Observable<any>{
    return this.http.put(`${environment.gateway}responses?campaignId=${campaignId}&clientEmail=${clientEmail}`, response);
  }
  getSurveyByInviteUrl(token: string, email: string, campaignId: string): Observable<InviteUrl>{
    return this.http.get<InviteUrl>(`${environment.gateway}invites/form?token=${token}&email=${email}&campaignId=${campaignId}`);
  }
}
