import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-laddle-furnace-dialog',
  templateUrl: './laddle-furnace-dialog.component.html',
  styleUrls: ['./laddle-furnace-dialog.component.scss']
})
export class LaddleFurnaceDialogComponent {
  @Input() set inpLFDialog(data: number) {
    if (data > 0) {
      this.showLF();
    }
    else {
      this.hideDialog();
    }
  }

  dialogLF: boolean= false;

  constructor(){}

  showLF(){
    this.dialogLF= true;
  } 

  hideDialog(){
    this.dialogLF= false;
  }
}
