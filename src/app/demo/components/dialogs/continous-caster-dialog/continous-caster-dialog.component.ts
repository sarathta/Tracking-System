import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-continous-caster-dialog',
  templateUrl: './continous-caster-dialog.component.html',
  styleUrls: ['./continous-caster-dialog.component.scss']
})
export class ContinousCasterDialogComponent {
  @Input() set inpCCDialog(data: number) {
    if (data > 0) {
      this.showCC();
    }
    else {
      this.hideDialog();
    }
  }
  loading:any;

  @Input() set inpCCMData(data: number) {
    if (data) {
     this.ccmData = data;
    }
  }

  ccmData: any;
  dialogCC: boolean= false;

  constructor(){}

  showCC(){
    this.dialogCC= true;
  } 

  hideDialog(){
    this.dialogCC= false;
  }
}
