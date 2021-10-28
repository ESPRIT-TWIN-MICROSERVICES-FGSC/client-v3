import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Employee } from "@shared/_models/Employee";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  baseUrl = environment.employeeMicroservice;
  public triggerEmployeeRefresh$ = new Subject<void>();

  //Loading observables
  public triggerGetAllEmployeesLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllEmployees() {
    this.triggerGetAllEmployeesLoading$.next(true);
    return this.http.get<Employee[]>(this.baseUrl + "/employees").pipe(
      map((res) => {
        return res;
      })
    );
  }

  addEmployee(values: any) {
    return this.http
      .post(this.baseUrl + "/add", values)
      .pipe(
        tap(() => {
          this.triggerEmployeeRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Employee has been added successfully",
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

  updateEmployee(values: any, employeeId: any) {
    return this.http
      .put(this.baseUrl + "/update/" + employeeId, values)
      .pipe(
        tap(() => {
          this.triggerEmployeeRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Employee has been updated successfully",
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

  deleteEmployee(employeeId: any) {
    this.triggerEmployeeRefresh$.next();
    return this.http
      .delete(this.baseUrl + "/delete/" + employeeId)
      .pipe(
        tap(() => {
          this.triggerEmployeeRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Employee has been deleted successfully",
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
