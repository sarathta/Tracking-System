import { TaskDetailsModule } from './task-details/task-details.module';
import { CheckboxModule } from 'primeng/checkbox';
import { MailErrorLogComponent } from './../../components/mail-error-log/mail-error-log.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { TaskComponent } from 'src/app/components/task/task.component';
import { TaskRoutingModule } from './task-routing.module';

@NgModule({
  declarations: [
    TaskComponent,
    MailErrorLogComponent
  ],
  imports: [
    SharedModule,
    CheckboxModule,
    TaskRoutingModule,
    TaskDetailsModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class TaskModule { }
