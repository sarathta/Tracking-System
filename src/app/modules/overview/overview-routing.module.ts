import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from 'src/app/demo/components/overview/overview.component';
import { Bof1Component } from 'src/app/demo/components/bof1/bof1.component';
import { AnomalyComponent } from 'src/app/demo/components/anomaly/anomaly.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'bof1', component: Bof1Component},
  { path: 'anomaly', component: AnomalyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
