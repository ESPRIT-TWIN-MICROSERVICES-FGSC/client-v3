import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Leave } from "src/app/shared/models/Leave";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class LeaveService {
  baseUrl = environment.congeMicroservice;
  public triggerLeaveRefresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllLeaves() {
    return this.http.get<Leave[]>(this.baseUrl + "/conges" ).pipe(
      map((res) => {
        return res;
      })
    );
  }

  addLeave(values: any) {
    return this.http
      .post(this.baseUrl + "/add", values)
      .pipe(
        tap(() => {
          this.triggerLeaveRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Leave has been added successfully",
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

  updateLeave(values: any, leaveId: any) {
    return this.http
      .put(this.baseUrl + "/update/" + leaveId, values)
      .pipe(
        tap(() => {
          this.triggerLeaveRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Leave has been updated successfully",
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

  deleteLeave(idLeave: any) {
    this.triggerLeaveRefresh$.next();
    return this.http
      .delete(this.baseUrl + "/delete/" + idLeave)
      .pipe(
        tap(() => {
          this.triggerLeaveRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Leave has been deleted successfully",
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
