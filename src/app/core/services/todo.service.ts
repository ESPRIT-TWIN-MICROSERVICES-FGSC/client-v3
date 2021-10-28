import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "@app/shared/_models/Todo";
import { environment } from "@environments/environment";
import { BehaviorSubject, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  baseUrl = environment.todoMicroservice;
  public triggerTodoRefresh$ = new Subject<void>();

  //Loading observables
  public triggerGetAllTodosLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllTodos() {
    this.triggerGetAllTodosLoading$.next(true);
    return this.http.get<Todo[]>(this.baseUrl).pipe(
      map((res) => {
        return res;
      })
    );
  }

  addTodo(values: any) {
    return this.http
      .post(this.baseUrl, values)
      .pipe(
        tap(() => {
          this.triggerTodoRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Todo has been added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error has been occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  doneTodo(id: any) {
    return this.http
      .post(this.baseUrl + "/done/" + id, {})
      .pipe(
        tap(() => {
          this.triggerTodoRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Todo is done",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error has been occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  undoneTodo(id: any) {
    return this.http
      .post(this.baseUrl + "/undone/" + id, {})
      .pipe(
        tap(() => {
          this.triggerTodoRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Todo is undone",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error has been occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  deleteTodo(id: any) {
    return this.http
      .delete(this.baseUrl + "/" + id)
      .pipe(
        tap(() => {
          this.triggerTodoRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Todo has been deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "An error has been occured",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
}
