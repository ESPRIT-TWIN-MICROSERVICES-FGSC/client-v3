import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ClientCampaignService} from '@satisfaction/shared/_service/client-campaign.service';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Campaign} from '@satisfaction/shared/_models/Campaign';
import {CampaignService} from '@satisfaction/shared/_service/campaign.service';
import {InviteUrl} from '@satisfaction/shared/_models/InviteUrl';


@Component({
  selector: 'app-enquete',
  templateUrl: './enquete.component.html',
  styleUrls: ['./enquete.component.css']
})

export class EnqueteComponent implements OnInit {
  error = false;
  loadComplete = false;
  isUpdate = false;
  campaign: Campaign;
  invite: InviteUrl;
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private campaignService: CampaignService,
    private enqueteService: ClientCampaignService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
  }

  // e = email, c = campaignId
  clientEmail: string;
  campaignId: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.clientEmail = param.get('e');
      this.campaignId = param.get('c');
      this.campaignService.getCompagneById(this.campaignId)
        .pipe(finalize(() => this.loading$.next(false)))
        .subscribe(campaign => {
          const invite = campaign.inviteUrls.get(this.clientEmail);
          if (invite) {
            this.invite = invite;
          } else {
            this.error = true;
          }
          if (invite.responses) {
            this.isUpdate = true;
          }
          this.loadComplete = true;
        }, err => {
          this.error = true;
          this.loadComplete = true;
        });
    });
  }

  addResponse(event: any): void {
    this.campaign.inviteUrls.get(this.clientEmail).responses = event;
    if (this.isUpdate) {
      console.log('update');
      this.enqueteService.updateReponse(this.campaignId, this.clientEmail, event).subscribe(() => {
        this.snackBar.open('Reponse modifié')._dismissAfter(5000);
        setTimeout(() =>
          this.router.navigate([`/thank-you`]), 5000);
      }, () => this.snackBar.open('Erreur')._dismissAfter(5000));
    } else {
      console.log('add');
      this.enqueteService.addReponse(this.campaignId, this.clientEmail, event).subscribe(() => {
        this.isUpdate = true;
        this.snackBar.open('Reponse ajouté')._dismissAfter(5000);
        setTimeout(() =>
          this.router.navigate([`/thank-you`]), 5000);
      }, () => this.snackBar.open('Erreur')._dismissAfter(5000));
    }
  }
}
