import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Attendance } from "@app/shared/_models/Attendance";
import { ConfirmationService, MessageService } from "primeng/api";
import { AttendanceService } from "src/app/core/services/attendance.service";

@Component({
  selector: "app-hr-attendance",
  templateUrl: "./hr-attendance.component.html",
  styleUrls: ["./hr-attendance.component.scss"],
})
export class HrAttendanceComponent implements OnInit {
  itemAddDialog: boolean;
  itemUpdateDialog: boolean;
  itemViewDialog: boolean;

  items: Attendance[];
  item: any;

  selectedItems: any[];
  selectedItem: Attendance;

  cols: any[];

  exportColumns: any[];

  submitted: boolean;
  itemsFormGroup: FormGroup;

  constructor(
    private attendanceService: AttendanceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllAttendances();
    this.attendanceService.triggerAttendanceRefresh$.subscribe(() => {
      this.getAllAttendances();
    });
    this.createAttendanceForm();

    this.cols = [
      { field: "code", header: "Code" },
      { field: "name", header: "Name" },
      { field: "category", header: "Category" },
      { field: "quantity", header: "Quantity" },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  getAllAttendances() {
    this.attendanceService.getAllAttendances().subscribe((res) => {
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
      message: "Are you sure you want to delete the selected Attendance?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.items = this.items.filter((val) => this.deleteItem(val));
        this.selectedItems = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Clients Deleted",
          life: 3000,
        });
      },
    });
  }

  createAttendanceForm() {
    this.itemsFormGroup = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      departement: [null, Validators.required],
      checkIn: [null, Validators.required],
      shift: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  viewItemDetailed(item: Attendance) {
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
        "Are you sure you want to delete Mr/Mrs " +
        item.firstName +
        item.lastName +
        " 's attendance ?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.attendanceService.deleteAttendance(item.id);
        this.getAllAttendances();
      },
    });
  }

  loadData(item: any) {
    this.itemsFormGroup?.get("firstName")?.patchValue(item.firstName);
    this.itemsFormGroup?.get("lastName")?.patchValue(item.lastName);
    this.itemsFormGroup?.get("departement")?.patchValue(item.departement);
    this.itemsFormGroup?.get("checkIn")?.patchValue(item.checkIn);
    this.itemsFormGroup?.get("shift")?.patchValue(item.shift);
    this.itemsFormGroup?.get("status")?.patchValue(item.status);
  }

  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.attendanceService.addAttendance(this.itemsFormGroup.value);
    this.hideDialog();
  }

  updateProduct() {
    this.attendanceService.updateAttendance(
      this.itemsFormGroup.value,
      this.selectedItem.id
    );
    this.itemUpdateDialog = false;
  }

  checkFormValidationFirstName() {
    if (
      this.itemsFormGroup.get("firstName").invalid &&
      this.itemsFormGroup.get("firstName").touched &&
      this.itemsFormGroup.get("firstName").errors["required"]
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationLastName() {
    if (
      this.itemsFormGroup.get("lastName").invalid &&
      this.itemsFormGroup.get("lastName").touched &&
      this.itemsFormGroup.get("lastName").errors["required"]
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkFormValidationDepartment() {
    if (
      this.itemsFormGroup.get("departement").invalid &&
      this.itemsFormGroup.get("departement").touched &&
      this.itemsFormGroup.get("departement").errors["required"]
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkFormValidationCheckIn() {
    if (
      this.itemsFormGroup.get("checkIn").invalid &&
      this.itemsFormGroup.get("checkIn").touched &&
      this.itemsFormGroup.get("checkIn").errors["required"]
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkFormValidationShift() {
    if (
      this.itemsFormGroup.get("shift").invalid &&
      this.itemsFormGroup.get("shift").touched &&
      this.itemsFormGroup.get("shift").errors["required"]
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkFormValidationStatus() {
    if (
      this.itemsFormGroup.get("status").invalid &&
      this.itemsFormGroup.get("status").touched &&
      this.itemsFormGroup.get("status").errors["required"]
    ) {
      return true;
    } else {
      return false;
    }
  }
}
