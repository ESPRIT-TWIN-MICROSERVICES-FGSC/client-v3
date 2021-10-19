import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbComponent} from "@shared/components/breadcrumb/breadcrumb.component";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule,
        MatIconModule,
        MatChipsModule,
    ],
  exports:[
    BreadcrumbComponent
  ]
})
export class BreadcrumbModule { }
