import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Jobs } from "src/app/shared/models/Jobs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class JobService {
  baseUrl = environment.JobMicroservice;
  public triggerJobRefresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllJobs() {
    return this.http.get<Jobs[]>(this.baseUrl + "/job").pipe(
      map((res) => {
        return res;
      })
    );
  }

  addJob(values: any) {
    return this.http
      .post(this.baseUrl + "/add", values)
      .pipe(
        tap(() => {
          this.triggerJobRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Job has been added successfully",
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

  updateJob(values: any, jobId: any) {
    return this.http
      .put(this.baseUrl + "/update/" + jobId, values)
      .pipe(
        tap(() => {
          this.triggerJobRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Client has been updated successfully",
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

  deleteJob(jobId: any) {
    this.triggerJobRefresh$.next();
    return this.http
      .delete(this.baseUrl + "/delete/" + jobId)
      .pipe(
        tap(() => {
          this.triggerJobRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Job has been deleted successfully",
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
