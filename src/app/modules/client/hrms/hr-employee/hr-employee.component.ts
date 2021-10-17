import { Component, OnInit, TemplateRef } from "@angular/core";
import Swal from "sweetalert2";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Employee } from "src/app/shared/models/Employee";
import { EmployeeService } from "src/app/core/services/employee.service";
import { ConfirmationService, MessageService } from "primeng/api";
@Component({
  selector: "app-hr-employee",
  templateUrl: "./hr-employee.component.html",
  styleUrls: ["./hr-employee.component.scss"],
})
export class HrEmployeeComponent implements OnInit {
  EmpViewTab: boolean;
  EmpAllTab: boolean = true;
  EmpLeaveTab: boolean;
  isStaticticsCollapsed: boolean;
  staticscard: boolean = true;
  modalRef: BsModalRef;

  itemAddDialog: boolean;
  itemUpdateDialog: boolean;
  itemViewDialog: boolean;

  items: Employee[];
  item: any;

  selectedItems: any[];
  selectedItem: Employee;

  cols: any[];

  exportColumns: any[];

  submitted: boolean;
  itemsFormGroup: FormGroup;

  constructor(
    private modalService: BsModalService,
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.employeeService.triggerEmployeeRefresh$.subscribe(() => {
      this.getAllEmployees();
    });
    this.createEmployeeForm();

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

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      this.items = res;
      console.log(res);
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
      message: "Are you sure you want to delete the selected Employee?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.items = this.items.filter((val) => this.deleteItem(val));
        this.selectedItems = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Employee Deleted",
          life: 3000,
        });
      },
    });
  }

  createEmployeeForm() {
    this.itemsFormGroup = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
        ],
      ],
      address: [null],
      tel: [null, Validators.required],
      designation: [null],
      joinDate: [null],
      gender: [null],
      birthDate: [null, Validators.required],
    });
  }

  viewItemDetailed(item: Employee) {
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
        "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.employeeService.deleteEmployee(item.id);
        this.getAllEmployees();
      },
    });
  }

  loadData(item: any) {
    this.itemsFormGroup?.get("firstName")?.patchValue(item.firstName);
    this.itemsFormGroup?.get("lastName")?.patchValue(item.lastName);
    this.itemsFormGroup?.get("email")?.patchValue(item.email);
    this.itemsFormGroup?.get("webSite")?.patchValue(item.joinDate);
    this.itemsFormGroup?.get("designation")?.patchValue(item.designation);
    this.itemsFormGroup?.get("gender")?.patchValue(item.gender);
    this.itemsFormGroup?.get("tel")?.patchValue(item.tel);
    this.itemsFormGroup?.get("birthDate")?.patchValue(item.birthDate);
    this.itemsFormGroup?.get("address")?.patchValue(item.address);
  }

  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }

  saveEmployee() {
    this.employeeService.addEmployee(this.itemsFormGroup.value);
    this.hideDialog();
  }

  updateEmployee() {
    this.employeeService.updateEmployee(
      this.itemsFormGroup.value,
      this.selectedItem.id
    );
    this.itemUpdateDialog = false;
  }

  checkFormValidationEmail() {
    if (
      this.itemsFormGroup.get("email").invalid &&
      this.itemsFormGroup.get("email").touched &&
      (this.itemsFormGroup.get("email").errors["required"] !== null ||
        this.itemsFormGroup.get("email").errors["pattern"])
    ) {
      return true;
    } else {
      return false;
    }
  }

  getInvalidMessage() {
    if (this.itemsFormGroup.get("email").errors !== null) {
      if (this.itemsFormGroup.get("email").errors["required"] === true) {
        return "required";
      } else {
        return "invalid";
      }
    }
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

  onTab(number) {
    this.EmpAllTab = false;
    this.EmpViewTab = false;
    this.EmpLeaveTab = false;

    if (number == "1") {
      this.EmpAllTab = true;
    } else if (number == "2") {
      this.EmpViewTab = true;
    } else if (number == "3") {
      this.EmpLeaveTab = true;
    }
  }

  sweettalert7() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this imaginary file!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "rgb(220, 53, 69)",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          "Deleted!",
          "Your imaginary file has been deleted.",
          "success"
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  }

  CardRemoveStatics() {
    this.staticscard = false;
  }

  AddModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "gray modal-md" })
    );
  }
}
