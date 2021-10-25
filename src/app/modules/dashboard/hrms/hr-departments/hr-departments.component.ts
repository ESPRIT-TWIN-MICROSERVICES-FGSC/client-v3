import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  
  import { ConfirmationService, MessageService } from 'primeng/api';
  import { DepartementService } from 'src/app/core/services/departement.service';
  import { Departement } from '@shared/_models/departement';
  
  import 'jspdf-autotable';
  
  declare var jsPDF: any;
  

@Component({
  selector: 'app-hr-departments',
  templateUrl: './hr-departments.component.html',
  styleUrls: ['./hr-departments.component.scss']
})
export class HrDepartmentsComponent implements OnInit {
  
 
    itemAddDialog: boolean;
    itemUpdateDialog: boolean;
    itemViewDialog: boolean;
  
    items: Departement[];
    item: any;
  
    selectedItems: any[];
    selectedItem: Departement;
  
    cols: any[];
  
    exportColumns: any[];
  
    submitted: boolean;
    itemsFormGroup: FormGroup;
  
    constructor(
      private clientService: DepartementService,
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
      const doc = new jsPDF('l', 'pt');
      doc.autoTable(this.exportColumns, this.items); // TypeScript compile time error
      doc.save('table.pdf');
    }
  
    deleteSelectedItems() {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected departement?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.items = this.items.filter((val) => this.deleteItem(val));
          this.selectedItems = null;
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'departement Deleted',
            life: 3000,
          });
        },
      });
    }
  
    createClientForm() {
      this.itemsFormGroup = this.fb.group({
        name: [null, Validators.required],
        employe: [null, Validators.required],
        number: [null],
        dispobile: [null, Validators.required],
      });
    }
  
    viewItemDetailed(item: Departement) {
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
          this.clientService.deleteClient(item.clientId);
          this.getAllClients();
        },
      });
    }
  
    loadData(client: any) {
      this.itemsFormGroup?.get('name')?.patchValue(client.name);
      this.itemsFormGroup?.get('employe')?.patchValue(client.employe);
      this.itemsFormGroup?.get('number')?.patchValue(client.number);
      this.itemsFormGroup?.get('disponbile')?.patchValue(client.disponbile);
  
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
        this.selectedItem.departementid
      );
      this.itemUpdateDialog = false;
    }
  
    checkFormValidationEmail() {
      if (
        this.itemsFormGroup.get('employe').invalid &&
        this.itemsFormGroup.get('employe').touched &&
        (this.itemsFormGroup.get('employe').errors.required !== null ||
          this.itemsFormGroup.get('employe').errors.pattern)
      ) {
        return true;
      } else {
        return false;
      }
    }
  
    getInvalidMessage() {
      if (this.itemsFormGroup.get('employe').errors !== null) {
        if (this.itemsFormGroup.get('employe').errors.required === true) {
          return 'required';
        } else {
          return 'invalid';
        }
      }
    }
  
    checkFormValidationFirstName() {
      if (
        this.itemsFormGroup.get('name').invalid &&
        this.itemsFormGroup.get('name').touched &&
        this.itemsFormGroup.get('name').errors.required
      ) {
        return true;
      } else {
        return false;
      }
    }
  
    checkFormValidationLastName() {
      if (
        this.itemsFormGroup.get('number').invalid &&
        this.itemsFormGroup.get('number').touched &&
        this.itemsFormGroup.get('number').errors.required
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  