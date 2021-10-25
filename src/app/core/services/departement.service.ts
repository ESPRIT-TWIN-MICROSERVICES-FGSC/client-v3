import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Departement  } from '@shared/_models/departement';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class DepartementService {
  baseUrl = environment.departementMicroservice;
  public triggerClientRefresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllClients() {
    return this.http.get<Departement[]>(this.baseUrl).pipe(
      map((res) => {
        return res;
      })
    );
  }

  addClient(values: any) {
    return this.http
      .post(this.baseUrl + '/add', values)
      .pipe(
        tap(() => {
          this.triggerClientRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Departement has been added successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'An error has been occured',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  updateClient(values: any, departementid: any) {
    return this.http
      .put(this.baseUrl + '/update/' + departementid, values)
      .pipe(
        tap(() => {
          this.triggerClientRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Departement has been updated successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'An error has been occured',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }

  deleteClient(departementid: any) {
    this.triggerClientRefresh$.next();
    return this.http
      .delete(this.baseUrl + '/delete/' + departementid)
      .pipe(
        tap(() => {
          this.triggerClientRefresh$.next();
        })
      )
      .subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'departement has been deleted successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        (error) => {
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'An error has been occured',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      );
  }
}
