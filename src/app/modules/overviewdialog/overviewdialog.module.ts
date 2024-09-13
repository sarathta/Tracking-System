import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'; 
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { Bof1DialogComponent } from 'src/app/demo/components/dialogs/bof1-dialog/bof1-dialog.component';
import { Bof2DialogComponent } from 'src/app/demo/components/dialogs/bof2-dialog/bof2-dialog.component';
import { LaddleFurnaceDialogComponent } from 'src/app/demo/components/dialogs/laddle-furnace-dialog/laddle-furnace-dialog.component';
import { VaccumDegassingDialogComponent } from 'src/app/demo/components/dialogs/vaccum-degassing-dialog/vaccum-degassing-dialog.component';
import { ContinousCasterDialogComponent } from 'src/app/demo/components/dialogs/continous-caster-dialog/continous-caster-dialog.component';


@NgModule({
  declarations: [
    Bof1DialogComponent,
    Bof2DialogComponent,
    LaddleFurnaceDialogComponent,
    VaccumDegassingDialogComponent,
    ContinousCasterDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TableModule,
    ButtonModule,
    StyleClassModule
  ],
  exports: [
    Bof1DialogComponent,
    Bof2DialogComponent,
    LaddleFurnaceDialogComponent,
    VaccumDegassingDialogComponent,
    ContinousCasterDialogComponent
  ]
})
export class OverviewdialogModule { }
