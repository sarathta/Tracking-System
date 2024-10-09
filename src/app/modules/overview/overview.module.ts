import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewdialogModule } from '../overviewdialog/overviewdialog.module';
import { ApplicationPipesModule } from '../shared/application-pipes.module';

import { OverviewComponent } from 'src/app/demo/components/overview/overview.component';
import { RollingMillComponent } from 'src/app/demo/components/rolling-mill/rolling-mill.component';
import { Bof1Component } from 'src/app/demo/components/bof1/bof1.component';
import { Bof2Component } from 'src/app/demo/components/bof2/bof2.component';
import { AnomalyComponent } from 'src/app/demo/components/anomaly/anomaly.component';



@NgModule({
  declarations: [
    OverviewComponent,
    Bof1Component,
    RollingMillComponent,
    AnomalyComponent,
    Bof2Component
  ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ChartModule,
    MenuModule,
    TableModule,
    ButtonModule,
    StyleClassModule,
    PanelMenuModule,
    OverviewRoutingModule,
    OverviewdialogModule,
    ApplicationPipesModule,
  ]
})
export class OverviewModule { }
