import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ConfirmationService, MessageService } from "primeng/api";
import { ClientService } from "src/app/core/services/client.service";
import { Client } from "src/app/shared/models/Client";

import "jspdf-autotable";

declare var jsPDF: any;

// Add these scripts in angular.json in order to export pdf 
// "node_modules/jspdf/dist/jspdf.min.js",
// "node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js"

@Component({
  selector: "app-hr-clients",
  templateUrl: "./hr-clients.component.html",
  styleUrls: ["./hr-clients.component.scss"],
})
export class HrClientsComponent implements OnInit {
  itemAddDialog: boolean;
  itemUpdateDialog: boolean;
  itemViewDialog: boolean;

  items: Client[];
  item: any;

  selectedItems: any[];
  selectedItem: Client;

  cols: any[];

  exportColumns: any[];

  submitted: boolean;
  itemsFormGroup: FormGroup;

  constructor(
    private clientService: ClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllClients();
    this.clientService.triggerClientRefresh$.subscribe(() => {
      this.getAllClients();
    });
    this.createClientForm();

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

  getAllClients() {
    this.clientService.getAllClients().subscribe((res) => {
      this.items = res;
      console.log(res);
    });
  }

  openNew() {
    this.item = {};
    this.submitted = false;
    this.itemAddDialog = true;
  }

  exportPdf() {
    let doc = new jsPDF("l", "pt");
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

  createClientForm() {
    this.itemsFormGroup = this.fb.group({
      firsttName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
        ],
      ],
      tel: [null, Validators.required],
      designation: [null],
      webSite: [null],
      gender: [null],
      country: [null, Validators.required],
    });
  }

  viewItemDetailed(item: Client) {
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
        item.firsttName +
        item.lastName +
        "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.clientService.deleteClient(item.clientId);
        this.getAllClients();
      },
    });
  }

  loadData(client: any) {
    this.itemsFormGroup?.get("firsttName")?.patchValue(client.firsttName);
    this.itemsFormGroup?.get("lastName")?.patchValue(client.lastName);
    this.itemsFormGroup?.get("address")?.patchValue(client.address);
    this.itemsFormGroup?.get("designation")?.patchValue(client.designation);
    this.itemsFormGroup?.get("email")?.patchValue(client.email);
    this.itemsFormGroup?.get("webSite")?.patchValue(client.webSite);
    this.itemsFormGroup?.get("tel")?.patchValue(client.tel);
    this.itemsFormGroup?.get("country")?.patchValue(client.country);
  }

  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.clientService.addClient(this.itemsFormGroup.value);
    this.hideDialog();
  }

  updateProduct() {
    this.clientService.updateClient(
      this.itemsFormGroup.value,
      this.selectedItem.clientId
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
      this.itemsFormGroup.get("firsttName").invalid &&
      this.itemsFormGroup.get("firsttName").touched &&
      this.itemsFormGroup.get("firsttName").errors["required"]
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
}
