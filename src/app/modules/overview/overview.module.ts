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
import { OverviewComponent } from 'src/app/demo/components/overview/overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewdialogModule } from '../overviewdialog/overviewdialog.module';
import { RollingMillComponent } from 'src/app/demo/components/rolling-mill/rolling-mill.component';
import { ApplicationPipesModule } from '../shared/application-pipes.module';



@NgModule({
  declarations: [
    OverviewComponent,
    RollingMillComponent
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
    ApplicationPipesModule
  ]
})
export class OverviewModule { }
