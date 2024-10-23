import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { NotificationService } from '../services/common/notification.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit,OnDestroy {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    notificationCount: any;
    showNotifications: boolean = false;
    timeInterval: any;
    notificationData: any;
    inputPo: any;
    dialogRF: boolean=false;
    statusData: any;
    datas = [{id:0 ,name:'Not Reached'},{id:1 ,name:'Reached'},{id:2 ,name:'Completed'}];
    rolls:any;
    coolingbed:any;
    coldShear:any;
    rack:any;
    straightener:any;
    udt:any;
    bundle:any;
    goodbars:any;
    trashbars:any;
    correctedbars:any;


    constructor(
        public layoutService: LayoutService,
        private notificationService: NotificationService,
        private http : HttpClient,
        public router: Router
    ) { }

    ngOnInit(): void {
        // this.notificationService.notificationCount.subscribe((data: any)=>{
        //     this.notificationCount = data;
        // })
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
          }
        this.timeInterval = setInterval(() => {
            this.getNotification();
          }, 1000);
        
    }

    ngOnDestroy() {
        clearInterval(this.timeInterval);
    }

    getNotification(){
        this.http.get('http://127.0.0.1:8000/notif').subscribe((res=>{
            this.notificationData= res;
            this.notificationCount = this.notificationData.length;
        }));
    }

    showNotification(){
        this.showNotifications = !this.showNotifications;
    }

    closeNotification(){
        this.showNotifications = false;
    }

    showrfDialog(){
        this.getStatusData();
        this.dialogRF = true;
      }
      hideDialog(){
        // this.dialogbundles = false;
        // this.dialogRack = false;
        // this.dialogbars = false;
      }

      getStatusData(){
        this.http.get('http://127.0.0.1:8000/po_search?po='+ this.inputPo).subscribe((res=>{
            this.statusData= res;
            const item1 = this.datas.find(res => res.id == this.statusData.rolls);
            const item2 = this.datas.find(res => res.id == this.statusData.cooling_bed);
            const item3 = this.datas.find(res => res.id == this.statusData.cold_shear);    
            const item4 = this.datas.find(res => res.id == this.statusData.rack);  
            const item5 = this.datas.find(res => res.id == this.statusData.str);    
            const item6 = this.datas.find(res => res.id == this.statusData.udt);    
            const item7 = this.datas.find(res => res.id == this.statusData.bundle);
 
            if(item1){
                this.rolls = item1.name;
            }   
            if(item2){
                this.coolingbed = item2.name;
            } 
            if(item3){
                this.coldShear = item3.name;
            } 
            if(item4){
                this.rack = item4.name;
            } 
            if(item5){
                this.straightener= item5.name;
            } 
            if(item6){
                this.udt = item6.name;
            } 
            if(item7){
                this.bundle = item7.name;
                     
            } 
            
                this.goodbars = this.statusData.good_bars;
                    
                this.trashbars =this.statusData.trash_bars;
                     
                this.correctedbars = this.statusData.corrected_bars;
                     
           
        }));
      }


}
