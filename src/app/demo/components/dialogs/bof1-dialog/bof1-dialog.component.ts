import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bof1-dialog',
  templateUrl: './bof1-dialog.component.html',
  styleUrls: ['./bof1-dialog.component.scss']
})
export class Bof1DialogComponent {
  
  @Input() set inpBof1Dialog(data: number) {
    if (data > 0) {
      this.showBof1();
    }
    else {
      this.hideDialog();
    }
  }

  dialogBof1: boolean= false;
  constructor(){}
  showBof1(){
    this.dialogBof1= true;
  } 

  hideDialog(){
    this.dialogBof1= false;
  }
}
