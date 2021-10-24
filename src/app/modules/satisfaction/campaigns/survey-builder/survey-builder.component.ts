import { Component, Input, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { options } from './options';
import {ActivatedRoute, Router} from '@angular/router';
import { CompagneService } from '../../shared/_service/compagne.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Campaign} from '@satisfaction/shared/_models/Campaign';

@Component({
  selector: 'app-survey-builder',
  templateUrl: './survey-builder.component.html',
  styleUrls: ['./survey-builder.component.css']
})
export class SurveyBuilderComponent implements  OnInit {
  // TODO : ADD Output
  // TODO : ADD DELETE HANDLE
  @Input() compagne: Campaign;
  id: number;
  public options: any;
  public language = 'fr';
  public rebuildEmitter: Subject<object> = new Subject<object>();
  dateForm = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(private route: ActivatedRoute,
              private router: Router,
              private campaignService: CompagneService,
              private snackBar: MatSnackBar) {
    this.options = options;
  }
  get start(): AbstractControl { return this.dateForm.get('start'); }
  get end(): AbstractControl { return this.dateForm.get('end'); }
  ngOnInit(): void {
    if (!this.compagne){
      this.id = this.route.snapshot.params.id;
      if (this.id) {
          this.campaignService.getCompagneById(this.id).subscribe(c => {
            this.compagne = c;
            this.start.setValue(c.StartDateTime);
            this.end.setValue(c.EndDateTime);
          }, err => {
            console.log(err);
          });
      }
      else {
        this.compagne = new Campaign();
      }
    }
  }
  submitCampaign(): void {
    if (!this.start.value){
      this.snackBar.open('Date début non séléctionné')._dismissAfter(5000);
    } else if (!this.end.value){
      this.snackBar.open('Date fin non séléctionné')._dismissAfter(5000);
    } else if (this.end.value < this.start.value){
      this.snackBar.open('Date fin supérieure a date début')._dismissAfter(5000);
    } else if (this.compagne.Form.components.length <= 0) {
      this.snackBar.open('Seulement 1 composant présent')._dismissAfter(3000);
    } else {
      this.compagne.StartDateTime = this.start.value;
      this.compagne.EndDateTime = this.end.value;
      console.log(this.compagne);
      if (!this.compagne.Id){
        this.campaignService.addCompagne(this.compagne).subscribe(data => {
          this.compagne.Id = data;
          setTimeout(() =>
            this.router.navigate([`/dashboard/campaigns/${this.compagne.Id}/details`]), 5000);
        }, err => {
          console.log(err.message);
        });
      } else {
        this.campaignService.updateCompagne(this.compagne).subscribe(data => {
          setTimeout(() =>
            this.router.navigate([`/dashboard/campaigns/${this.compagne.Id}/details`]), 5000);
        });
      }
    }
  }
  onChange(event: any): void {
    console.log(this.compagne.Form);
    if (event.component.action === 'submit') {
      event.component.theme = 'warning';
      event.component.customClass = 'd-flex justify-content-center';
      const submitCount = this.compagne.Form.components.filter(c => c.action === 'submit').length;
      if (submitCount > 1) {
        alert('Cannot add more than one submit button');
      }
    }
    // event.component.properties = { 'id': 'test' };
  }
  changeLanguage(language: string): void {
    this.language = language;
    this.options.language = this.language;
    this.rebuildEmitter.next(this.options);
  }
}

