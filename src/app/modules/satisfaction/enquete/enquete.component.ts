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

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.enqueteService.getSurveyByInviteUrl(param.get('u'))
        .pipe(finalize(() => this.loading$.next(false)))
        .subscribe(invite => {
        if (invite){
          this.invite = invite;
        } else {
          this.error = true;
        }
        if (invite.Response.data){
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
    this.invite.Response = event;
    console.log(this.invite.Response);
    if (this.isUpdate){
      console.log('update');
      this.enqueteService.updateReponse(this.invite).subscribe(() => {
        this.snackBar.open('Reponse modifié')._dismissAfter(5000);
        setTimeout(() =>
          this.router.navigate([`/thank-you`]), 5000);
      }, () => this.snackBar.open('Erreur')._dismissAfter(5000));
    }else{
      console.log('add');
      this.enqueteService.addReponse(this.invite).subscribe(() => {
        this.isUpdate = true;
        this.snackBar.open('Reponse ajouté')._dismissAfter(5000);
        setTimeout(() =>
          this.router.navigate([`/thank-you`]), 5000);
      }, err => this.snackBar.open('Erreur')._dismissAfter(5000));
    }
  }
}
