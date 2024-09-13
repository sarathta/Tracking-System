import { TaskDetailsComponent } from './../../components/task/task-details/task-details.component';
import { MailErrorLogComponent } from './../../components/mail-error-log/mail-error-log.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TaskComponent } from 'src/app/components/task/task.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TaskComponent },
        { path: 'Details/:taskId', component: TaskDetailsComponent },
        { path: 'MailErrorLog', component: MailErrorLogComponent },

    ])],
    exports: [RouterModule]
})
export class TaskRoutingModule { }