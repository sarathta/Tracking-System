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

    timelineData: any;
    statusColors = [{name:"Not reached",color :"#607D8B"},{name:"Under progress",color :"orange"},{name:"Completed",color :"#99e200"}]
  


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

        // this.getTimeLineData();
        
    }

    // getTimeLineData(){
    //     this.timelineData = [
    //         {
    //             title: "BOF",
    //             Date: "05/11/2024 08:18",
    //             color: "#607D8B",
    //             status: "Completed",
    //             desc : null
    //         },
    //         {
    //             title: "Ladle Furnace",
    //             Date: "05/11/2024 09:11",
    //             color: "#607D8B",
    //             status: "Completed",
    //             desc : null
    //         },
    //         {
    //             title: "Vaccum Degassing ",
    //             Date: "05/11/2024 09:50",
    //             color: "#607D8B",
    //             status: "Completed",
    //             desc : null
    //         },
    //         {
    //             title: "Continous Caster",
    //             Date: "05/11/2024 11:23",
    //             color: "#607D8B",
    //             status: "Completed",
    //             desc : null
    //         },
    //         {
    //             title: "Billet Yard",
    //             Date: "05/11/2024 12:50",
    //             color: "#607D8B",
    //             status: "Completed",
    //             desc : "no of billets: 27"
    //         },
    //         {
    //             title: "Reheating Furnace",
    //             Date: "05/11/2024 13:40",
    //             color: "#607D8B",
    //             status: "Completed",
    //             desc : null

    //         },
    //         {
    //             title: "Rolling Mill",
    //             Date: "",
    //             color: "#99e200",
    //             status: "Under Progress",
    //             desc : null
    //         },
    //         {
    //             title: "Cooling Bed",
    //             Date: "",
    //             color: "#99e200",
    //             status: "Under Progress",
    //             desc : null
    //         },
    //         {
    //             title: "Cold Shear",
    //             Date: "",
    //             color: "#607D8B",
    //             status: "Not Reached",
    //             desc : null
    //         },
    //         {
    //             title: "IL-1",
    //             Date: "",
    //             color: "#607D8B",
    //             status: "Not Reached",
    //             desc : null
    //         },
    //         {
    //             title: "Yard",
    //             Date: "",
    //             color: "#607D8B",
    //             status: "Not Reached",
    //             desc : null
    //         }
    //     ];
    // }

    ngOnDestroy() {
        clearInterval(this.timeInterval);
        clearInterval(this.statusInterval);
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
        // this.dialogbundles = false;
        // this.dialogRack = false;
        // this.dialogbars = false;
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
                console.log(this.timelineData);
                
            }));
        }, 2000);
      }
      


}
 