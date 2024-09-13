import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bof2-dialog',
  templateUrl: './bof2-dialog.component.html',
  styleUrls: ['./bof2-dialog.component.scss']
})
export class Bof2DialogComponent {
  @Input() set inpBof2Dialog(data: number) {
    if (data > 0) {
      this.showBof2();
    }
    else {
      this.hideDialog();
    }
  }

  dialogBof2: boolean= false;
  constructor(){}
  showBof2(){
    this.dialogBof2= true;
  } 

  hideDialog(){
    this.dialogBof2= false;
  }
}
