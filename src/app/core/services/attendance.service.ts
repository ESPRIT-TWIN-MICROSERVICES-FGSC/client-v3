import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Attendance } from "@app/shared/_models/Attendance";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class AttendanceService {
  baseUrl = environment.attendanceMicroservice;
  public triggerAttendanceRefresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllAttendances() {
    return this.http.get<Attendance[]>(this.baseUrl + "/attendance").pipe(
      map((res) => {
        return res;
      })
    );
  }

  addAttendance(values: any) {
    return this.http
      .post(this.baseUrl + "/add", values)
      .pipe(
        tap(() => {
          this.triggerAttendanceRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Attendance has been added successfully",
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

  updateAttendance(values: any, attendanceId: any) {
    return this.http
      .put(this.baseUrl + "/update/" + attendanceId, values)
      .pipe(
        tap(() => {
          this.triggerAttendanceRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Attendance has been updated successfully",
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

  deleteAttendance(attendanceId: any) {
    this.triggerAttendanceRefresh$.next();
    return this.http
      .delete(this.baseUrl + "/delete/" + attendanceId)
      .pipe(
        tap(() => {
          this.triggerAttendanceRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Attendance has been deleted successfully",
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