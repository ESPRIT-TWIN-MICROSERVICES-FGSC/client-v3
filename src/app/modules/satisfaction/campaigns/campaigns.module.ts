import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import {SurveyBuilderComponent} from '@satisfaction/campaigns/survey-builder/survey-builder.component';
import {
  CampaignDashboardComponent,
  ConfirmDeleteCampaignDialogComponent
} from '@satisfaction/campaigns/campaign-dashboard/campaign-dashboard.component';
import {EnqueteComponent} from '@satisfaction/enquete/enquete.component';
import {CompagneComponent} from '@satisfaction/campaigns/campaigns-list/compagne.component';
import {CompagneService} from '@satisfaction/shared/_service/compagne.service';
import {ClientService} from '@services/client.service';


@NgModule({
  declarations: [
    CampaignDashboardComponent,
    SurveyBuilderComponent,
    EnqueteComponent,
    CompagneComponent,
    ConfirmDeleteCampaignDialogComponent,
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule
  ],
  providers: [
    ClientService, CompagneService
  ]
})
export class CampaignsModule { }
