import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JobService } from 'src/app/core/services/job.service';
import { Jobs } from '@shared/_models/Jobs';

@Component({
  selector: 'app-hr-jobs',
  templateUrl: './hr-jobs.component.html',
  styleUrls: ['./hr-jobs.component.scss'],
})
export class HrJobsComponent implements OnInit {
  itemAddDialog: boolean;
  itemUpdateDialog: boolean;
  itemViewDialog: boolean;

  items: Jobs[];
  item: any;

  selectedItems: any[];
  selectedItem: Jobs;

  cols: any[];

  exportColumns: any[];

  submitted: boolean;
  itemsFormGroup: FormGroup;

  constructor(
    private jobService: JobService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllJobs();
    this.jobService.triggerJobRefresh$.subscribe(() => {
      this.getAllJobs();
    });
    this.createJobForm();

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getAllJobs() {
    this.jobService.getAllJobs().subscribe((res) => {
      this.items = res;
    });
  }

  openNew() {
    this.item = {};
    this.submitted = false;
    this.itemAddDialog = true;
  }

  exportPdf() {}

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Job?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.items = this.items.filter((val) => this.deleteItem(val));
        this.selectedItems = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Clients Deleted',
          life: 3000,
        });
      },
    });
  }

  createJobForm() {
    this.itemsFormGroup = this.fb.group({
      jobTitle: [null, Validators.required],
      positionType: [null, Validators.required],
      departement: [null, Validators.required],
      qualifications: [null, Validators.required],
      location: [null, Validators.required],
      details: [null],
    });
  }

  viewItemDetailed(item: Jobs) {
    this.itemViewDialog = true;
    this.selectedItem = item;
  }

  editItem(item: any) {
    this.itemUpdateDialog = true;
    this.loadData(item);
    this.selectedItem = item;
  }

  deleteItem(item: any) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete Mr/Mrs ' +
        item.firsttName +
        item.lastName +
        '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.jobService.deleteJob(item.id);
        this.getAllJobs();
      },
    });
  }

  loadData(item: any) {
    this.itemsFormGroup?.get('jobTitle')?.patchValue(item.jobTitle);
    this.itemsFormGroup?.get('positionType')?.patchValue(item.positionType);
    this.itemsFormGroup?.get('departement')?.patchValue(item.departement);
    this.itemsFormGroup?.get('qualifications')?.patchValue(item.qualifications);
    this.itemsFormGroup?.get('location')?.patchValue(item.location);
    this.itemsFormGroup?.get('details')?.patchValue(item.details);
  }

  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.jobService.addJob(this.itemsFormGroup.value);
    this.hideDialog();
  }

  updateProduct() {
    this.jobService.updateJob(this.itemsFormGroup.value, this.selectedItem.id);
    this.itemUpdateDialog = false;
  }

  checkFormValidationJobTitle() {
    if (
      this.itemsFormGroup.get('jobTitle').invalid &&
      this.itemsFormGroup.get('jobTitle').touched &&
      this.itemsFormGroup.get('jobTitle').errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationpositionPositionType() {
    if (
      this.itemsFormGroup.get('positionType').invalid &&
      this.itemsFormGroup.get('positionType').touched &&
      this.itemsFormGroup.get('positionType').errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationpositionDepartement() {
    if (
      this.itemsFormGroup.get('departement').invalid &&
      this.itemsFormGroup.get('departement').touched &&
      this.itemsFormGroup.get('departement').errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }


  checkFormValidationpositionLocation() {
    if (
      this.itemsFormGroup.get('location').invalid &&
      this.itemsFormGroup.get('location').touched &&
      this.itemsFormGroup.get('location').errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }


  checkFormValidationpositionQualifications() {
    if (
      this.itemsFormGroup.get('qualifications').invalid &&
      this.itemsFormGroup.get('qualifications').touched &&
      this.itemsFormGroup.get('qualifications').errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }


  checkFormValidationpositionDetails() {
    if (
      this.itemsFormGroup.get('details').invalid &&
      this.itemsFormGroup.get('details').touched &&
      this.itemsFormGroup.get('details').errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }
}
