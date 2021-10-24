import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TablesComponent} from '@app/modules/dashboard/components/ui-elements/tables/tables.component';
import {PrClientsComponent} from '@app/modules/dashboard/components/project/pr-clients/pr-clients.component';
import {ProjectComponent} from '@app/modules/dashboard/components/project/project.component';
import {ChatComponent} from '@app/modules/dashboard/components/chat/chat.component';
import {JobportalApplicantsComponent} from '@app/modules/dashboard/components/job-portal/jobportal-applicants/jobportal-applicants.component';
import {ProfileComponent} from '@app/modules/dashboard/components/profile/profile.component';
import {WStaticsComponent} from '@app/modules/dashboard/components/widgets/w-statics/w-statics.component';
import {PrTicketlistComponent} from '@app/modules/dashboard/components/project/pr-ticketlist/pr-ticketlist.component';
import {WidgetsComponent} from '@app/modules/dashboard/components/widgets/widgets.component';
import {HrClientsComponent} from '@app/modules/dashboard/hrms/hr-clients/hr-clients.component';
import {HrLeavesComponent} from '@app/modules/dashboard/hrms/hr-leaves/hr-leaves.component';
import {HrEventsComponent} from '@app/modules/dashboard/hrms/hr-events/hr-events.component';
import {HrHolidaysComponent} from '@app/modules/dashboard/hrms/hr-holidays/hr-holidays.component';
import {IconFlagsComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-flags/icon-flags.component';
import {FilemanagerComponent} from '@app/modules/dashboard/components/filemanager/filemanager.component';
import {PrTicketdetailsComponent} from '@app/modules/dashboard/components/project/pr-ticketdetails/pr-ticketdetails.component';
import {HrActivitiesComponent} from '@app/modules/dashboard/hrms/hr-activities/hr-activities.component';
import {HrDashboardComponent} from '@app/modules/dashboard/hrms/hr-dashboard/hr-dashboard.component';
import {CalenderComponent} from '@app/modules/dashboard/components/calender/calender.component';
import {WDataComponent} from '@app/modules/dashboard/components/widgets/w-data/w-data.component';
import {HrPayrollComponent} from '@app/modules/dashboard/hrms/hr-payroll/hr-payroll.component';
import {WCardComponent} from '@app/modules/dashboard/components/widgets/w-card/w-card.component';
import {WSocialComponent} from '@app/modules/dashboard/components/widgets/w-social/w-social.component';
import {HrUsersComponent} from '@app/modules/dashboard/hrms/hr-users/hr-users.component';
import {HrEmployeeComponent} from '@app/modules/dashboard/hrms/hr-employee/hr-employee.component';
import {PrProjectlistComponent} from '@app/modules/dashboard/components/project/pr-projectlist/pr-projectlist.component';
import {SearchComponent} from '@app/modules/dashboard/components/search/search.component';
import {ContactsComponent} from '@app/modules/dashboard/components/contacts/contacts.component';
import {PrDashboardComponent} from '@app/modules/dashboard/components/project/pr-dashboard/pr-dashboard.component';
import {IconLinesComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-lines/icon-lines.component';
import {MapsComponent} from '@app/modules/dashboard/components/maps/maps.component';
import {PrTaskboardComponent} from '@app/modules/dashboard/components/project/pr-taskboard/pr-taskboard.component';
import {PrTodolistComponent} from '@app/modules/dashboard/components/project/pr-todolist/pr-todolist.component';
import {JobportalDashboardComponent} from '@app/modules/dashboard/components/job-portal/jobportal-dashboard/jobportal-dashboard.component';
import {HrJobsComponent} from '@app/modules/dashboard/hrms/hr-jobs/hr-jobs.component';
import {SettingsComponent} from '@app/modules/dashboard/components/settings/settings.component';
import {IconPaymentsComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-payments/icon-payments.component';
import {FormElementComponent} from '@app/modules/dashboard/components/form-element/form-element.component';
import {HrReportComponent} from '@app/modules/dashboard/hrms/hr-report/hr-report.component';
import {JobportalSettingsComponent} from '@app/modules/dashboard/components/job-portal/jobportal-settings/jobportal-settings.component';
import {HrAccountsComponent} from '@app/modules/dashboard/hrms/hr-accounts/hr-accounts.component';
import {IconFeatherComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-feather/icon-feather.component';
import {JobportalPositionsComponent} from '@app/modules/dashboard/components/job-portal/jobportal-positions/jobportal-positions.component';
import {ChartsComponent} from '@app/modules/dashboard/components/charts/charts.component';
import {HrProjectsComponent} from '@app/modules/dashboard/hrms/hr-projects/hr-projects.component';
import {HrDepartmentsComponent} from '@app/modules/dashboard/hrms/hr-departments/hr-departments.component';
import {JobportalResumesComponent} from '@app/modules/dashboard/components/job-portal/jobportal-resumes/jobportal-resumes.component';
import {JobPortalComponent} from '@app/modules/dashboard/components/job-portal/job-portal.component';
import {WOtherComponent} from '@app/modules/dashboard/components/widgets/w-other/w-other.component';
import {IconFontawesomeComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-fontawesome/icon-fontawesome.component';
import {GalleryComponent} from '@app/modules/dashboard/components/ui-elements/gallery/gallery.component';

import {ErrorPageComponent} from '@shared/components/error-page/error-page.component';
import {DashboardNavigationComponent} from '@dashboard/navigation/dashboard-navigation.component';

const routes: Routes = [
  { path: '' , redirectTo: 'hr', pathMatch: 'full'},
  {
    path: 'hr', component: DashboardNavigationComponent, children: [
      {
        path: '',
        component: HrDashboardComponent,
        data: { animation: 'isLeft' }
      },
      {
        path: 'users',
        component: HrUsersComponent,
        data: { animation: 'isRight' }
      },
      {
        path: 'departments',
        component: HrDepartmentsComponent,
      },
      {
        path: 'employee',
        component: HrEmployeeComponent,
      },
      {
        path: 'clients',
        component: HrClientsComponent,
      },
      {
        path: 'projects',
        component: HrProjectsComponent,
      },
      {
        path: 'jobs',
        component: HrJobsComponent,
      },
      {
        path: 'leaves',
        component: HrLeavesComponent,
      },
      {
        path: 'activities',
        component: HrActivitiesComponent,
      },
      {
        path: 'holidays',
        component: HrHolidaysComponent,
      },
      {
        path: 'events',
        component: HrEventsComponent,
      },
      {
        path: 'payroll',
        component: HrPayrollComponent,
      },
      {
        path: 'accounts',
        component: HrAccountsComponent,
      },
      {
        path: 'reports',
        component: HrReportComponent,
      },
      {
        path: 'search',
        component: SearchComponent,
      },
      {
        path: 'calender',
        component: CalenderComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'filemanager',
        component: FilemanagerComponent,
      },
      {
        path: 'project',
        component: ProjectComponent,
      },
      {
        path: 'project-dashboard',
        component: PrDashboardComponent,
      },
      {
        path: 'project-list',
        component: PrProjectlistComponent,
      },
      {
        path: 'project-taskboard',
        component: PrTaskboardComponent,
      },
      {
        path: 'project-ticketlist',
        component: PrTicketlistComponent,
      },
      {
        path: 'project-ticketdetails',
        component: PrTicketdetailsComponent,
      },
      {
        path: 'project-clients',
        component: PrClientsComponent,
      },
      {
        path: 'project-todo-list',
        component: PrTodolistComponent,
      },
      {
        path: 'jobportal',
        component: JobPortalComponent,
      },
      {
        path: 'jobportal-job-dashboard',
        component: JobportalDashboardComponent,
      },
      {
        path: 'jobportal-positions',
        component: JobportalPositionsComponent,
      },
      {
        path: 'jobportal-applicants',
        component: JobportalApplicantsComponent,
      },
      {
        path: 'jobportal-resumes',
        component: JobportalResumesComponent,
      },
      {
        path: 'jobportal-settings',
        component: JobportalSettingsComponent,
      },
      {
        path: 'icon-fontawesome',
        component: IconFontawesomeComponent,
      },
      {
        path: 'icon-feather',
        component: IconFeatherComponent,
      },
      {
        path: 'icon-lines',
        component: IconLinesComponent,
      },
      {
        path: 'icon-flags',
        component: IconFlagsComponent,
      },
      {
        path: 'icon-payments',
        component: IconPaymentsComponent,
      },
      {
        path: 'table',
        component: TablesComponent,
      },
      {
        path: 'map',
        component: MapsComponent,
      },
      {
        path: 'gallery',
        component: GalleryComponent,
      },
      {
        path: 'charts',
        component: ChartsComponent,
      },
      {
        path: 'formelement',
        component: FormElementComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'widgets',
        component: WidgetsComponent,
      },
      {
        path: 'widgets-card',
        component: WCardComponent,
      },
      {
        path: 'widgets-statistics',
        component: WStaticsComponent,
      },
      {
        path: 'widgets-data',
        component: WDataComponent,
      },
      {
        path: 'widgets-social',
        component: WSocialComponent,
      },
      {
        path: 'widgets-other',
        component: WOtherComponent,
      },
      {
        path: 'campaigns',
        loadChildren: () => import('@satisfaction/campaigns.module').then(m => m.CampaignsModule),
      },
      {
        path: '**', component: ErrorPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
  static components = [];
}
