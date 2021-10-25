import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EnqueteService} from '@satisfaction/shared/_service/enquete.service';
import {InviteUrl} from '@satisfaction/shared/_models/InviteUrl';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-enquete',
  templateUrl: './enquete.component.html',
  styleUrls: ['./enquete.component.css']
})

export class EnqueteComponent implements OnInit {
  invite: InviteUrl = new InviteUrl();
  error = false;
  loadComplete = false;
  isUpdate = false;
  loading$ = new BehaviorSubject<boolean>(true);
  constructor(
    private enqueteService: EnqueteService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
    ) { }
  // u = token , e = email, c = campaignId
  u: string;
  e: string;
  c: string;
  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.u = param.get('u');
      this.e = param.get('e');
      this.c = param.get('c');
      this.enqueteService.getSurveyByInviteUrl(this.u, this.e, this.c)
        .pipe(finalize(() => this.loading$.next(false)))
        .subscribe(invite => {
        if (invite){
          this.invite = invite;
        } else {
          this.error = true;
        }
        if (invite.responses){
          this.isUpdate = true;
        }
        this.loadComplete = true;
      }, err => {
        this.error = true;
        this.loadComplete = true;
      });
    });
  }
  ajouterReponse(event: any): void {
    this.invite.responses = event;
    if (this.isUpdate){
      console.log('update');
      this.enqueteService.updateReponse(this.u, this.e, event).subscribe(() => {
        this.snackBar.open('Reponse modifié')._dismissAfter(5000);
        setTimeout(() =>
          this.router.navigate([`/thank-you`]), 5000);
      }, () => this.snackBar.open('Erreur')._dismissAfter(5000));
    }else{
      console.log('add');
      this.enqueteService.addReponse(this.u, this.e, event).subscribe(() => {
        this.isUpdate = true;
        this.snackBar.open('Reponse ajouté')._dismissAfter(5000);
        setTimeout(() =>
          this.router.navigate([`/thank-you`]), 5000);
      }, () => this.snackBar.open('Erreur')._dismissAfter(5000));
    }
  }
}
