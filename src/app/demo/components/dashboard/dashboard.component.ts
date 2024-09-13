import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    dashboardData: any = {};

    recentTasksList: any = [];

    customerOverview: any = [];

    notifications: any = {};

    taskId: number = 0;
    viewDialog: boolean = false;
    colorList = ["orange", "cyan", "pink", "green", "purple", "teal"];

    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        private dashboardService: DashboardService,
        private router: Router,
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
        this.getCustomerOverViewData();
        this.getDashboardData();
        this.getRecentTasks();
        this.getNotifications();
        this.getChartData();

    }

    getDashboardData() {
        this.dashboardService.getDashboardData().subscribe((res) => {
            this.dashboardData = res;
        });
    }

    getRecentTasks() {
        this.dashboardService.getRecentTasks().subscribe((res) => {
            this.recentTasksList = res;
        });
    }

    getCustomerOverViewData() {
        this.dashboardService.getCustomerWiseOverview().subscribe((res: any) => {            
            res.map((item: any) => {
                const random = Math.floor(Math.random() * this.colorList.length);
                item.color = this.colorList[random];
            })
            this.customerOverview = res;
            console.log(this.customerOverview);

        });
    }

    getChartData() {
        this.dashboardService.getDashboardChartData().subscribe((res) => {
            this.chartData = res;
            console.log(this.chartData);
        });
    }

    getNotifications() {
        this.dashboardService.getDashboardNotifications().subscribe((res) => {
            this.notifications = res;
        });
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    viewTaskDetails(id: number) {
        this.taskId = id;
        this.viewDialog = true;
    }
}
