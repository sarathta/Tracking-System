import { TaskDetailsComponent } from './../../../components/task/task-details/task-details.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    TaskDetailsComponent
  ],
  imports: [
    SharedModule,
    CheckboxModule,
  ],
  exports: [
    TaskDetailsComponent
  ]
})
export class TaskDetailsModule { }
