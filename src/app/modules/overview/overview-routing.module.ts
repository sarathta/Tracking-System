import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from 'src/app/demo/components/overview/overview.component';
import { Bof1Component } from 'src/app/demo/components/bof1/bof1.component';
import { AnomalyComponent } from 'src/app/demo/components/anomaly/anomaly.component';
import { Bof2Component } from 'src/app/demo/components/bof2/bof2.component';
import { LadleFurnaceComponent } from 'src/app/demo/components/ladle-furnace/ladle-furnace.component';
import { Bof1DetailsComponent } from 'src/app/demo/components/bof1/bof1-details/bof1-details.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'bof1', component: Bof1Component},
  { path: 'bof1details', component: Bof1DetailsComponent},
  { path: 'bof2', component: Bof2Component},
  { path: 'anomaly', component: AnomalyComponent},
  { path: 'ladle', component: LadleFurnaceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
