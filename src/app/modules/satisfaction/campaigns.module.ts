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
import {CampaignService} from '@satisfaction/shared/_service/campaign.service';
import {ClientService} from '@services/client.service';
import {ChartsModule} from 'ng2-charts';
import {FormioModule} from '@formio/angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    CampaignDashboardComponent,
    SurveyBuilderComponent,
    CompagneComponent,
    ConfirmDeleteCampaignDialogComponent,
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    ChartsModule,
    FormioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatDatepickerModule
  ],
  providers: [
    ClientService, CampaignService
  ]
})
export class CampaignsModule { }
