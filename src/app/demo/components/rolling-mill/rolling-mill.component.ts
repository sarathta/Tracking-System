import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-rolling-mill',
  templateUrl: './rolling-mill.component.html',
  styleUrls: ['./rolling-mill.component.scss']
})
export class RollingMillComponent implements OnInit,OnDestroy{
  standDialog: boolean = false;
  dialogData:any
  stands: any[]=[
    {
      id:1,
      name: "Stand1",
      description: "Level1 Interface",
      status: true,
      billetStatus: true,
      enabled: true,
      idle: false,
      rpm: 850,
      rFactor: 1.273,
      speed: 2.589,
      dia: 580
    },
    {
      id:2,
      name: "Stand2",
      description: "Level1 Interface",
      status: true,
      billetStatus: true,
      enabled: true,
      idle: false,
      rpm: 1100,
      rFactor: 1.236,
      speed: 2.589,
      dia: 570
    },
    {
      id:3,
      name: "Stand3",
      description: "Level1 Interface",
      status: false,
      billetStatus: true,
      enabled: false,
      idle: true,
      rpm: 850,
      rFactor: 1.294,
      speed: 2.589,
      dia: 565
    },
    {
      id:4,
      name: "Stand4",
      description: "Level1 Interface",
      status: true,
      billetStatus: true,
      enabled: true,
      idle: false,
      rpm: 850,
      rFactor: 1.307,
      speed: 2.589,
      dia: 540
    },
    {
      id:5,
      name: "Stand5",
      description: "Level1 Interface",
      status: true,
      billetStatus: true,
      enabled: true,
      idle: false,
      rpm: 850,
      rFactor: 0.568,
      speed: 2.589,
      dia: 515
    },
    {
      id:6,
      name: "Stand6",
      description: "Level1 Interface",
      status: true,
      billetStatus: true,
      enabled: true,
      idle: false,
      rpm: 850,
      rFactor: 1.345,
      speed: 2.589,
      dia: 495
    },
    {
      id:7,
      name: "Stand7",
      description: "Level1 Interface",
      status: true,
      billetStatus: true,
      enabled: true,
      idle: false,
      rpm: 850,
      rFactor: 1.212,
      speed: 2.589,
      dia: 480
    }
  ];
  timeInterval: any;


  ngOnInit(): void {
    //  this.startInterval();
  }

  // startInterval() {
  //   if (this.timeInterval) {
  //     clearInterval(this.timeInterval);
  //   }
  //   this.timeInterval = setInterval(() => {
  //     let i=0;
  //     if(i< this.stands.length){
  //       this.stands[i].billetStatus= true;
  //       this.stands[i-1].billetStatus = false;
  //       console.log( this.stands[i].billetStatus);
        
  //       i++;
  //       console.log(i);
        
  //     }
  //     else{
  //       i=0;
  //     }
  //   }, 2000);
  // }
 
  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }

  showStandData(data: any){
    this.dialogData = data;
    this.standDialog = true;
  }
  
  hideDialog() {
    this.standDialog = false;
  }

}
