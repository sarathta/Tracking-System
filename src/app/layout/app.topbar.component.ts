import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { NotificationService } from '../services/common/notification.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    notificationCount: any;

    constructor(
        public layoutService: LayoutService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.notificationService.notificationCount.subscribe((data: any)=>{
            this.notificationCount = data;
        })
    }


}
