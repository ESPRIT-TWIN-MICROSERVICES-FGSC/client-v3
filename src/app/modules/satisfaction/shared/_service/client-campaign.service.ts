import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {InviteUrl} from '@satisfaction/shared/_models/InviteUrl';

@Injectable({
  providedIn: 'root'
})
export class ClientCampaignService {
  constructor(private http: HttpClient) {}
  addReponse(campaignId: string, clientEmail: string, response: Map<string, object>): Observable<any>{
    return this.http.post(`${environment.gateway}cfa/responses?campaignId=${campaignId}&clientEmail=${clientEmail}`, response);
  }
  updateReponse(campaignId: string, clientEmail: string, response: Map<string, object>): Observable<any>{
    return this.http.put(`${environment.gateway}cfa/responses?campaignId=${campaignId}&clientEmail=${clientEmail}`, response);
  }
  getSurveyByInviteUrl(email: string, campaignId: string): Observable<InviteUrl>{
    return this.http.get<InviteUrl>(`${environment.gateway}cfa/invites/form?email=${email}&campaignId=${campaignId}`);
  }
}
