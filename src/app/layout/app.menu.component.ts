import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-qrcode', routerLink: ['/TrackingSystem/overview'] },
                    { label: 'Process',
                        icon: 'pi pi-fw pi-sliders-h',
                        items: [
                                            {
                                                label: 'Bof-1',
                                                // icon: 'pi pi-fw pi-sign-in',
                                                routerLink: ['/TrackingSystem/overview/bof1']
                                            },
                                            {
                                                label: 'Bof-2',
                                                // icon: 'pi pi-fw pi-times-circle',
                                                routerLink: ['/TrackingSystem/overview/bof2']
                                            },
                                            {
                                                label: 'Laddle Furnace',
                                                // icon: 'pi pi-fw pi-lock',
                                                routerLink: ['/TrackingSystem/overview/ladle']
                                            },
                                            {
                                                label: 'Vaccum Degassing',
                                                // icon: 'pi pi-fw pi-lock',
                                                routerLink: ['/TrackingSystem/overview/vd']
                                            },
                                            {
                                                label: 'Blast Furnace',
                                                // icon: 'pi pi-fw pi-lock',
                                                routerLink: ['/TrackingSystem/overview/blastfurnace']
                                            },
                                            {
                                                label: 'CCM',
                                                // icon: 'pi pi-fw pi-lock',
                                                routerLink: ['/TrackingSystem/overview/ccm']
                                            }
                                ] 
                    },
                    { label: 'Anomaly', icon: 'pi pi-ticket', routerLink: ['/TrackingSystem/overview/anomaly'] },
                    { label: 'Planning', icon: 'pi pi-fw pi-clone', routerLink: ['/TrackingSystem/overview/planning'] },
                    { label: 'Power Consumption', icon: 'pi pi-fw pi-bolt', routerLink: ['/TrackingSystem/overview/consumption'] },
                    { label: 'Production', icon: 'pi pi-fw pi-bookmark', routerLink: ['/TrackingSystem/overview/production'] },
                    { label: 'User', icon: 'pi pi-fw pi-users', routerLink: ['/TrackingSystem/'] },
                    { label: 'Master Data', icon: 'pi pi-fw pi-database', routerLink: ['/TrackingSystem/'] }
                ]
             },
        ];
    }
}
