import { Component, OnInit } from '@angular/core';
import { Bof1Service } from 'src/app/services/bof1.service';

@Component({
  selector: 'app-bof1-details',
  templateUrl: './bof1-details.component.html',
  styleUrls: ['./bof1-details.component.scss']
})
export class Bof1DetailsComponent implements OnInit {
  selectedData: any;
  selectedO2Data: any;
  selectedN2Data: any;
  selectedRawMaterialData: any;
  selectedFerroAlloysData: any;
  loading: boolean = false;
  editMode: boolean = false;
  bof1Data: any;
  o2ConsuptionData: any;
  n2ConsuptionData: any;
  rawMaterialConsuptionData: any;
  ferroAlloysConsuptionData: any;
  previousVal: number = 0;
  currentVal: number = 0;

  constructor(
    private bof1Service : Bof1Service
  ){}

  ngOnInit(): void {
    this.getBof1Data();
    this.getO2ConsumptionData();
    this.getN2ConsumptionData();
    this.getRawMaterialConsumptionData();
    this.getFerroAlloysConsumptionData();
  }

  onRowSelected(event: any) {
    this.previousVal = this.currentVal; //For getting previous selected row Id
    this.currentVal = event.index;
    //To edit current row //('btn_cs_i') button is for init edit row 
    let element: HTMLElement = document.getElementsByClassName('btn_bof_e' + this.currentVal)[0] as HTMLElement;
    element && element.click();
    if (this.previousVal >= 0 && (this.currentVal !== this.previousVal)) {
      //To Close previous opened row
      let prevelement: HTMLElement = document.getElementsByClassName('btn_bof_c' + this.previousVal)[0] as HTMLElement;
      prevelement && prevelement.click();
    }
  }

  getBof1Data(){
    this.bof1Service.getbof1().subscribe(res => {
      this.bof1Data = res;
    });
  }

  getO2ConsumptionData(){
    this.bof1Service.getO2Consumption().subscribe(res => {
      this.o2ConsuptionData = res;
    });
  }

  getN2ConsumptionData(){
    this.bof1Service.getN2Consumption().subscribe(res => {
      this.n2ConsuptionData = res;
    });
  }

  getRawMaterialConsumptionData(){
    this.bof1Service.getRawMaterialConsumption().subscribe(res => {
      this.rawMaterialConsuptionData = res;
    });
  }

  getFerroAlloysConsumptionData(){
    this.bof1Service.getFerroAlloysConsumption().subscribe(res => {
      this.ferroAlloysConsuptionData = res;
    });
  }

  ngModelChange(data : any){}

  saveSubmit(){}

  onKeydown(event: any, index: number) {  }

  enableEdit() {
    this.editMode = true;
    this.selectedData = null;
  }

}
