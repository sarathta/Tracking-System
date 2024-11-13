import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit{

  peakDemandData : any;
  peakDemandOptions: any;
  peakDemandValues: any;

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

  constructor(
    private http : HttpClient
  ){}


  ngOnInit(): void {
    this.initPeakDemandChart();
    this.getPeakDemandData();
  }

  
  initPeakDemandChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.peakDemandOptions = {
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

  getPeakDemandData(){
    this.http.get('http://127.0.0.1:8000/day_consumption').subscribe(res=>{
      this.peakDemandData = res;
      this.bindPeakDemandData()
    });
  }

  bindPeakDemandData(){

  }

}
