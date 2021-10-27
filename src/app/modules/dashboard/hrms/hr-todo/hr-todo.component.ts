import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TodoService } from "@app/core/services/todo.service";
import { AuthService } from "@app/modules/auth/shared/_services/auth.service";
import { Todo } from "@app/shared/_models/Todo";

@Component({
  selector: "app-hr-todo",
  templateUrl: "./hr-todo.component.html",
  styleUrls: ["./hr-todo.component.scss"],
})
export class HrTodoComponent implements OnInit {
  items: Todo[];
  itemAddDialog: boolean;
  submitted: boolean;

  itemsFormGroup: FormGroup;
  currentUser: any;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllTodos();

    this.authService.currentUserSubject.subscribe((user) => {
      this.currentUser = user;
      this.createTodoForm();
    });
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe((res) => {
      this.items = res;
      console.log(res);
      // this.getMyTodosLoader = false;
    });
  }

  openNew() {
    this.submitted = false;
    this.itemAddDialog = true;
  }

  hideDialog() {
    this.itemAddDialog = false;
    this.submitted = false;
  }

  saveTodo() {
    this.todoService.addTodo(this.itemsFormGroup.value);
    this.hideDialog();
  }

  toggleEditable(event) {
    if (event.target.checked) {
      console.log("yeees");
    } else {
      console.log("nooo");
    }
  }

  loadData(item: any) {
    this.itemsFormGroup
      ?.get("connectedUserId")
      ?.patchValue(item.connectedUserId);
    this.itemsFormGroup?.get("fullName")?.patchValue(item.fullName);
    this.itemsFormGroup?.get("name")?.patchValue(item.name);
    this.itemsFormGroup?.get("priority")?.patchValue(item.priority);
    this.itemsFormGroup?.get("due")?.patchValue(item.due);
    this.itemsFormGroup?.get("done")?.patchValue(item.done);
    this.itemsFormGroup?.get("date")?.patchValue(item.date);
  }

  createTodoForm() {
    this.itemsFormGroup = this.fb.group({
      connectedUserId: [this.currentUser.id],
      fullName: [this.currentUser.name],
      name: [null, Validators.required],
      priority: [null, Validators.required],
      due: [null, Validators.required],
      done: [null, Validators.required],
    });
  }

  checkFormValidationName() {
    if (
      this.itemsFormGroup.get("name").invalid &&
      this.itemsFormGroup.get("name").touched &&
      this.itemsFormGroup.get("name").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationpositionDue() {
    if (
      this.itemsFormGroup.get("due").invalid &&
      this.itemsFormGroup.get("due").touched &&
      this.itemsFormGroup.get("due").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkFormValidationpositionPriority() {
    if (
      this.itemsFormGroup.get("priority").invalid &&
      this.itemsFormGroup.get("priority").touched &&
      this.itemsFormGroup.get("priority").errors.required
    ) {
      return true;
    } else {
      return false;
    }
  }
}
