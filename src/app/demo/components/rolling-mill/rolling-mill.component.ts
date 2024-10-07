import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/common/notification.service';

@Component({
  selector: 'app-rolling-mill',
  templateUrl: './rolling-mill.component.html',
  styleUrls: ['./rolling-mill.component.scss']
})
export class RollingMillComponent implements OnInit,OnDestroy{
  standDialog: boolean = false;
  dialogData:any
  standData: any;
  stands: any[]=[
    {
        billetId: null,
        status: true,
        billetStatus: false,
        current: null,
        tension: null,
        rfactor: null,
        speedmps: null,
        time: "",
        name: "STAND1"
    },
    {
        billetId: null,
        status: true,
        billetStatus: false,
        current: null,
        tension: null,
        rfactor: null,
        speedmps: null,
        time: "",
        name: "STAND2"
    },
    {
        billetId: null,
        status: true,
        billetStatus: false,
        current: null,
        tension: null,
        rfactor: null,
        speedmps: null,
        time: "",
        name: "STAND3"
    },
    {
        billetId: null,
        status: true,
        billetStatus: false,
        current: null,
        tension: null,
        rfactor: null,
        speedmps: null,
        time: "",
        name: "STAND4"
    },
    {
        billetId: null,
        status: true,
        billetStatus: false,
        current: null,
        tension: null,
        rfactor: null,
        speedmps: null,
        time: "",
        name: "STAND5"
    },
    {
        billetId: null,
        status: true,
        billetStatus: false,
        current: null,
        tension: null,
        rfactor: null,
        speedmps: null,
        time: "",
        name: "STAND6"
    },
    {
        billetId: null,
        status: true,
        billetStatus: false,
        current: null,
        tension: null,
        rfactor: null,
        speedmps: null,
        time: "",
        name: "STAND7"
    }
  ];
  timeInterval: any;
  notificationCount : number =0;

 constructor(
  private http : HttpClient,
  private notificationService : NotificationService
 ){}
  ngOnInit(): void {
    //  this.startInterval();
    this.standData = this.stands;
    this.getCurrent();
  }

  getCurrent(){
    this.timeInterval = setInterval(() => {
      this.http.get('http://127.0.0.1:8000/get-status').subscribe((res =>{
        this.standData= res;   
        this.standData.forEach((element: any) => {
          if(element.anomaly == true){
            this.notificationCount = this.notificationCount + 1;
            this.notificationService.sendData(this.notificationCount);         
          } 
        });     
      }));         
    }, 1000);
  }
 
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
