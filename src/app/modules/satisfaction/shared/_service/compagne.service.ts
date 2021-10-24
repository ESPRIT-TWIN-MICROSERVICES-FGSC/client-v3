import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Campaign } from '../_models/Campaign';

@Injectable({
  providedIn: 'root'
})
export class CompagneService {
  constructor(private http: HttpClient) { }
  // ${AppConfig.apiUrl}campaigns
  holder = 'http://localhost:8090/';
  // GET FUNCTION //
  getCompagneList(page: number, size: number, name: string): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${this.holder}paginated?page=${page}&size=${size}&name=${name}`);
  }
  getCompagneById(campaignId: number): Observable<Campaign> {
    return this.http.get<Campaign>(`${this.holder}?campaignId=${campaignId}`);
  }
  // CRUD
  addCompagne(val: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(`${this.holder}`, val);
  }
  updateCompagne(val: any): Observable<Campaign> {
    return this.http.put<Campaign>(`${this.holder}`, val);
  }
  deleteCompagne(id: number): Observable<any> {
    return this.http.delete(`${this.holder}?campaignId=${id}`);
  }
  // Count
  countAllCampaigns(): Observable<number> {
    return this.http.get<any>(`${this.holder}count`);
  }
  countAllCampaignsByCreatorId(creatorId: string): Observable<number> {
    return this.http.get<any>(`${this.holder}countbycreator?creatorId=${creatorId}`);
  }
  // Functionalities
  sendMail(val: any): Observable<any> {
    return this.http.post(`${this.holder}campaigns?id=` + val, val);
  }
  assignClient(campaignId: number, clientEmail: string): Observable<any>{
    return this.http.patch<any>(`${this.holder}campaigns/assign/client?c=${campaignId}&m=${clientEmail}`, {});
  }
  assignClientsByRegion(region: string, campaignId: number): Observable<number> {
    return this.http.patch<number>(`${this.holder}/campaigns/assign/clients/region?campaignId=${campaignId}&region=${region}`, {} );
  }
  unassignClient(campaignId: number, clientEmail: string): Observable<any>{
    return this.http.patch<any>(`${this.holder}campaigns/unassign/client?c=${campaignId}&m=${clientEmail}`, {});
  }
  countAllResponses(): Observable<number>{
    return this.http.get<number>(`${this.holder}responses/count/all`);
  }
  countInvitedClients(campaignId: number): Observable<number> {
    return this.http.get<number>(`${this.holder}invites/count/campaign?campaignId=${campaignId}`);
  }
  // Stats
  getEmailOfClientsThatAnswereCampaign(campaignId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.holder}responses/campaign/clients?campaignId=${campaignId}`);
  }
  getEmailsOfInvitedClients(campaignId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.holder}invites/campaign/clients?campaignId=${campaignId}`);
  }
  getCampaignStats(campaignId: number): Observable<any[]>{
    return this.http.get<any[]>(`${this.holder}responses/campaign/stats?campaignId=${campaignId}`);
  }
}
