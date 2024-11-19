import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss']
})
export class ProductionComponent implements OnInit{

  peakDemandData : any;
  peakDemandOptions: any;
  peakDemandValues: any;

  shiftProdData : any;
  shiftProdOptions: any;
  shiftProdValues: any;

  dayProdData : any;
  dayProdOptions: any;
  dayProdValues: any;

  monthProdData : any;
  monthProdOptions: any;
  monthProdValues: any;
  
  shiftCountData : any;
  shiftCountOptions: any;
  shiftCountValues: any;
  
  delayData : any;
  delayOptions: any;
  delayValues: any;
  
  yieldData : any;
  yieldOptions: any;
  yieldValues: any; 
  
  yieldLossData : any;
  yieldLossOptions: any;
  yieldLossValues: any; 
  
  hourlyProdData : any;
  hourlyProdOptions: any;
  hourlyProdValues: any;
  
  defectData : any;
  defectOptions: any;
  defectValues: any;
  
  actualPlannedData : any;
  actualPlannedOptions: any;
  actualPlannedValues: any;
  
  equipData : any;
  equipOptions: any;
  equipValues: any;

  cobbleTime: number = 0

  plugin = [ChartDataLabels];

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
    private http : HttpClient,
    private layoutService: LayoutService,
  ){}


  ngOnInit(): void {
    this.layoutService.onMenuToggle();
    this.initChart();
    this.getPeakDemandData();
    this.getShiftProdData();
    this.getDayProdData();
    this.getMonthProdData();
    this.getShiftCountData();
    this.getDelayData();
    this.getYieldData();
    this.getYieldLossData();
    this.getLastCobbleTimeData();
    this.getHourlyData();
    this.getDefectData();
    this.getActualPlannedData();
    this.getEquipData();
  }

  
  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.peakDemandOptions = {
        indexAxis: 'y',
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

    this.shiftProdOptions = {
      plugins: {
          legend: {
            display: false,
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

    this.dayProdOptions = {
      plugins: {
          legend: {
            display: false,
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

    this.monthProdOptions = {
      plugins: {
          legend: {
            display: false,
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
    this.http.get('http://127.0.0.1:8000/daily_peak_demand').subscribe(res=>{
      this.peakDemandValues = res;
      this.bindPeakDemandData()
    });
  }

  bindPeakDemandData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let peakDemandData: any[] = this.peakDemandValues.value;
    let peakDemandLabels: any[] =  this.peakDemandValues.time;
    console.log(peakDemandLabels);
    
    peakDemandLabels.forEach((item :any)=>{
      item = item.substring(0, 10);
      return item;      
    })
    console.log(peakDemandLabels);
    
    this.peakDemandData = {
      labels: peakDemandLabels,
      datasets: [
          {
              label: '',
              data: peakDemandData,
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)'],
              borderWidth: 1
          }
      ]
    };

    this.peakDemandOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
              display: false,
                labels: {
                    color: 'black'
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

  getShiftProdData(){
    this.http.get('http://127.0.0.1:8000/shift_prod').subscribe(res=>{
      this.shiftProdValues = res;
      this.bindShiftProdData()
    });
  }

  bindShiftProdData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let shiftData1: any[] = this.shiftProdValues.shift2;
    let shiftData2: any[] = this.shiftProdValues.shift3;
    let shiftLabels: any[] =  this.shiftProdValues.time;
    
    this.shiftProdData = {
      labels: shiftLabels,
      datasets: [
        {
          type: 'bar',
          label: 'Day',
          data: shiftData1,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        },
        {
          type: 'bar',
          label: 'Night',
          data: shiftData2,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }
      ]
    };

    this.shiftProdOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            // align: 'end',
            color: 'black',
          },
            legend: {
              // display: false,
                labels: {
                    color: 'black'
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                stacked: true,
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

  getDayProdData(){
    this.http.get('http://127.0.0.1:8000/daily_prod').subscribe(res=>{
      this.dayProdValues = res;
      this.bindDayProdData()
    });
  }

  bindDayProdData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let dayData: any[] = this.dayProdValues.value;
    let dayLabels: any[] =  this.dayProdValues.time;
    
    this.dayProdData = {
      labels: dayLabels,
      datasets: [
          {
              data: dayData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
          }
      ]
    };

    this.dayProdOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            // align: 'end',
            color: 'black',
          },
            legend: {
              display: false,

                
                labels: {
                    color: 'black'
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

  getMonthProdData(){
    this.http.get('http://127.0.0.1:8000/month_prod').subscribe(res=>{
      this.monthProdValues = res;
      this.bindMonthProdData()
    });
  }

  bindMonthProdData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let monthData: any[] = this.monthProdValues.value;
    let monthLabels: any[] = this.monthProdValues.time;

    this.monthProdData = {
      labels: monthLabels,
      datasets: [
        {
          label: '',
          data: monthData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1
        }
      ]
    };

    this.monthProdOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        datalabels:{
          formatter: (value : any) => {
            return Math.trunc(value);
          },
          font: {
            size: 10
          },
          // anchor: 'end',
          // align: 'end',
          color: 'black',
        },
        legend: {
          display: false,
          labels: {
            color: 'black'
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

  getShiftCountData(){
    this.http.get('http://127.0.0.1:8000/shift_count').subscribe(res=>{
      this.shiftCountValues = res;
      this.bindShiftCountData();
    });
  }

  bindShiftCountData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let shiftCountData: any[] = this.shiftCountValues.value;
    let shiftCountLabels: any[] =  this.shiftCountValues.time;
    
    this.shiftCountData = {
      labels: shiftCountLabels,
      datasets: [
          {
              label: '',
              data: shiftCountData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 1
          }
      ]
    };

    this.shiftCountOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            // align: 'end',
            color: 'black',
          },
            legend: {
                display: false,
                
                labels: {
                    color: 'black'
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

  getDelayData(){
    this.http.get('http://127.0.0.1:8000/daily_delay').subscribe(res=>{
      this.delayValues = res;
      this.bindDelayData();
    });
  }

  bindDelayData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let delayData: any[] = this.delayValues.value;
    let delayLabels: any[] =  this.delayValues.time;
    
    this.delayData = {
      labels: delayLabels,
      datasets: [
          {
              label: '',
              data: delayData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 1
          }
      ]
    };

    this.delayOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            align: 'end',
            color: 'black',
          },
            legend: {
                display: false,
                
                labels: {
                    color: 'black'
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

  getYieldData(){
    this.http.get('http://127.0.0.1:8000/daily_yield').subscribe(res=>{
      this.yieldValues = res;
      this.bindYieldData();
    });
  }

  bindYieldData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let yieldData: any[] = this.yieldValues.value;
    let yieldLabels: any[] =  this.yieldValues.time;
    
    this.yieldData = {
      labels: yieldLabels,
      datasets: [
          {
              label: '',
              data: yieldData,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgb(153, 102, 255)',
              borderWidth: 1
          }
      ]
    };

    this.yieldOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            align: 'end',
            color: 'black',
          },
            legend: {
                display: false,
                
                labels: {
                    color: 'black'
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
  
  getYieldLossData(){
    this.http.get('http://127.0.0.1:8000/daily_yield_loss').subscribe(res=>{
      this.yieldLossValues = res;
      this.bindYieldLossData();
    });
  }

  bindYieldLossData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let yieldLossData: any[] = this.yieldLossValues.value;
    let yieldLossLabels: any[] =  this.yieldLossValues.time;
    
    this.yieldLossData = {
      labels: yieldLossLabels,
      datasets: [
          {
              label: '',
              data: yieldLossData,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgb(153, 102, 255)',
              borderWidth: 1
          }
      ]
    };

    this.yieldLossOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            align: 'end',
            color: 'black',
          },
            legend: {
                display: false,
                
                labels: {
                    color: 'black'
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

  getLastCobbleTimeData(){
    this.http.get('http://127.0.0.1:8000/time_from_last_cobble').subscribe((res : any)=>{
      this.cobbleTime = res;
    });
  }
  
  getHourlyData(){
    this.http.get('http://127.0.0.1:8000/hourly_prod_rate').subscribe(res=>{
      this.hourlyProdValues = res;
      this.bindHourlyData();
    });
  }

  bindHourlyData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let hourlyProdData: any[] = this.hourlyProdValues.value;
    let hourlyProdLabels: any[] =  this.hourlyProdValues.time;
    
    this.hourlyProdData = {
      labels: hourlyProdLabels,
      datasets: [
          {
              label: '',
              data: hourlyProdData,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgb(54, 162, 235)',
              borderWidth: 1
          }
      ]
    };

    this.hourlyProdOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            align: 'end',
            color: 'black',
          },
            legend: {
                display: false,
                
                labels: {
                    color: 'black'
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
  
  getDefectData(){
    this.http.get('http://127.0.0.1:8000/defect_rate_mill').subscribe(res=>{
      this.defectValues = res;
      this.bindDefectData();
    });
  }

  bindDefectData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let defectData: any[] = this.defectValues.value;
    let defectLabels: any[] =  this.defectValues.time;
    
    this.defectData = {
      labels: defectLabels,
      datasets: [
        {
          label: '',
          data: defectData,
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgb(255, 159, 64)',
          borderWidth: 1
        }
      ]
    };

    this.defectOptions = {
        // indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            align: 'end',
            color: 'black',
          },
            legend: {
                display: false,
                
                labels: {
                    color: 'black'
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

  getActualPlannedData(){
    this.http.get('http://127.0.0.1:8000/planned_vs_actual').subscribe(res=>{
      this.actualPlannedValues = res;
      this.bindactualPlannedData();
    });
  }

  bindactualPlannedData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let plannedData: any[] = this.actualPlannedValues.planned;
    let actualData: any[] = this.actualPlannedValues.actual;
    let actualPlannedLabels: any[] =  this.actualPlannedValues.time;
    
    this.actualPlannedData = {
      labels: actualPlannedLabels,
      datasets: [
        {
          label: 'Planned',
          data: plannedData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235 )',
          borderWidth: 1
        },
        {
          label: 'Actual',
          data: actualData,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgb(153, 102, 255)',
          borderWidth: 1
        }
      ]
    };

    this.actualPlannedOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            align: 'end',
            color: 'black',
          },
            legend: {
                // display: false,
                
                labels: {
                    color: 'black'
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

  getEquipData(){
    this.http.get('http://127.0.0.1:8000/equip_eff').subscribe(res=>{
      this.equipValues = res;
      this.bindEquipData();
    });
  }

  bindEquipData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let equipData: any[] = this.equipValues.value;
    let equipLabels: any[] =  this.equipValues.time;
    
    this.equipData = {
      labels: equipLabels,
      datasets: [
          {
              label: '',
              data: equipData,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgb(153, 102, 255)',
              borderWidth: 1
          }
      ]
    };

    this.equipOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          datalabels:{
            formatter: (value : any) => {
              return Math.trunc(value);
            },
            font: {
              size: 10
            },
            // anchor: 'end',
            align: 'top',
            color: 'black',
          },
            legend: {
                display: false,
                
                labels: {
                    color: 'black'
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
  

}
