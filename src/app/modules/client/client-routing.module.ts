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
import {HRMSComponent} from '@app/modules/client/hrms/hrms.component';
import {WOtherComponent} from '@app/modules/client/widgets/w-other/w-other.component';
import {IconFontawesomeComponent} from '@app/modules/client/ui-elements/icons/icon-fontawesome/icon-fontawesome.component';
import {GalleryComponent} from '@app/modules/client/ui-elements/gallery/gallery.component';

const routes: Routes = [
  {
    path: 'hr',
    component: HRMSComponent,
    data: { title: ':: Epic :: Home' },
  },
  {
    path: 'hr-dashboard',
    component: HrDashboardComponent,
    data: { title: ':: Epic :: Home' },
  },
  {
    path: 'hr-users',
    component: HrUsersComponent,
    data: { title: ':: Epic :: HR Users' },
  },
  {
    path: 'hr-departments',
    component: HrDepartmentsComponent,
    data: { title: ':: Epic :: HR Departments' },
  },
  {
    path: 'hr-employee',
    component: HrEmployeeComponent,
    data: { title: ':: Epic :: HR Employee' },
  },
  {
    path: 'hr-clients',
    component: HrClientsComponent,
    data: { title: ':: Epic :: HR Clients' },
  },
  {
    path: 'hr-projects',
    component: HrProjectsComponent,
    data: { title: ':: Epic :: HR Projects' },
  },
  {
    path: 'hr-jobs',
    component: HrJobsComponent,
    data: { title: ':: Epic :: HR Jobs' },
  },
  {
    path: 'hr-leaves',
    component: HrLeavesComponent,
    data: { title: ':: Epic :: HR Leaves' },
  },
  {
    path: 'hr-activities',
    component: HrActivitiesComponent,
    data: { title: ':: Epic :: HR Activities' },
  },
  {
    path: 'hr-holidays',
    component: HrHolidaysComponent,
    data: { title: ':: Epic :: HR Holidays' },
  },
  {
    path: 'hr-events',
    component: HrEventsComponent,
    data: { title: ':: Epic :: HR Events' },
  },
  {
    path: 'hr-payroll',
    component: HrPayrollComponent,
    data: { title: ':: Epic :: HR Payroll' },
  },
  {
    path: 'hr-accounts',
    component: HrAccountsComponent,
    data: { title: ':: Epic :: HR Accounts' },
  },
  {
    path: 'hr-reports',
    component: HrReportComponent,
    data: { title: ':: Epic :: HR Report' },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { title: ':: Epic :: Search' },
  },
  {
    path: 'calender',
    component: CalenderComponent,
    data: { title: ':: Epic :: Calender' },
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    data: { title: ':: Epic :: Contacts' },
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: { title: ':: Epic ::  Chat' },
  },
  {
    path: 'filemanager',
    component: FilemanagerComponent,
    data: { title: ':: Epic ::  Filemanager' },
  },
  {
    path: 'project',
    component: ProjectComponent,
    data: { title: ':: Epic :: Project' },
  },
  {
    path: 'project-deashboard',
    component: PrDashboardComponent,
    data: { title: ':: Epic :: Project Dashboard' },
  },
  {
    path: 'project-list',
    component: PrProjectlistComponent,
    data: { title: ':: Epic :: Project List' },
  },
  {
    path: 'project-taskboard',
    component: PrTaskboardComponent,
    data: { title: ':: Epic :: Project Taskboard' },
  },
  {
    path: 'project-ticketlist',
    component: PrTicketlistComponent,
    data: { title: ':: Epic :: Project Ticketlist' },
  },
  {
    path: 'project-ticketdetails',
    component: PrTicketdetailsComponent,
    data: { title: ':: Epic :: Project Ticketdetails' },
  },
  {
    path: 'project-clients',
    component: PrClientsComponent,
    data: { title: ':: Epic :: Project Clients' },
  },
  {
    path: 'project-todo-list',
    component: PrTodolistComponent,
    data: { title: ':: Epic :: Project Todolist' },
  },
  {
    path: 'jobportal',
    component: JobPortalComponent,
    data: { title: ':: Epic :: JobPortal' },
  },
  {
    path: 'jobportal-job-dashboard',
    component: JobportalDashboardComponent,
    data: { title: ':: Epic :: JobPortal Dashboard' },
  },
  {
    path: 'jobportal-positions',
    component: JobportalPositionsComponent,
    data: { title: ':: Epic :: JobPortal Positions' },
  },
  {
    path: 'jobportal-applicants',
    component: JobportalApplicantsComponent,
    data: { title: ':: Epic :: JobPortal Applicants' },
  },
  {
    path: 'jobportal-resumes',
    component: JobportalResumesComponent,
    data: { title: ':: Epic :: JobPortal Resumes' },
  },
  {
    path: 'jobportal-settings',
    component: JobportalSettingsComponent,
    data: { title: ':: Epic :: JobPortal Settings' },
  },
  {
    path: 'icon-fontawesome',
    component: IconFontawesomeComponent,
    data: { title: ':: Epic :: Icon Fontawesome' },
  },
  {
    path: 'icon-feather',
    component: IconFeatherComponent,
    data: { title: ':: Epic :: Icon Feather' },
  },
  {
    path: 'icon-lines',
    component: IconLinesComponent,
    data: { title: ':: Epic :: Icon Lines' },
  },
  {
    path: 'icon-flags',
    component: IconFlagsComponent,
    data: { title: ':: Epic :: Icon Flags' },
  },
  {
    path: 'icon-payments',
    component: IconPaymentsComponent,
    data: { title: ':: Epic :: Icon Payments' },
  },
  {
    path: 'table',
    component: TablesComponent,
    data: { title: ':: Epic :: Tables' },
  },
  {
    path: 'map',
    component: MapsComponent,
    data: { title: ':: Epic :: Maps' },
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { title: ':: Epic :: Gallery' },
  },
  {
    path: 'charts',
    component: ChartsComponent,
    data: { title: ':: Epic :: Charts' },
  },
  {
    path: 'formelement',
    component: FormElementComponent,
    data: { title: ':: Epic :: Forms' },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: ':: Epic :: Settings' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: ':: Epic :: Profile' },
  },
  {
    path: 'widgets',
    component: WidgetsComponent,
    data: { title: ':: Epic :: Widgets' },
  },
  {
    path: 'widgets-card',
    component: WCardComponent,
    data: { title: ':: Epic :: Widgets' },
  },
  {
    path: 'widgets-statistics',
    component: WStaticsComponent,
    data: { title: ':: Epic :: Widgets' },
  },
  {
    path: 'widgets-data',
    component: WDataComponent,
    data: { title: ':: Epic :: Widgets' },
  },
  {
    path: 'widgets-social',
    component: WSocialComponent,
    data: { title: ':: Epic :: Widgets' },
  },
  {
    path: 'widgets-other',
    component: WOtherComponent,
    data: { title: ':: Epic :: Widgets' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
  static components = [];
}
