import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vaccum-degassing-dialog',
  templateUrl: './vaccum-degassing-dialog.component.html',
  styleUrls: ['./vaccum-degassing-dialog.component.scss']
})
export class VaccumDegassingDialogComponent {
  @Input() set inpVDDialog(data: number) {
    if (data > 0) {
      this.showVD();
    }
    else {
      this.hideDialog();
    }
  }

  dialogVD: boolean= false;

  constructor(){}

  showVD(){
    this.dialogVD= true;
  } 

  hideDialog(){
    this.dialogVD= false;
  }
}
