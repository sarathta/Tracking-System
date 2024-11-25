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
  operatorLogs: any[]=[{data:"Carbon content in molten iron measured at 4.1%"}];
  assetborder: any;
  bof1Details: boolean =false;
  bof2Details: boolean =false;
  lfDetails: boolean =false;
  vdDetails: boolean =false;
  ccmDetails: boolean =false;
  standDetails: boolean =false;
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
      date: '06/05/24 19:05:46',
      type: 'Shrinkage',
      data: 'Shrinkage was observed in billet ID 167890 during casting in Ladle Refining Furnace (LRF), attributed to a lower-than-optimal pouring temperature of 1,480°C.'
    },
    {
      name: 'STAND2',
      date: '06/05/24 19:05:24',
      type: 'Cobble',
      data: 'Cobble occurred before Stand 6 for billet ID 155605 due to improper alignment, resulting in excessive tension during rolling.'
    },
    {
      name: 'STAND1',
      date: '06/05/24 19:05:12',
      type: 'Wavy edges',
      data: 'Wavy edges were noted in bar ID 234890 post Stand 5, due to uneven roll gap and temperature variations along the edges.'
    },
    {
      name: 'STAND6',
      date: '06/05/24 19:05:44',
      type: 'Cobble',
      data: 'Cobble occurred before Stand 6 for billet ID 155605 due to improper alignment, resulting in excessive tension during rolling.'
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
      name:'Day (INR)',
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
      name:'Month (INR)',
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
      name:'Defect Rate (%)',
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
              20,
              50,
              30,
              60
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
      name:'Yield-Rate (%)',
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

  inventoryChartData: any ={
    labels:  [
      "Iron Ore",
      "Coke",
      "Limestone",
      "Dolomite",
      "Scrap Steel"
    ],
    datasets: [
      {
        type: 'bar',
        label: 'Quantity of Raw Materials (t)',
        yAxisID: 'y',
        data:  [
          379.9267272949219,
          235.97850036621094,
          437.4613037109375,
          411.20208740234375,
          218.46881103515625
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      },
      {
        type: 'line',
        label: 'Days left',
        yAxisID: 'y1',
        data: [
          30,
          40,
          30,
          20,
          22
        ],
        backgroundColor: 'orange',
        borderColor: 'orange',
        borderWidth: 1
      }
    ]
  }

  inventoryOptions: any ={
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
            // stacked: true,
            position: 'left',
            ticks: {
                color: '#6c757d'
            },
            grid: {
                color: '#dee2e6',
                drawBorder: false
            }
        },
        y1: {
          // stacked: true,
          position: 'right',
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
  


  plantName: string = 'ABC'; // Example plant name
  currentDateTime: string = ''; // To hold current timestamp
  shiftOverview: string = ''; // Shift information
  private timer: any;
  selectedData: any;
  loading: boolean =false;
  tracking: any;
  bofClass: any;
  lfClass: any;
  vdClass: any;
  ccmClass: any;
  standClass: any;
 

  

  constructor(
    private layoutService: LayoutService,
    public router: Router,
    private overviewScreenService: OverviewScreenService
  ) { }

  
  ngOnInit(): void {
    this.overviewScreenService.sendData(1);
    this.layoutService.onMenuToggle();
    let i =0;
    this.tracking = setInterval(() => {
      if(i<=5){
        this.bofClass = 'empty';
        this.lfClass = 'cross';
        this.vdClass = 'yellow';
        this.ccmClass = 'green';
        this.standClass = 'empty';

      }
      else if(i>5 && i<=10){
        this.bofClass = 'yellow'
        this.lfClass = 'empty'
        this.vdClass = 'green'
        this.ccmClass = 'orange'
        this.standClass = 'empty';

      }
      else if(i>10 && i<=15){
        this.bofClass = 'green'
        this.lfClass = 'yellow'
        this.vdClass = 'orange'
        this.ccmClass = 'blue'
        this.standClass = 'green';

      }
      else if(i>15 && i<=20){
        this.bofClass = 'orange'
        this.lfClass = 'green'
        this.vdClass = 'blue'
        this.ccmClass = 'cross'
        this.standClass = 'green';

      }
      else if(i>20 && i<=25){
        this.bofClass = 'blue'
        this.lfClass = 'orange'
        this.vdClass = 'cross'
        this.ccmClass = 'empty'
        this.standClass = 'green';

      }
      else if(i>25 && i<=30){
        this.bofClass = 'cross'
        this.lfClass = 'blue'
        this.vdClass = 'empty'
        this.ccmClass = 'yellow'
        this.standClass = 'green';

      }
      else{
        this.bofClass = 'empty'
        this.lfClass = 'cross'
        this.vdClass = 'yellow'
        this.ccmClass = 'green'
        this.standClass = 'cross';

        i=0;
      }
      i++;
    }, 1000);
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

  dashboardScreen(){
    this.router.navigate(['/TrackingSystem/overview/dashboard']);
  }

  addLogItem(){
    if(this.logItem){
        this.operatorLogs.push({data: this.logItem});
        this.logItem= null;
    }
  }

  bof1DetailsShow(){
    this.bof1Details = !this.bof1Details ;
    this.bof2Details = false;
    this.lfDetails = false;
    this.vdDetails = false;
    this.ccmDetails = false;
    this.standDetails = false;
  }

  bof2DetailsShow(){
    this.bof2Details = !this.bof2Details ;
    this.bof1Details =false;
    this.lfDetails = false;
    this.vdDetails = false;
    this.ccmDetails = false;
    this.standDetails = false;
  }

  lfDetailsShow(){
    this.lfDetails = !this.lfDetails ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.vdDetails = false;
    this.ccmDetails = false;
    this.standDetails = false;
  }
  vdDetailsShow(){
    this.vdDetails = !this.vdDetails;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.ccmDetails = false;
    this.standDetails = false;
  }
  ccmDetailsShow(){
    this.ccmDetails = !this.ccmDetails;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.vdDetails = false;
    this.standDetails = false;
  }
  standDetailsShow(){
    this.standDetails = !this.standDetails;
    this.ccmDetails = false;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.vdDetails = false;
  }

  hideDialog(){
    this.bof1Details = false ;
    this.bof2Details = false;
    this.lfDetails = false;
    this.vdDetails = false;
    this.ccmDetails = false;
    this.standDetails = false;
  }

}
