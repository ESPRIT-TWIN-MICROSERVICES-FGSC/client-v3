import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl = environment.projectMicroservice;
  public triggerProjectRefresh$ = new Subject<void>();


  constructor(private http: HttpClient) { }
}
