import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { ProjectService } from "src/app/core/services/project.service";
import { Projects } from "@shared/_models/Project";
import { ClientService } from "@app/core/services/client.service";

@Component({
  selector: "app-hr-projects",
  templateUrl: "./hr-projects.component.html",
  styleUrls: ["./hr-projects.component.scss"],
})
export class HrProjectsComponent implements OnInit {
  dpgridTab: boolean;
  dplistTab = true;
  isCollapsed1 = false;
  isCollapsed2 = false;
  isCollapsed3 = false;
  isCollapsed4 = false;
  isCollapsed5 = false;
  isCollapsed6 = false;

  itemAddDialog: boolean;
  itemUpdateDialog: boolean;
  itemViewDialog: boolean;

  items: Projects[];
  item: any;

  selectedItems: any[];
  selectedItem: Projects;

  cols: any[];

  exportColumns: any[];

  clientsList: any[] = [];
  selectedClient: any;

  submitted: boolean;
  itemsFormGroup: FormGroup;

  //Loding variables
  getMyProjectsLoader: boolean;

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private clientService: ClientService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllProjects();
    this.getAllClients();
    this.projectService.triggerProjectRefresh$.subscribe(() => {
      this.getAllProjects();
    });
    this.createProjectForm();

    this.projectService.triggerGetAllProjectLoading$.subscribe((status) => {
      this.getMyProjectsLoader = status;
    });

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

  getAllProjects() {
    this.projectService.getAllProjects().subscribe((res) => {
      this.getMyProjectsLoader = false;
      this.items = res;
    });
  }

  getAllClients() {
    this.clientService.getAllClients().subscribe((res) => {
      console.log("this is the list of clients ", res);
      res.map((r) =>
        this.clientsList.push({
          name: r.fullName,
          email: r.email,
        })
      );
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
      message: "Are you sure you want to delete the selected project?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.items = this.items.filter((val) => this.deleteItem(val));
        this.selectedItems = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Projects Deleted",
          life: 3000,
        });
      },
    });
  }

  onSelectedClient(event) {
    this.itemsFormGroup?.get("clientName")?.patchValue(event.value.name);
    this.itemsFormGroup?.get("clientEmail")?.patchValue(event.value.email);
  }

  createProjectForm() {
    this.itemsFormGroup = this.fb.group({
      projectName: [null, Validators.required],
      clientName: [null, Validators.required],
      clientEmail: [
        "",
        [
          Validators.required,
          Validators.pattern("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
        ],
      ],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      teamSize: [null, Validators.required],
      projectDetails: [null, Validators.required],
    });
  }

  viewItemDetailed(item: Projects) {
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
        "Are you sure you want to delete Mr/Mrs " + item.projectName + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.projectService.deleteProject(item.id);
        this.getAllProjects();
      },
    });
  }

  loadData(item: any) {
    this.itemsFormGroup?.get("projectName")?.patchValue(item.projectName);
    this.itemsFormGroup?.get("clientName")?.patchValue(item.clientName);
    this.itemsFormGroup?.get("clientEmail")?.patchValue(item.clientEmail);
    this.itemsFormGroup?.get("startDate")?.patchValue(item.startDate);
    this.itemsFormGroup?.get("endDate")?.patchValue(item.endDate);
    this.itemsFormGroup?.get("teamSize")?.patchValue(item.teamSize);
    this.itemsFormGroup?.get("projectDetails")?.patchValue(item.projectDetails);
  }

  clearForm() {
    this.itemsFormGroup?.get("projectName")?.patchValue("");
    this.itemsFormGroup?.get("clientName")?.patchValue("");
    this.itemsFormGroup?.get("clientEmail")?.patchValue("");
    this.itemsFormGroup?.get("startDate")?.patchValue("");
    this.itemsFormGroup?.get("endDate")?.patchValue("");
    this.itemsFormGroup?.get("teamSize")?.patchValue("");
    this.itemsFormGroup?.get("projectDetails")?.patchValue("");
  }

  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.projectService.addProjects(this.itemsFormGroup.value);
    this.hideDialog();
    this.clearForm();
  }

  updateProduct() {
    this.projectService.updateProject(
      this.itemsFormGroup.value,
      this.selectedItem.id
    );
    this.itemUpdateDialog = false;
    this.clearForm();
  }

  checkFormValidationEmail() {
    if (
      this.itemsFormGroup.get("clientEmail").invalid &&
      this.itemsFormGroup.get("clientEmail").touched &&
      (this.itemsFormGroup.get("clientEmail").errors.required !== null ||
        this.itemsFormGroup.get("clientEmail").errors.pattern)
    ) {
      return true;
    } else {
      return false;
    }
  }

  getInvalidMessage() {
    if (this.itemsFormGroup.get("clientEmail").errors !== null) {
      if (this.itemsFormGroup.get("clientEmail").errors.required === true) {
        return "required";
      } else {
        return "invalid";
      }
    }
  }

  checkFormValidationProjectName() {
    if (
      this.itemsFormGroup.get("projectName").invalid &&
      this.itemsFormGroup.get("projectName").touched &&
      this.itemsFormGroup.get("projectName").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationClientName() {
    if (
      this.itemsFormGroup.get("clientName").invalid &&
      this.itemsFormGroup.get("clientName").touched &&
      this.itemsFormGroup.get("clientName").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationStartDate() {
    if (
      this.itemsFormGroup.get("startDate").invalid &&
      this.itemsFormGroup.get("startDate").touched &&
      this.itemsFormGroup.get("startDate").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkFormValidationEndDate() {
    if (
      this.itemsFormGroup.get("endDate").invalid &&
      this.itemsFormGroup.get("endDate").touched &&
      this.itemsFormGroup.get("endDate").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkFormValidationTeamSize() {
    if (
      this.itemsFormGroup.get("teamSize").invalid &&
      this.itemsFormGroup.get("teamSize").touched &&
      this.itemsFormGroup.get("teamSize").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }
  checkFormValidationProjectDetails() {
    if (
      this.itemsFormGroup.get("projectDetails").invalid &&
      this.itemsFormGroup.get("projectDetails").touched &&
      this.itemsFormGroup.get("projectDetails").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  onTab(number) {
    this.dplistTab = false;
    this.dpgridTab = false;
    if (number == "1") {
      this.dplistTab = true;
    } else if (number == "2") {
      this.dpgridTab = true;
    }
  }
}
