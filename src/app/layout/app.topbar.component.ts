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
        this.http.get('http://127.0.0.1:8000/anomaly').subscribe((res=>{
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


}
