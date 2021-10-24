import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Campaign} from '@satisfaction/shared/_models/Campaign';
import {CompagneService} from '@satisfaction/shared/_service/compagne.service';
import {NotificationService} from '@services/notification.service';

@Component({
  selector: 'app-compagne',
  templateUrl: './compagne.component.html',
  styleUrls: ['./compagne.component.css']
})
export class CompagneComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Campaign>;
  dataSource: MatTableDataSource<Campaign>;
  displayedColumns = ['nom', 'status', 'actions'];
  currentDate = new Date();
  pagedCampaigns = [];
  constructor(private campaignService: CompagneService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private notificationService: NotificationService,
              private router: Router) {
    this.dataSource = new MatTableDataSource(this.pagedCampaigns);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.page();
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
  }

  page(): void {
    this.campaignService.getCompagneList(undefined).subscribe(res => {
      this.pagedCampaigns = res;
    }, err => {

    });
  }

  handlePagination(event: PageEvent): void {

    this.page();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource.data.length < 3) {
      this.page();
    }
  }

  openDeleteDialog(row: any): void {
  }

  redirectToEdit(campaignId: number): void {
    this.router.navigateByUrl(`dashboard/campaigns/add-edit/${campaignId}`).then();
  }

  redirectToDetails(campaignId: number): void {
    this.router.navigateByUrl(`dashboard/campaigns/${campaignId}/details`).then();
  }
}
