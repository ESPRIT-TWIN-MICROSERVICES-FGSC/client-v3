import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EnqueteComponent} from '@satisfaction/enquete/enquete.component';
import {ThankYouComponent} from '@satisfaction/enquete/thank-you/thank-you.component';
import {CompagneComponent} from '@satisfaction/campaigns/campaigns-list/compagne.component';
import {CampaignDashboardComponent} from '@satisfaction/campaigns/campaign-dashboard/campaign-dashboard.component';
import {SurveyBuilderComponent} from '@satisfaction/campaigns/survey-builder/survey-builder.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CompagneComponent
      },
      {
        path: ':id/details',
        component: CampaignDashboardComponent,
      },
      {
        path: 'add-edit',
        component: SurveyBuilderComponent,
      },
      {
        path: 'add-edit/:id',
        component: SurveyBuilderComponent,
        pathMatch: 'full'
      },
      // {
      //   path: ':id/clients/import-clients',
      //   component: ImportClientsComponent,
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
