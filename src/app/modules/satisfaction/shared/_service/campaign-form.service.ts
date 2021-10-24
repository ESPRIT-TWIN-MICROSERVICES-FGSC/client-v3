import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormioForm } from '@formio/angular';
import { Observable } from 'rxjs/internal/Observable';
import {environment} from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CampaignFormService {

  constructor(private http: HttpClient) { }
  public FormFromCampaignId(campaignId: number): Observable<FormioForm> {
    return this.http.get<FormioForm>(`${environment.gateway}campaign/forms?id=${campaignId}`);
  }

  public AddCampaignForm(campaignId: number, form: FormioForm): Observable<any>{
    return this.http.post<any>(`${environment.gateway}campaign/forms?id=${campaignId}`, form);
  }

  public UpdateCampaignForm(campaignId: number, form: FormioForm): Observable<any>{
    return this.http.put(`${environment.gateway}campaign/forms?id=${campaignId}`, form);
  }

  public DeleteCampaignform(campaignId: number): Observable<any>{
    return this.http.delete(`${environment.gateway}campaign/forms?id=${campaignId}`);
  }
}

