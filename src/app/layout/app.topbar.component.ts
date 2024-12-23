import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { NotificationService } from '../services/common/notification.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OverviewScreenService } from '../services/overviewScreen.service';

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
    statusInterval: any;
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
    customer:any;
    grade:any;
    estimateddate:any;
    ponumber:any;
    heatno:any;
    noofbillets:any;
    size:any;
    orderqtymt:any;
    isOverview: boolean = false;
    today: Date = new Date();
    timer: any;

    timelineData: any[]= [
        {
          title: "BOF",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Ladle Furnace",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Vaccum Degassing ",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Continous Caster",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Billet Yard",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Reheating Furnace",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Rolling Mill",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Cooling Bed",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Cold Shear",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Rack Area",
          Date: "",
          status: "",
          desc: null
        },
        {
          title: "Yard",
          Date: "",
          status: "",
          desc: null
        }
      ];
    statusColors = [{name:"Not reached",color :"#607D8B"},{name:"Under progress",color :"orange"},{name:"Completed",color :"#99e200"}]
  


    constructor(
        public layoutService: LayoutService,
        private notificationService: NotificationService,
        private http : HttpClient,
        public router: Router,
        private overviewScreenService: OverviewScreenService
      ) { }

    ngOnInit(): void {
      this.timer = setInterval(() => {
        this.today = new Date();
      }, 1000);
      this.overviewScreenService.overviewData.subscribe((data: any)=>{
        if(data==1){
          this.isOverview = true;
        }
        else{
          this.isOverview = false;
        }
      })
        
        this.notificationService.notificationCount.subscribe((data: any)=>{
            this.notificationCount = data;
        })
        if (this.timeInterval) {
            clearInterval(this.timeInterval);
          }
        this.timeInterval = setInterval(() => {
            this.getNotification();
          }, 1000);
        
    }

    ngOnDestroy() {
        clearInterval(this.timeInterval);
        clearInterval(this.statusInterval);
        if (this.timer) {
          clearInterval(this.timer); // Clean up timer
        }
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
        this.inputPo = null;
        this.dialogRF= false;
        clearInterval(this.statusInterval);
      }

      getStatusData(){
        this.statusInterval = setInterval(() => {
            this.http.get('http://127.0.0.1:8000/po_search?po='+ this.inputPo).subscribe((res=>{
                this.statusData= res;
    
                this.customer = this.statusData.Customer;
    
                this.grade = this.statusData.Grade;
    
                this.estimateddate = this.statusData.Estimated_Date;
    
                this.ponumber = this.statusData.PO_NUMBER;
    
                this.heatno = this.statusData.Heat_no;
    
                this.noofbillets = this.statusData.No_of_billets;
    
                this.size = this.statusData.Size_mm;
    
                this.orderqtymt = this.statusData.Order_Qty_MT;
    
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
                this.timelineData = this.statusData.timeline;
                this.timelineData.map((result: any)=>{
                    const statColor = this.statusColors.find(item=> item.name == result.status);
                    if(statColor){
                        result.color = statColor.color;
                    } 
                });                
            }));
        }, 8000);
      }
      


}
 