import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TablesComponent} from '@app/modules/client/ui-elements/tables/tables.component';
import {PrClientsComponent} from '@app/modules/client/project/pr-clients/pr-clients.component';
import {ProjectComponent} from '@app/modules/client/project/project.component';
import {ChatComponent} from '@app/modules/client/chat/chat.component';
import {JobportalApplicantsComponent} from '@app/modules/client/job-portal/jobportal-applicants/jobportal-applicants.component';
import {ProfileComponent} from '@app/modules/client/profile/profile.component';
import {WStaticsComponent} from '@app/modules/client/widgets/w-statics/w-statics.component';
import {PrTicketlistComponent} from '@app/modules/client/project/pr-ticketlist/pr-ticketlist.component';
import {WidgetsComponent} from '@app/modules/client/widgets/widgets.component';
import {HrClientsComponent} from '@app/modules/client/hrms/hr-clients/hr-clients.component';
import {HrLeavesComponent} from '@app/modules/client/hrms/hr-leaves/hr-leaves.component';
import {HrEventsComponent} from '@app/modules/client/hrms/hr-events/hr-events.component';
import {HrHolidaysComponent} from '@app/modules/client/hrms/hr-holidays/hr-holidays.component';
import {IconFlagsComponent} from '@app/modules/client/ui-elements/icons/icon-flags/icon-flags.component';
import {FilemanagerComponent} from '@app/modules/client/filemanager/filemanager.component';
import {PrTicketdetailsComponent} from '@app/modules/client/project/pr-ticketdetails/pr-ticketdetails.component';
import {HrActivitiesComponent} from '@app/modules/client/hrms/hr-activities/hr-activities.component';
import {HrDashboardComponent} from '@app/modules/client/hrms/hr-dashboard/hr-dashboard.component';
import {CalenderComponent} from '@app/modules/client/calender/calender.component';
import {WDataComponent} from '@app/modules/client/widgets/w-data/w-data.component';
import {HrPayrollComponent} from '@app/modules/client/hrms/hr-payroll/hr-payroll.component';
import {WCardComponent} from '@app/modules/client/widgets/w-card/w-card.component';
import {WSocialComponent} from '@app/modules/client/widgets/w-social/w-social.component';
import {HrUsersComponent} from '@app/modules/client/hrms/hr-users/hr-users.component';
import {HrEmployeeComponent} from '@app/modules/client/hrms/hr-employee/hr-employee.component';
import {PrProjectlistComponent} from '@app/modules/client/project/pr-projectlist/pr-projectlist.component';
import {SearchComponent} from '@app/modules/client/search/search.component';
import {ContactsComponent} from '@app/modules/client/contacts/contacts.component';
import {PrDashboardComponent} from '@app/modules/client/project/pr-dashboard/pr-dashboard.component';
import {IconLinesComponent} from '@app/modules/client/ui-elements/icons/icon-lines/icon-lines.component';
import {MapsComponent} from '@app/modules/client/maps/maps.component';
import {PrTaskboardComponent} from '@app/modules/client/project/pr-taskboard/pr-taskboard.component';
import {PrTodolistComponent} from '@app/modules/client/project/pr-todolist/pr-todolist.component';
import {JobportalDashboardComponent} from '@app/modules/client/job-portal/jobportal-dashboard/jobportal-dashboard.component';
import {HrJobsComponent} from '@app/modules/client/hrms/hr-jobs/hr-jobs.component';
import {SettingsComponent} from '@app/modules/client/settings/settings.component';
import {IconPaymentsComponent} from '@app/modules/client/ui-elements/icons/icon-payments/icon-payments.component';
import {FormElementComponent} from '@app/modules/client/form-element/form-element.component';
import {HrReportComponent} from '@app/modules/client/hrms/hr-report/hr-report.component';
import {JobportalSettingsComponent} from '@app/modules/client/job-portal/jobportal-settings/jobportal-settings.component';
import {HrAccountsComponent} from '@app/modules/client/hrms/hr-accounts/hr-accounts.component';
import {IconFeatherComponent} from '@app/modules/client/ui-elements/icons/icon-feather/icon-feather.component';
import {JobportalPositionsComponent} from '@app/modules/client/job-portal/jobportal-positions/jobportal-positions.component';
import {ChartsComponent} from '@app/modules/client/charts/charts.component';
import {HrProjectsComponent} from '@app/modules/client/hrms/hr-projects/hr-projects.component';
import {HrDepartmentsComponent} from '@app/modules/client/hrms/hr-departments/hr-departments.component';
import {JobportalResumesComponent} from '@app/modules/client/job-portal/jobportal-resumes/jobportal-resumes.component';
import {JobPortalComponent} from '@app/modules/client/job-portal/job-portal.component';
import {WOtherComponent} from '@app/modules/client/widgets/w-other/w-other.component';
import {IconFontawesomeComponent} from '@app/modules/client/ui-elements/icons/icon-fontawesome/icon-fontawesome.component';
import {GalleryComponent} from '@app/modules/client/ui-elements/gallery/gallery.component';
import {DashboardNavigationComponent} from '@shared/components/navigation/dashboard-navigation.component';

const routes: Routes = [
  {
    path: 'hr', component: DashboardNavigationComponent, children: [
      {
        path: '',
        component: HrDashboardComponent,
      },
      {
        path: 'users',
        component: HrUsersComponent,
      },
      {
        path: 'hr-departments',
        component: HrDepartmentsComponent,
      },
      {
        path: 'hr-employee',
        component: HrEmployeeComponent,
      },
      {
        path: 'clients',
        component: HrClientsComponent,
      },
      {
        path: 'hr-projects',
        component: HrProjectsComponent,
      },
      {
        path: 'hr-jobs',
        component: HrJobsComponent,
      },
      {
        path: 'hr-leaves',
        component: HrLeavesComponent,
      },
      {
        path: 'hr-activities',
        component: HrActivitiesComponent,
      },
      {
        path: 'hr-holidays',
        component: HrHolidaysComponent,
      },
      {
        path: 'hr-events',
        component: HrEventsComponent,
      },
      {
        path: 'hr-payroll',
        component: HrPayrollComponent,
      },
      {
        path: 'hr-accounts',
        component: HrAccountsComponent,
      },
      {
        path: 'hr-reports',
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
        path: 'project-deashboard',
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
