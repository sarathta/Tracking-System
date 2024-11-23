import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import { OverviewScreenService } from 'src/app/services/overviewScreen.service';

@Component({
  selector: 'app-shift-overview',
  templateUrl: './shift-overview.component.html',
  styleUrls: ['./shift-overview.component.scss']
})
export class ShiftOverviewComponent implements OnInit,OnDestroy{
  @ViewChild("myCarousel") myCarousel: any;
  today: Date = new Date();
  plugin = [ChartDataLabels];
  operatorLogs: any[]=[{data:"ahsahf"}];
  assetborder: any;
  productionPlanData: any[]=[
    {id:1,date:"30/10/2024",so:"123188",lineItem:20,product:"BAR",customer:"ABCD",po:"193054",heatNo:92339,noOfBillets:9,
      grade: "SAE1018",classification:"VD",size: 38,orderQty:15,tas:"3759",rev:0,length:6000,inspected:"MANUAL",status:'50%',color:'#90fc90'
    },
    {id:2,date:"30/10/2024",so:"123189",lineItem:20,product:"BAR",customer:"ABCD",po:"193054",heatNo:92339,noOfBillets:9,
      grade: "SAE1018",classification:"VD",size: 38,orderQty:15,tas:"3759",rev:0,length:6000,inspected:"IL-2",status:'0%',color:'#ffffb7'
    },
    {id:3,date:"30/10/2024",so:"123189",lineItem:20,product:"BAR",customer:"ABCD",po:"193054",heatNo:92339,noOfBillets:9,
      grade: "SAE1018",classification:"VD",size: 38,orderQty:15,tas:"3759",rev:0,length:6000,inspected:"IL-2",status:'0%',color:'#ffffb7'
    }
  ]; 
  logItem: any;
  AssetsData: any[]=[
    {
      name: 'Blast Furnace',
      circleColor:'#02c602',
      status: 'Healthy',
      data: 'Healthy (Temperature: 1500°C | Pressure: 5.2 Bar)',
      borderclass:'greenBorderBlink'
    },
    {
      name: 'Rolling Mill',
      circleColor:'orange',
      status: 'Warning',
      data: 'Vibration: 3.5 m/s²',
      borderclass:'orangeBorderBlink'
    },
    {
      name: 'Crane',
      circleColor:'red',
      status: 'Critical',
      data: 'Motor Temp: 90°C, Overload Detected',
      borderclass:'redBorderBlink'
    }
  ]
  
  anomalyData: any[]=[
    {
      name: 'STAND1',
      date: '06/05/24 19:05:44',
      type: 'Internal cracks',
      data: 'Internal cracks are defects that form within the billet during rolling due to improper stress distribution or material deformation. These cracks may not be visible from the outside but can significantly weaken the final product, leading to reduced mechanical properties.'
    },
    {
      name: 'STAND1',
      date: '06/05/24 19:05:46',
      type: 'Shrinkage',
      data: 'Shrinkage defects are caused by the improper cooling of steel billets, leading to contraction and voids within the billet. These defects can compromise the integrity and structure of the steel, making it unsuitable for certain applications requiring high strength.'
    },
    {
      name: 'STAND1',
      date: '06/05/24 19:05:24',
      type: 'Cobble',
      data: 'A cobble occurs when the billet leaves the rolling path or gets tangled in the rollers, causing a physical jam in the rolling mill. It can result in a significant loss of material and requires immediate action to clear the machinery and restart the process.'
    },
    {
      name: 'STAND1',
      date: '06/05/24 19:05:12',
      type: 'Wavy edges',
      data: 'Wavy edges occur when the edges of the billet or rolled product exhibit a wave-like pattern due to uneven material flow or non-uniform rolling forces. This defect can affect the dimensional accuracy and appearance of the final product, requiring rework or trimming'
    }
  ]

  inventoryData: any[]=[
    {
      name: 'Stock',
      data: '10,000 tons of iron ore, 5,000 tons of coal'
    },
    {
      name: 'Finished Goods',
      data: '1,000 tons of steel coils.'
    },
    {
      name: 'Turnover Ratio',
      data: '6 times per year'
    }
  ]
  productionGraphs: any[]=[
    {
      name:'Shift (t)',
      data:{
        labels:  [
          "10-31",
          "11-01",
          "11-02",
          "11-03",
          "11-04"
        ],
        datasets: [
          {
            type: 'bar',
            label: 'Day',
            data:  [
              379.9267272949219,
              235.97850036621094,
              437.4613037109375,
              411.20208740234375,
              218.46881103515625
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          },
          {
            type: 'bar',
            label: 'Night',
            data: [
              482.6735534667969,
              534.0357666015625,
              507.3982849121094,
              493.1502990722656,
              0
            ],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1
          }
        ]
      },
      options:{
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
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            }
        }
      }
    },
    {
      name:'Day (t)',
      data:{
        labels: [
          "10-31",
          "11-01",
          "11-02",
          "11-03",
          "11-04"
        ],
        datasets: [
          {
            type: 'bar',
            data: [
              862.6002807617188,
              770.0142211914062,
              944.8595581054688,
              904.3523559570312,
              218.46881103515625
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      },
      options:{
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
                stacked: true,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            }
        }
      }
    },
    {
      name:'Month (t)',
      data:{
        labels: [
          "09-01",
          "10-01",
          "11-01"
        ],
        datasets: [
          {
            type: 'bar',
            data: [
              10562.2451171875,
              21227.66796875,
              2568.842041015625
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      },
      options:{
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
                stacked: true,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            }
        }
      }
    }
  ];
  
  costGraphs: any[]=[
    {
      name:'Day',
      data:{
        labels: [
          "08-01",
          "09-01",
          "10-01",
          "11-01"
        ],
        datasets: [
          {
            type: 'bar',
            data: [
              1200,
              1250,
              1230,
              1220
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      },
      options:{
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
                stacked: false,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            },
            y: {
                stacked: false,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            }
        }
      }
    },
    {
      name:'Month',
      data:{
        labels: [
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov"
        ],
        datasets: [
          {
            type: 'bar',
            data: [
              35000,
              35200,
              35300,
              35100,
              34800
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      },
      options:{
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
                stacked: false,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            },
            y: {
                stacked: false,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            }
        }
      }
    }    
  ];
  
  performanceGraphs: any[]=[
    {
      name:'Defect Rate',
      data:{
        labels: [
          "08-01",
          "09-01",
          "10-01",
          "11-01"
        ],
        datasets: [
          {
            data: [
              1200,
              1250,
              1230,
              1220
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      },
      options:{
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
                stacked: false,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            },
            y: {
                stacked: false,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            }
        }
      }
    },
    {
      name:'Yield-Rate',
      data:{
        labels: [
          "07-01",
          "08-01",
          "09-01",
          "10-01",
          "11-01"
        ],
        datasets: [
          {
            data: [
              60,
              70,
              50,
              80,
              65
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      },
      options:{
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
                stacked: false,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            },
            y: {
                stacked: false,
                ticks: {
                    color: '#6c757d'
                },
                grid: {
                    color: '#dee2e6',
                    drawBorder: false
                }
            }
        }
      }
    }    
  ];
  


  plantName: string = 'ABC'; // Example plant name
  currentDateTime: string = ''; // To hold current timestamp
  shiftOverview: string = ''; // Shift information
  private timer: any;
  selectedData: any;
  loading: boolean =false;
 

  

  constructor(
    private layoutService: LayoutService,
    public router: Router,
    private overviewScreenService: OverviewScreenService
  ) { }

  
  ngOnInit(): void {
    this.overviewScreenService.sendData(1);
    this.layoutService.onMenuToggle();
    this.timer = setInterval(() => {
      this.today = new Date();
    }, 1000);
  }
   
  ngOnDestroy(): void {
    this.overviewScreenService.sendData(0);
    if (this.timer) {
      clearInterval(this.timer); // Clean up timer
    }
  }

  productionScreen(){
    this.router.navigate(['/TrackingSystem/overview/production']);
  }  
  
  anomalyScreen(){
    this.router.navigate(['/TrackingSystem/overview/anomaly']);
  }

  addLogItem(){
    if(this.logItem){
        this.operatorLogs.push({data: this.logItem});
        this.logItem= null;
    }
  }

}
