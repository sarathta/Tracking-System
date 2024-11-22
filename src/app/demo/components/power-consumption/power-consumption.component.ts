import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
interface City {
    name: string;
    code: string;}
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
  
  energyLossData : any;
  energyLossOptions: any;
  energyLossValues: any;
  
  energyPerWeightData : any;
  energyPerWeightOptions: any;
  energyPerWeightValues: any;

  peakDemandData : any;
  peakDemandOptions: any;
  peakDemandValues: any;
  
  equipData1 : any;
  equipOptions1: any;

  equipData2 : any;
  equipOptions2: any;
  equipValues: any;
  Date:any;
  selectedate:any;
  Equipmentsdata:any;
  selectedData:any;
  loading:any;
  equipsValues:any[]=[];

//   pieDate1: any;
//   pieDate2: any;
//   pieLegends: any[]= [{name:'CCS1',color:'#BFC9CA'},{name:'CCS2',color:'#E1D03B'},{name:'CCS2',color:'#9BBB59'},{name:'CCS2',color:'#8064A2'},{name:'CCS2',color:'#00B0F0'},{name:'CCS2',color:'#FF8C00'},{name:'CCS2',color:'#40E0D0'},{name:'CCS2',color:'#FFC0CB'},{name:'CCS2',color:'#FFFACD'},{name:'CCS2',color:'#B0C4DE'}]
// //   backgroundColor:  ['#BFC9CA', '#E1D03B', '#9BBB59', '#8064A2', '#00B0F0', '#FF8C00','#40E0D0','#FFC0CB','#FFFACD','#B0C4DE'],


  plugin = [ChartDataLabels];

  constructor(
    private http : HttpClient,
    private layoutService: LayoutService,
  ){}

  ngOnInit(): void {
    this.layoutService.onMenuToggle();
    this.initShiftChart();
    this.initDayChart();
    this.initMonthChart();
    this.getshiftData();
    this.getDailyData();   
    this.getMonthlyData(); 
    this.getEnergyLossData(); 
    this.getEnergyPerWeightData();
    this.getPeakDemandData();
    this.getData()
    // this.getEquipmentData();
    this.Date = [
        {id:0, name: '11/03' },
        {id:1, name: '11/04' }
        
    ];
  }
  
  getData(){
    this.http.get('http://127.0.0.1:8000/con_eq').subscribe((res:any)=>{
        this.equipsValues= res;
      this.Equipmentsdata= this.equipsValues[0].consumption;
      this.selectedData = this.Equipmentsdata[0];
      this.loading = false;
      
    });
  }

  initShiftChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.shiftOptions = {
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
  }

  initDayChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.dayOptions = {
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

  initMonthChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.monthOptions = {
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

  getshiftData(){
    this.http.get('http://127.0.0.1:8000/shift_consumption').subscribe(res=>{
      this.shiftDatas = res;
      this.bindShiftData()
    });
  }

  getDailyData(){
    this.http.get('http://127.0.0.1:8000/daily_consumption').subscribe(res=>{
      this.dailyData = res;
      this.bindDailyData()
    });
  }

  getMonthlyData(){
    this.http.get('http://127.0.0.1:8000/monthly_consumption').subscribe(res=>{
      this.monthlyData = res;
      this.bindMonthlyData()
    });
  }

  getEnergyLossData(){
    this.http.get('http://127.0.0.1:8000/energy_loss').subscribe(res=>{
      this.energyLossValues = res;
      this.bindEnergyLossData()
    });
  }

  getEnergyPerWeightData(){
    this.http.get('http://127.0.0.1:8000/energy_per_weight').subscribe(res=>{
      this.energyPerWeightValues = res;
      this.bindEnergyPerWeightData()
    });
  }

//   getEquipmentData(){
//     this.http.get('http://127.0.0.1:8000/con_eq').subscribe(res=>{
//       this.equipValues = res;
//       this.bindEquipmentData()
//     });
//   }

  bindShiftData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let shiftData1: any[] = this.shiftDatas.shift2;
    let shiftData2: any[] = this.shiftDatas.shift3;
    let shiftLabels: any[] =  this.shiftDatas.time;

    this.shiftData = {
      labels: shiftLabels,
      datasets: [
          {
              type: 'bar',
              label: 'Day',
              data: shiftData1,
              backgroundColor: 'rgba(4, 151, 119, 0.2)',
              borderColor: 'rgb(4, 151, 119)',
              borderWidth: 1
          },
          {
            type: 'bar',
            label: 'Night',
            data: shiftData2,
            backgroundColor: 'rgba(8, 80, 64, 0.2)',
            borderColor: 'rgb(8, 80, 64)',
            borderWidth: 1
        }
      ]
    };

    this.shiftOptions = {
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

  bindDailyData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let dayData: any[] = this.dailyData.value;
    let dayLabels: any[] =  this.dailyData.time;

    this.dayData = {
      labels: dayLabels,
      datasets: [
          {
            //   label: 'kWh',
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
            datalabels:{
                formatter: (value : any) => {
                  return Math.trunc(value);
                },
                font: {
                  size: 10
                },
                // anchor: 'end',
                align: 'start',
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

  bindMonthlyData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let monthData: any[] = this.monthlyData.value;
    let monthLabels: any[] =  this.monthlyData.time;

    this.monthData = {
      labels: monthLabels,
      datasets: [
          {
            //   label: 'kWh',
              data: monthData,
              fill: false,
              backgroundColor: 'rgba(4, 151, 119, 0.2)',
              borderColor: 'rgb(4, 151, 119)' ,
              borderWidth: 1,
          }
      ]
    };

    this.monthOptions = {
        // indexAxis: 'y',
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

  bindEnergyLossData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let energyLossData1: any[] = this.energyLossValues.loss1;
    let energyLossData2: any[] = this.energyLossValues.loss2;
    let energyLossLabels: any[] =  this.energyLossValues.time;

    this.energyLossData = {
      labels: energyLossLabels,
      datasets: [
          {
              label:'Transformer 1',
              type: 'bar',
              data: energyLossData1,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
          },
          {
            label:'Transformer 2',
            type: 'bar',
            data: energyLossData2,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor : 'rgb(255, 159, 64)',
            borderWidth: 1
        }
      ]
    };

    this.energyLossOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            datalabels:{
                formatter: (value : any) => {
                  return value.toFixed(2);
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
  
  bindEnergyPerWeightData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let energyPerWeightData: any[] = this.energyPerWeightValues.value;
    let energyPerWeightLabels: any[] =  this.energyPerWeightValues.time;

    this.energyPerWeightData = {
      labels: energyPerWeightLabels,
      datasets: [
          {
              data: energyPerWeightData,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgb(153, 102, 255)',
              borderWidth: 1
          }
      ]
    };

    this.energyPerWeightOptions = {
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

  equipmentsTableDropDown(value: any){
    this.Equipmentsdata = [];
    if(value == '11/03'){
        this.Equipmentsdata= this.equipsValues[0].consumption;
    }
    else if(value == '11/04'){
        this.Equipmentsdata= this.equipsValues[1].consumption;
    }
    
  }
  
//   bindEquipmentData(){
//     const documentStyle = getComputedStyle(document.documentElement);
//     const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
//     const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
//     let equipData1: any[] = this.equipValues.date1;
//     let equipData2: any[] = this.equipValues.date2;
//     let equipLabels: any[] =  this.equipValues.description;
//     // this.pieDate1 = this.equipValues.dates[0];
//     // this.pieDate2 = this.equipValues.dates[1];

//     this.equipData1 = {
//       labels: equipLabels,
//       datasets: [
//           {
//               data: equipData1,
//               backgroundColor: ['#BFC9CA', '#E1D03B', '#9BBB59', '#8064A2', '#00B0F0', '#FF8C00','#40E0D0','#FFC0CB','#FFFACD','#B0C4DE'],
//               hoverBackgroundColor: ['#C2CBCB','#ECDB40','#A5C663','#9678B7','#18B8F2','#FFBE68','#7BF3E7','#FFD5DC','#FAF5C8','#BECDE2']
//           }
//       ]
//     };
//     this.equipData2 = {
//         labels: equipLabels,
//         datasets: [
//             {
//                 data: equipData2,
//                 backgroundColor:  ['#BFC9CA', '#E1D03B', '#9BBB59', '#8064A2', '#00B0F0', '#FF8C00','#40E0D0','#FFC0CB','#FFFACD','#B0C4DE'],
//                 hoverBackgroundColor: ['#C2CBCB','#ECDB40','#A5C663','#9678B7','#18B8F2','#FFBE68','#7BF3E7','#FFD5DC','#FAF5C8','#BECDE2']
//             }
//         ]
//       };

//     this.equipOptions1 = {
//         // maintainAspectRatio: false,
//         // aspectRatio: 0.8,
//         plugins: {
//             datalabels:{
//                 formatter: (value : any) => {
//                   return Math.trunc(value);
//                 },
//                 font: {
//                   size: 10
//                 },
//                 // anchor: 'end',
//                 align: 'center',
//                 color: 'black',
//               },
//             legend: {
//                 display: false,
//                 position: "bottom" ,
//                 labels: {
//                     usePointStyle: true,
//                     color: 'black'
//                 }
//             }
//         },
//         // scales: {
//         //     x: {
//         //         ticks: {
//         //             color: textColorSecondary
//         //         },
//         //         grid: {
//         //             color: surfaceBorder,
//         //             drawBorder: false
//         //         }
//         //     },
//         //     y: {
//         //         ticks: {
//         //             color: textColorSecondary
//         //         },
//         //         grid: {
//         //             color: surfaceBorder,
//         //             drawBorder: false
//         //         }
//         //     }
//         // }
//     };
//     this.equipOptions2 = {
//         // maintainAspectRatio: false,
//         // aspectRatio: 0.8,
//         plugins: {
//             datalabels:{
//                 formatter: (value : any) => {
//                   return Math.trunc(value);
//                 },
//                 font: {
//                   size: 9
//                 },
//                 // anchor: 'end',
//                 align: 'center',
//                 color: 'black',
//               },
//             legend: {
//                 display: true,
//                 position: "right" ,
//                 labels: {
//                     usePointStyle: true,
//                     color: 'black'
//                 }
//             }
//         },
//         // scales: {
//         //     x: {
//         //         ticks: {
//         //             color: textColorSecondary
//         //         },
//         //         grid: {
//         //             color: surfaceBorder,
//         //             drawBorder: false
//         //         }
//         //     },
//         //     y: {
//         //         ticks: {
//         //             color: textColorSecondary
//         //         },
//         //         grid: {
//         //             color: surfaceBorder,
//         //             drawBorder: false
//         //         }
//         //     }
//         // }
//     };
    
//   }

}