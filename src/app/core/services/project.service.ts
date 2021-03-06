import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Projects } from "@shared/_models/Project";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  baseUrl = environment.projectMicroservice;
  public triggerProjectRefresh$ = new Subject<void>();

  //Loading observables
  public triggerGetAllProjectLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllProjects() {
    this.triggerGetAllProjectLoading$.next(true);
    return this.http.get<Projects[]>(this.baseUrl + "/projets").pipe(
      map((res) => {
        return res;
      })
    );
  }

  addProjects(values: any) {
    return this.http
      .post(this.baseUrl + "/add", values)
      .pipe(
        tap(() => {
          this.triggerProjectRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Project has been added successfully",
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

  updateProject(values: any, projectId: any) {
    return this.http
      .put(this.baseUrl + "/update/" + projectId, values)
      .pipe(
        tap(() => {
          this.triggerProjectRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Project has been updated successfully",
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

  deleteProject(ProjectId: any) {
    this.triggerProjectRefresh$.next();
    return this.http
      .delete(this.baseUrl + "/delete/" + ProjectId)
      .pipe(
        tap(() => {
          this.triggerProjectRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Project has been deleted successfully",
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
