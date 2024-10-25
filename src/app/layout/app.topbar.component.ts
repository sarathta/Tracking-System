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
    coolingbedstatus:any;
  


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
            this.rolls = this.statusData.rolling;

            this.coolingbed = this.statusData.cooling_bed;

            this.coolingbedstatus = this.statusData.cooling_bed_status;

            this.coldShear = this.statusData.cold_shear;

            this.rack = this.statusData.rack;

            this.straightener = this.statusData.str;

            this.udt = this.statusData.udt;

            this.bundle= this.statusData.bundle;

            this.goodbars =this.statusData.good_bars;
            
            this.trashbars =this.statusData.trash_bars;
                     
            this.correctedbars = this.statusData.corrected_bars;
        }));
      }


}
 