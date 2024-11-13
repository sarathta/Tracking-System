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
import { ProgressBarModule } from 'primeng/progressbar';
import { HighchartsChartModule } from 'highcharts-angular';
import { CalendarModule } from 'primeng/calendar';
import { PrimeNgCommonModule } from '../common/prime-ng-common.module';

import { OverviewComponent } from 'src/app/demo/components/overview/overview.component';
import { RollingMillComponent } from 'src/app/demo/components/rolling-mill/rolling-mill.component';
import { Bof1Component } from 'src/app/demo/components/bof1/bof1.component';
import { Bof1DetailsComponent } from 'src/app/demo/components/bof1/bof1-details/bof1-details.component';
import { Bof2Component } from 'src/app/demo/components/bof2/bof2.component';
import { AnomalyComponent } from 'src/app/demo/components/anomaly/anomaly.component';
import { LadleFurnaceComponent } from 'src/app/demo/components/ladle-furnace/ladle-furnace.component';
import { BlastFurnaceComponent } from 'src/app/demo/components/blast-furnace/blast-furnace.component';
import { LfLogsheetComponent } from 'src/app/demo/components/logsheets/lf-logsheet/lf-logsheet.component';
import { BarPlanningComponent } from 'src/app/demo/components/bar-planning/bar-planning.component';
import { LadleFurnaceProcessComponent } from 'src/app/demo/components/ladle-furnace/ladle-furnace-process/ladle-furnace-process.component';
import { VdLogsheetComponent } from 'src/app/demo/components/logsheets/vd-logsheet/vd-logsheet.component';
import { VaccumDegassingComponent } from 'src/app/demo/components/vaccum-degassing/vaccum-degassing.component';
import { Bof1ProcessComponent } from 'src/app/demo/components/bof1/bof1-process/bof1-process.component';
import { Bof1LogsheetComponent } from 'src/app/demo/components/logsheets/bof1-logsheet/bof1-logsheet.component';
import { Bof2ProcessComponent } from 'src/app/demo/components/bof2/bof2-process/bof2-process.component';
import { Bof2LogsheetComponent } from 'src/app/demo/components/logsheets/bof2-logsheet/bof2-logsheet.component';
import { PowerConsumptionComponent } from 'src/app/demo/components/power-consumption/power-consumption.component';
import { ProductionComponent } from 'src/app/demo/components/production/production.component';




@NgModule({
  declarations: [
    OverviewComponent,
    Bof1Component,
    RollingMillComponent,
    AnomalyComponent,
    Bof2Component,
    LadleFurnaceComponent,
    Bof1DetailsComponent,
    BlastFurnaceComponent,
    LfLogsheetComponent,
    BarPlanningComponent,
    LadleFurnaceProcessComponent,
    VdLogsheetComponent,
    VaccumDegassingComponent,
    Bof1ProcessComponent,
    Bof1LogsheetComponent,
    Bof2ProcessComponent,
    Bof2LogsheetComponent,
    PowerConsumptionComponent,
    ProductionComponent

  ],
  imports: [
    SharedModule,
    CommonModule,
    PrimeNgCommonModule,
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
    ProgressBarModule,
    HighchartsChartModule,
    CalendarModule
  ]
})
export class OverviewModule { }
