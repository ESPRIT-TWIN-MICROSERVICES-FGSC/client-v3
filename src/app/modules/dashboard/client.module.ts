import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { LeftmenuComponent } from './navigation/leftmenu/leftmenu.component';
import { ChatComponent } from './components/chat/chat.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormElementComponent } from './components/form-element/form-element.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSliderModule } from '@angular/material/slider';
import { ChartsComponent } from './components/charts/charts.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { BarChartComponent } from './components/charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/charts/pie-chart/pie-chart.component';
import { ColumnChartComponent } from './components/charts/column-chart/column-chart.component';
import { AreaChartComponent } from './components/charts/area-chart/area-chart.component';
import { RadarChartComponent } from './components/charts/radar-chart/radar-chart.component';
import { RadialbarChartComponent } from './components/charts/radialbar-chart/radialbar-chart.component';
import { HeatmapChartComponent } from './components/charts/heatmap-chart/heatmap-chart.component';
import { CandlestickChartComponent } from './components/charts/candlestick-chart/candlestick-chart.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { CalenderComponent } from './components/calender/calender.component';
//import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FilemanagerComponent } from './components/filemanager/filemanager.component';
import { SparklinesComponent } from './components/charts/sparklines/sparklines.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MinbarchartComponent } from './components/charts/minbarchart/minbarchart.component';
import { FullcalenderComponent } from './components/fullcalender/fullcalender.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { WorldmapComponent } from './components/worldmap/worldmap.component';
import { AgmCoreModule } from '@agm/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CkeditorComponent } from './components/ckeditor/ckeditor.component';
import { MapsComponent } from './components/maps/maps.component';

import { HrDepartmentsComponent } from './hrms/hr-departments/hr-departments.component';
import { HrEmployeeComponent } from './hrms/hr-employee/hr-employee.component';
import { HrActivitiesComponent } from './hrms/hr-activities/hr-activities.component';
import { HrHolidaysComponent } from './hrms/hr-holidays/hr-holidays.component';
import { HrEventsComponent } from './hrms/hr-events/hr-events.component';
import { HrPayrollComponent } from './hrms/hr-payroll/hr-payroll.component';
import { HrAccountsComponent } from './hrms/hr-accounts/hr-accounts.component';
import { HrReportComponent } from './hrms/hr-report/hr-report.component';
import { SearchComponent } from './components/search/search.component';
import { ProjectComponent } from './components/project/project.component';
import { PrDashboardComponent } from './components/project/pr-dashboard/pr-dashboard.component';
import { PrProjectlistComponent } from './components/project/pr-projectlist/pr-projectlist.component';
import { PrTaskboardComponent } from './components/project/pr-taskboard/pr-taskboard.component';
import { PrTicketdetailsComponent } from './components/project/pr-ticketdetails/pr-ticketdetails.component';
import { PrTicketlistComponent } from './components/project/pr-ticketlist/pr-ticketlist.component';
import { PrClientsComponent } from './components/project/pr-clients/pr-clients.component';
import { PrTodolistComponent } from './components/project/pr-todolist/pr-todolist.component';
import { JobPortalComponent } from './components/job-portal/job-portal.component';
import { JobportalDashboardComponent } from './components/job-portal/jobportal-dashboard/jobportal-dashboard.component';
import { JobportalPositionsComponent } from './components/job-portal/jobportal-positions/jobportal-positions.component';
import { JobportalApplicantsComponent } from './components/job-portal/jobportal-applicants/jobportal-applicants.component';
import { JobportalResumesComponent } from './components/job-portal/jobportal-resumes/jobportal-resumes.component';
import { JobportalSettingsComponent } from './components/job-portal/jobportal-settings/jobportal-settings.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UIELEMENTSComponent } from './components/ui-elements/ui-elements.component';
import { GalleryComponent } from './components/ui-elements/gallery/gallery.component';
import { BasicradarChartComponent } from './components/charts/basicradar-chart/basicradar-chart.component';
import { ColumnLineChartComponent } from './components/charts/column-line-chart/column-line-chart.component';
import { WCardComponent } from './components/widgets/w-card/w-card.component';
import { WStaticsComponent } from './components/widgets/w-statics/w-statics.component';
import { WDataComponent } from './components/widgets/w-data/w-data.component';
import { WSocialComponent } from './components/widgets/w-social/w-social.component';
import { WOtherComponent } from './components/widgets/w-other/w-other.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CountToModule } from 'angular-count-to';
import { FooterComponent } from './components/footer/footer.component';
import { HrClientsComponent } from './hrms/hr-clients/hr-clients.component';

// primeng
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HrLeavesComponent } from './hrms/hr-leaves/hr-leaves.component';
import { HrJobsComponent } from './hrms/hr-jobs/hr-jobs.component';
import { HrProjectsComponent } from './hrms/hr-projects/hr-projects.component';
import {HrUsersComponent} from '@app/modules/dashboard/hrms/hr-users/hr-users.component';
import {HrDashboardComponent} from '@app/modules/dashboard/hrms/hr-dashboard/hr-dashboard.component';
import {IconFlagsComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-flags/icon-flags.component';
import {IconLinesComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-lines/icon-lines.component';
import {TablesComponent} from '@app/modules/dashboard/components/ui-elements/tables/tables.component';
import {IconsComponent} from '@app/modules/dashboard/components/ui-elements/icons/icons.component';
import {IconFeatherComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-feather/icon-feather.component';
import {IconFontawesomeComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-fontawesome/icon-fontawesome.component';
import {IconPaymentsComponent} from '@app/modules/dashboard/components/ui-elements/icons/icon-payments/icon-payments.component';
import {RSocketRxjsModule, RSocketService} from 'ng-rsocket-rxjs';
import {NotificationService} from '@services/notification.service';
import {environment} from '@environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ErrorPageComponent} from '@shared/components/error-page/error-page.component';
import {DashboardNavigationComponent} from '@dashboard/navigation/dashboard-navigation.component';
import {UsersService} from '@services/users.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HrAttendanceComponent } from './hrms/hr-attendance/hr-attendance.component';
import { CalendarModule } from 'primeng/calendar';


// FullCalendarModule.registerPlugins([
//   // register FullCalendar plugins
//   dayGridPlugin,
//   timeGridPlugin,
//   interactionPlugin,
// ]);

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    CarouselModule.forRoot(),
    DragDropModule,
    MatSliderModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CountToModule,
    ToastrModule.forRoot({}),
    // CalendarModule.forRoot({
    //   provide: DateAdapter,
    //   useFactory: adapterFactory,
    // }),
    AgmCoreModule.forRoot({
      apiKey: 'GOOGLE_API_KEY',
    }),
    RSocketRxjsModule.forRoot({
      url: environment.rsocket,
      connectMappingData: JSON.parse(localStorage.getItem('currentUser'))?.id,
      builderCustomizer: builder => {
        if (JSON.parse(localStorage.getItem('currentUser'))?.id) {
          builder.automaticReconnect(4000);
        }
      }
    }),
    FullCalendarModule,
    CKEditorModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    ContextMenuModule,
    MultiSelectModule,
    ProgressSpinnerModule,
    SliderModule,
    ToastModule,
    TableModule,
    ToolbarModule,
    ConfirmDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSortModule,
    MatProgressSpinnerModule,
    CalendarModule
  ],
  declarations: [
    ClientRoutingModule.components,
    HeaderComponent,
    LeftmenuComponent,
    ChatComponent,
    FormElementComponent,
    TablesComponent,
    ChartsComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    ColumnChartComponent,
    AreaChartComponent,
    RadarChartComponent,
    RadialbarChartComponent,
    HeatmapChartComponent,
    CandlestickChartComponent,
    WidgetsComponent,
    CalenderComponent,
    ContactsComponent,
    FilemanagerComponent,
    SparklinesComponent,
    SettingsComponent,
    MinbarchartComponent,
    FullcalenderComponent,
    WorldmapComponent,
    CkeditorComponent,
    MapsComponent,
    HrUsersComponent,
    HrDashboardComponent,
    HrDepartmentsComponent,
    HrEmployeeComponent,
    HrActivitiesComponent,
    HrHolidaysComponent,
    HrEventsComponent,
    HrPayrollComponent,
    HrAccountsComponent,
    HrReportComponent,
    SearchComponent,
    ProjectComponent,
    PrDashboardComponent,
    PrProjectlistComponent,
    PrTaskboardComponent,
    PrTicketdetailsComponent,
    PrTicketlistComponent,
    PrClientsComponent,
    PrTodolistComponent,
    JobPortalComponent,
    JobportalDashboardComponent,
    JobportalPositionsComponent,
    JobportalApplicantsComponent,
    ErrorPageComponent,
    JobportalResumesComponent,
    JobportalSettingsComponent,
    UIELEMENTSComponent,
    IconsComponent,
    IconFontawesomeComponent,
    IconFeatherComponent,
    IconLinesComponent,
    IconFlagsComponent,
    IconPaymentsComponent,
    GalleryComponent,
    BasicradarChartComponent,
    ColumnLineChartComponent,
    WCardComponent,
    WStaticsComponent,
    WDataComponent,
    WSocialComponent,
    WOtherComponent,
    ProfileComponent,
    FooterComponent,
    HrClientsComponent,
    HrLeavesComponent,
    HrJobsComponent,
    HrProjectsComponent,
    DashboardNavigationComponent,
    HrAttendanceComponent,
  ],
  providers: [BsDatepickerModule, ConfirmationService, MessageService, NotificationService, RSocketService, UsersService
  ],
  bootstrap: [DashboardNavigationComponent]
})
export class ClientModule {}
