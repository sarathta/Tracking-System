import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from 'src/app/demo/components/overview/overview.component';
import { Bof1Component } from 'src/app/demo/components/bof1/bof1.component';

const routes: Routes = [
  { path: '', component: OverviewComponent },
  { path: 'bof1', component: Bof1Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
