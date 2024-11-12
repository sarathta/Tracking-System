import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-power-consumption',
  templateUrl: './power-consumption.component.html',
  styleUrls: ['./power-consumption.component.scss']
})
export class PowerConsumptionComponent implements OnInit{
  dayData : any;
  dayOptions: any;
  dailyData: any;
  monthData : any;
  monthOptions: any;
  monthlyData: any;
  shiftData : any;
  shiftOptions: any;
  shiftDatas: any;

  constructor(
    private http : HttpClient
  ){}

  ngOnInit(): void {
    this.getshiftData();
    this.getDailyData();   
    this.getMonthlyData(); 
  }

  getshiftData(){
    this.http.get('http://127.0.0.1:8000/shift_consumption').subscribe(res=>{
      this.shiftDatas = res;
      this.bindShiftData()
    });
  }

  getDailyData(){
    this.http.get('http://127.0.0.1:8000/day_consumption').subscribe(res=>{
      this.dailyData = res;
      this.bindDailyData()
    });
  }

  getMonthlyData(){
    this.http.get('http://127.0.0.1:8000/month_consumption').subscribe(res=>{
      this.monthlyData = res;
      this.bindMonthlyData()
    });
  }

  bindShiftData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let shiftData: any[] = this.shiftDatas.consumption_data;
    let shiftLabels: any[] =  this.shiftDatas.shift_data;

    this.shiftData = {
      labels: shiftLabels,
      datasets: [
          {
              label: 'kWh',
              data: shiftData,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)'],
              borderWidth: 1
          }
      ]
    };

    this.shiftOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: 'black'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black'
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

  bindDailyData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let dayData: any[] = this.dailyData.totalConsumption;
    let dayLabels: any[] =  this.dailyData.date;

    this.dayData = {
      labels: dayLabels,
      datasets: [
          {
              label: 'kWh',
              data: dayData,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--green-300'),
              tension: 0.4
          }
      ]
    };

    this.dayOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: 'black'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black'
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

  bindMonthlyData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let monthData: any[] = this.monthlyData.totalConsumption;
    let monthLabels: any[] =  this.monthlyData.date;

    this.monthData = {
      labels: monthLabels,
      datasets: [
          {
              label: 'kWh',
              data: monthData,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--orange-300'),
              tension: 0.4
          }
      ]
    };

    this.monthOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: 'black'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'black'
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

}