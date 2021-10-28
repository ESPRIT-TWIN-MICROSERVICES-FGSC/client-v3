import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Campaign } from '../_models/Campaign';
import {environment} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(private http: HttpClient) { }
  // ${AppConfig.apiUrl}campaigns

  // GET FUNCTION //
  getCompagneList(page: number, size: number, name: string): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(`${environment.gateway}cfa/paginated?page=${page}&size=${size}&name=${name}`);
  }
  getCompagneById(campaignId: string): Observable<Campaign> {
    return this.http.get<Campaign>(`${environment.gateway}cfa/?campaignId=${campaignId}`);
  }
  // CRUD
  addCompagne(val: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(`${environment.gateway}cfa/`, val);
  }
  updateCompagne(val: any): Observable<Campaign> {
    return this.http.put<Campaign>(`${environment.gateway}cfa/`, val);
  }
  deleteCompagne(id: number): Observable<any> {
    return this.http.delete(`${environment.gateway}cfa/?campaignId=${id}`);
  }
  // Count
  countAllCampaigns(): Observable<number> {
    return this.http.get<any>(`${environment.gateway}cfa/count`);
  }
  countAllCampaignsByCreatorId(creatorId: string): Observable<number> {
    return this.http.get<any>(`${environment.gateway}cfa/count/creator?id=${creatorId}`);
  }
  countAllResponses(): Observable<number>{
    return this.http.get<number>(`${environment.gateway}cfa/responses/count/all`);
  }
  countInvitedClients(campaignId: number): Observable<number> {
    return this.http.get<number>(`${environment.gateway}cfa/count/invites?campaignId=${campaignId}`);
  }
  // END COUNT
  getEmailsOfInvitedClients(campaignId: number): Observable<string[]> {
    return this.http.get<string[]>(`${environment.gateway}cfa/clients/invited?campaignId=${campaignId}`);
  }
  // Functionalities
  sendMail(val: any): Observable<any> {
    return this.http.post(`${environment.gateway}cfa/campaigns?id=` + val, val);
  }
  assignClient(campaignId: number, clientEmail: string): Observable<any>{
    return this.http.patch<any>(`${environment.gateway}cfa/campaigns/assign/client?c=${campaignId}&m=${clientEmail}`, {});
  }
  assignClientsByRegion(region: string, campaignId: number): Observable<number> {
    return this.http.patch<number>(`${environment.gateway}cfa//campaigns/assign/clients/region?campaignId=${campaignId}&region=${region}`, {} );
  }
  unassignClient(campaignId: number, clientEmail: string): Observable<any>{
    return this.http.patch<any>(`${environment.gateway}cfa/campaigns/unassign/client?c=${campaignId}&m=${clientEmail}`, {});
  }
  // TODO : UPDATE FORM

  // Stats
  getInvitedClientsEmails(campaignId: number): Observable<string[]> {
    return this.http.get<string[]>(`${environment.gateway}cfa/clients/invited?campaignId=${campaignId}`);
  }

  getCampaignStats(campaignId: number): Observable<any[]>{
    return this.http.get<any[]>(`${environment.gateway}cfa/responses/campaign/stats?campaignId=${campaignId}`);
  }

  countResponsesByCampaign(campaignId: any) {
    return this.http.get<number>(`${environment.gateway}cfa/count/responses?campaignId=${campaignId}`);
  }
}
