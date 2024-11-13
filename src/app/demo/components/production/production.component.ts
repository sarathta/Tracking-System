import { Component } from '@angular/core';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent {
  items!: any[];

  products!: any[];

  chartData: any;

  chartOptions: any;


  dashboardData: any = {};

  recentTasksList: any = [];

  customerOverview: any = [];

  notifications: any = {};

  taskId: number = 0;
  viewDialog: boolean = false;
  colorList = ["orange", "cyan", "pink", "green", "purple", "teal"];

}
