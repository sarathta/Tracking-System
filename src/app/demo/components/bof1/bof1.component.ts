import { Component, OnInit } from '@angular/core';
import { Bof1Service } from 'src/app/services/bof1.service';

@Component({
  selector: 'app-bof1',
  templateUrl: './bof1.component.html',
  styleUrls: ['./bof1.component.scss']
})
export class Bof1Component implements OnInit{
  selectedData: any;
  selectedO2Data: any;
  selectedN2Data: any;
  selectedRawMaterialData: any;
  selectedFerroAlloysData: any;
  loading: boolean = false;
  bof1Data: any;
  o2ConsuptionData: any;
  n2ConsuptionData: any;
  rawMaterialConsuptionData: any;
  ferroAlloysConsuptionData: any;

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

}
