import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { ApplicationPipesModule } from '../shared/application-pipes.module';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    PaginatorModule,
    ConfirmDialogModule,
    CardModule,
    InputNumberModule,
    TooltipModule,
    ApplicationPipesModule
    ]
})
export class PrimeNgCommonModule { }
