import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DashboardNavigationComponent} from '@dashboard/navigation/dashboard-navigation.component';
import {UsersService} from '@services/users.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {User} from '@auth/shared/_models/User';
import {FadeOutAnimation} from '@animations/animations';
import {FormControl} from '@angular/forms';
import {debounceTime, finalize} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-hr-users',
  templateUrl: './hr-users.component.html',
  styleUrls: ['./hr-users.component.scss'],
  animations: [
    FadeOutAnimation
  ]
})
export class HrUsersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<User>;
  dataSource = new MatTableDataSource<User>();
  // dataSource: UsersListDataSource = new UsersListDataSource(this.us);
  searchControl: FormControl = new FormControl('');
  displayedColumns = ['avatar', 'email', 'name', 'joinDate'];
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(public us: UsersService, private bottomSheet: MatBottomSheet) {
    DashboardNavigationComponent.activeTitle.next('Vodoo - users');
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    setTimeout(() => this.pageUsers(), 100);
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.dataSource._filterData(this.searchControl.value);
    });
  }
  pageUsers = () => {
    this.loading$.next(false);
    this.us.fetchPaginatedUsers(this.paginator.pageIndex, this.paginator.pageSize, this.searchControl.value)
      .pipe(finalize(() => this.loading$.next(false)))
      .subscribe(res => {
        this.dataSource.data = res;
      });
  }

  openCharts() {
    this.bottomSheet.open(UserStatisticsComponent);
  }
}

@Component({
  selector: 'app-user-statistics',
  template: '<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-project-0-vhubd/embed/charts?id=20213a74-e088-4512-9906-c53b08fac1e1&theme=light"></iframe>'
})
export class UserStatisticsComponent {

}
//   firstName?: string;
//   lastName?: string;
//   roles: Array<Role>;
//   emailVerified: boolean;
//   provider: AuthProvider;
//   passwordResetTime: string;
