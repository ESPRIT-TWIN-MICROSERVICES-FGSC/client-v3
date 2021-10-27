import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { LeaveService } from "src/app/core/services/leave.service";
import { Leave } from "@shared/_models/Leave";

import "jspdf-autotable";
import { EmployeeService } from "@app/core/services/employee.service";

declare var jsPDF: any;

@Component({
  selector: "app-hr-leaves",
  templateUrl: "./hr-leaves.component.html",
  styleUrls: ["./hr-leaves.component.scss"],
})
export class HrLeavesComponent implements OnInit {
  itemAddDialog: boolean;
  itemUpdateDialog: boolean;
  itemViewDialog: boolean;

  items: Leave[];
  item: any;

  selectedItems: any[];
  selectedItem: Leave;

  cols: any[];

  exportColumns: any[];

  submitted: boolean;
  itemsFormGroup: FormGroup;
  employeeList: any[] = [];
  selectedEmployee: any;

  constructor(
    private leaveService: LeaveService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getAllLeaves();
    this.getAllEmployees();

    this.leaveService.triggerLeaveRefresh$.subscribe(() => {
      this.getAllLeaves();
    });

    this.createLeaveForm();

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

  getAllLeaves() {
    this.leaveService.getAllLeaves().subscribe((res) => {
      this.items = res;
    });
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      res.map((r) =>
        this.employeeList.push({
          id: r.id,
          fullName: r.firstName + " " + r.lastName,
          firstName: r.firstName,
          lastName: r.lastName,
        })
      );
    });
  }
  getEmployeeById(id: string) {
    this.employeeService.getEmployeeById(id).subscribe((res) => {
      console.log(res);
    });
  }
  onSelectedEmployee(event) {
    this.itemsFormGroup?.get("employeId")?.patchValue(event.value.id);
    this.itemsFormGroup?.get("firstName")?.patchValue(event.value.firstName);
    this.itemsFormGroup?.get("lastName")?.patchValue(event.value.lastName);
  }

  openNew() {
    this.item = {};
    this.submitted = false;
    this.itemAddDialog = true;
  }

  exportPdf() {
    const doc = new jsPDF("l", "pt");
    doc.autoTable(this.exportColumns, this.items); // TypeScript compile time error
    doc.save("table.pdf");
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected Clients?",
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

  createLeaveForm() {
    this.itemsFormGroup = this.fb.group({
      employeId: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
      type: [null, Validators.required],
    });
  }

  viewItemDetailed(item: Leave) {
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
      message: "Are you sure you want to delete this leave ? ",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.leaveService.deleteLeave(item.id);
      },
    });
  }

  loadData(item: any) {
    this.itemsFormGroup?.get("start_date")?.patchValue(item.start_date);
    this.itemsFormGroup?.get("end_date")?.patchValue(item.end_date);
    this.itemsFormGroup?.get("fistName")?.patchValue(item.fistName);
    this.itemsFormGroup?.get("lastName")?.patchValue(item.lastName);
    this.itemsFormGroup?.get("type")?.patchValue(item.type);
  }

  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }

  saveLeave() {
    this.leaveService.addLeave(this.itemsFormGroup.value);
    this.hideDialog();
  }

  updateLeave() {
    this.leaveService.updateLeave(
      this.itemsFormGroup.value,
      this.selectedItem.id
    );
    this.itemUpdateDialog = false;
  }

  checkFormValidationStartDate() {
    if (
      this.itemsFormGroup.get("start_date").invalid &&
      this.itemsFormGroup.get("start_date").touched &&
      this.itemsFormGroup.get("start_date").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationEndDate() {
    if (
      this.itemsFormGroup.get("end_date").invalid &&
      this.itemsFormGroup.get("end_date").touched &&
      this.itemsFormGroup.get("end_date").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationType() {
    if (
      this.itemsFormGroup.get("type").invalid &&
      this.itemsFormGroup.get("type").touched &&
      this.itemsFormGroup.get("type").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }
}
