import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Client } from '@models/Client';
import { environment } from '@environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  baseUrl = environment.clientMicroservice;
  public triggerClientRefresh$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  getAllClients() {
    return this.http.get<Client[]>(this.baseUrl).pipe(
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
            title: 'Client has been added successfully',
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

  updateClient(values: any, clientId: any) {
    return this.http
      .put(this.baseUrl + '/update/' + clientId, values)
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
            title: 'Client has been updated successfully',
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

  deleteClient(idClient: any) {
    this.triggerClientRefresh$.next();
    return this.http
      .delete(this.baseUrl + '/delete-client/' + idClient)
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
            title: 'Client has been deleted successfully',
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
