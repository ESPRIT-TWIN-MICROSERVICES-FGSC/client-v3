import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CampaignService} from '@satisfaction/shared/_service/campaign.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Campaign} from '@satisfaction/shared/_models/Campaign';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-campaign-dashboard',
  templateUrl: './campaign-dashboard.component.html',
  styleUrls: ['./campaign-dashboard.component.css']
})
export class CampaignDashboardComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute,
              private campaignService: CampaignService,
              public dialog: MatDialog) {
  }

  campaign: Campaign;
  invitedClientsCount = 0;
  answeredClientsCount = 0;
  stats: any[];
  loading = true;
  hasErrors = false;
  error = '';
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLegend = true;
  barChartPlugins: any = [];
  // BAR

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          return ctx.chart.data.labels[ctx.dataIndex];
        },
      },
    }
  };

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.campaignService.getCompagneById(this.route.snapshot.params.id).subscribe(c => {
      this.campaign = c;
      if (this.isIterable(this.campaign.form.components)) {
        for (const component of this.campaign.form.components) {
          const labels: Label[] = [];
          const barChartData: ChartDataSets[] = [];
          component.data = [];
          if (component.type === 'survey') {
            Object.values(component.questions).map( (question: any) => question.label).forEach(answerKey => labels.push(answerKey));
            Object.values(component.values).forEach((value: any) => {
              const dataSet: { label: string; data: number[] } = { data : [] , label : '' };
              dataSet.label = value.label;
              barChartData.push(dataSet);
            });
            for (const key of barChartData){
              const holderArray: number[] = [];
              Object.values(component.answers).map((answer: any) => answer[key.label]).forEach((value => {
                holderArray.push(value);
              }));
              key.data = holderArray;
            }
            component.labels = labels;
            component.data = barChartData;
            this.stats.push(component);
          } else if (component.type === 'select') {
            const values: number[] = [];
            const keys: string[] = [];
            Object.values(component.values).map((v: any) => v.label)
              .forEach(componentValue => labels.push(componentValue));
            Object.values(component.values).map((v: any) => v.value)
              .forEach(componentValue => keys.push(componentValue));
            keys.forEach( key => {
              values.push(Object.entries(component.answers).filter((value: any) => {
                return value[1] === key;
              }).length);
            });
            component.labels = labels;
            component.data.push(values);
            this.stats.push(component);
          } else if (component.type === null) {
            console.log('HAAAAHAAAAA');
          }
        }
      }
    }, err => {
      this.hasErrors = true;
      this.error = err;
    });
    this.campaignService.countResponsesByCampaign(this.route.snapshot.params.id).subscribe(
      val => {
        // this.campaignService.invitedClientsEmails = val;
        const interval = setInterval(() => {
          if (this.answeredClientsCount === 200 && val > 400 || this.answeredClientsCount === val) {
            clearInterval(interval);
            this.answeredClientsCount = val;
            this.answeredClientsCount--;
          }
          this.answeredClientsCount++;
        }, 30);
      }, err => console
    );
    this.campaignService.countInvitedClients(this.route.snapshot.params.id)
      .subscribe(val => {
        const interval = setInterval(() => {
          if (this.invitedClientsCount === 200 && val > 400 || this.invitedClientsCount === val) {
            clearInterval(interval);
            this.invitedClientsCount = val;
            this.invitedClientsCount--;
          }
          this.invitedClientsCount++;
        }, 30);
      }, err => {
        this.hasErrors = true;
        this.error = err;
      });
    // console.log()
    this.loading = false;
  }

  isIterable(obj: any): boolean {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  openDeleteDialog(): void {
    this.dialog.open(ConfirmDeleteCampaignDialogComponent, {
      data: this.campaign
    });
  }

  extractLabelsFromSurveyOrSelectQuestions(questions: any): string[] {
    console.log(questions);
    return Object.keys(questions).map((question: any) => question.label);
  }
}

@Component({
  selector: 'app-confirm-delete-campaign-dialog',
  templateUrl: 'confirm-delete-campaign-dialog.html',
})
export class ConfirmDeleteCampaignDialogComponent {
  campaign: Campaign;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteCampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Campaign, private compagneService: CampaignService, private snackBar: MatSnackBar) {
    this.campaign = data;
  }

  onConfirmClick(): void {
    this.compagneService.deleteCompagne(this.campaign.id).subscribe(val => {
      this.snackBar.open('Compagne supprimé')._dismissAfter(5000);
      this.dialogRef.close();
    }, error => {
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export class HolderDataSet {
  label: string;
  data: number[] = [];
}


//          if (stat.type === 'survey' || stat.type === 'select') {
//             stat.labels = stat.type = Array.from(stat.values, (x: any) => x.label);
//             stat.data = new BarChartData();
//             Object.entries(stat.answers).map((answer: any) => {
//               console.log('entries & type = ' + stat.type);
//             });
//             Object.values(stat.answers).map((answer: any) => {
//               console.log('values & type = ' + stat.type);
//               console.log(answer);
//             });
//           }


//   Object.values(stat.answers).map(answer => {
//     if ( stat.type === 'survey'){
//       //console.log('survey');
//       //Object.values(answer).forEach((val) => console.log(val));
//     } else if (stat.type === 'select'){
//       Object.entries(answer).forEach((val) => console.log(val));
//     }
//   });
//   Object.values(stat.answers).forEach((answer: any, i: number) => {
//     if ( stat.type === 'survey'){
//       // stat.data.data.push(answer);
//     } else {
//       stat.data.data.push(answer);
//     }
//   });
// Object.values(stat.answers).forEach((answer: any, i: number) => {
//   if ( stat.type === 'survey'){
//     stat.data.data.push(answer[i]);
//   } else {
//     stat.data.data.push(answer[i]);
//   }
// });
//  console.log(stat.data);
// }
