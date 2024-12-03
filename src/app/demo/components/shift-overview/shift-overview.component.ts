import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import  ChartDataLabels  from 'chartjs-plugin-datalabels';
import { OverviewScreenService } from 'src/app/services/overviewScreen.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shift-overview',
  templateUrl: './shift-overview.component.html',
  styleUrls: ['./shift-overview.component.scss']
})
export class ShiftOverviewComponent implements OnInit,OnDestroy{
  @ViewChild("anomalyCarousel") anomalyCarousel: any;
  @ViewChild('videoPlayer')set mainVideoEl(el: any) {
    this.videoPlayer = el.nativeElement;
    this.videoPlayer.muted = true;  
  };
  today: Date = new Date();
  plugin = [ChartDataLabels];
  operatorLogs: any[]=[{data:"Carbon content in molten iron measured at 4.1%"}];
  assetborder: any;
  videoPlayer: any;
  bof1Details: boolean =false;
  bof2Details: boolean =false;
  lfDetails: boolean =false;
  vdDetails: boolean =false;
  ccmDetails: boolean =false;
  rhfDetails: boolean =false;
  standDetails: boolean =false;
  il1Details: boolean =false;
  il2Details: boolean =false;
  bannerDialog: boolean =false;
  anomalyHeading: any ;
  assetPageData: any ;
  timeInterval: any;
  statusInterval: any;
  notificationData: any;
  inputPo: any;
  dialogRF: boolean=false;
  statusData: any;
  rolls:any;
  coolingbed:any;
  coldShear:any;
  rack:any;
  straightener:any;
  udt:any;
  bundle:any;
  goodbars:any;
  trashbars:any;
  correctedbars:any;
  coolingbedstatus:any;
  customer:any;
  grade:any;
  estimateddate:any;
  ponumber:any;
  heatno:any;
  noofbillets:any;
  size:any;
  orderqtymt:any;
  isOverview: boolean = false;
  timelineData: any[]= [
    {
      title: "BOF",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Ladle Furnace",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Vaccum Degassing ",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Continous Caster",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Billet Yard",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Reheating Furnace",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Rolling Mill",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Cooling Bed",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Cold Shear",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Rack Area",
      Date: "",
      status: "",
      desc: null
    },
    {
      title: "Yard",
      Date: "",
      status: "",
      desc: null
    }
  ];
  statusColors = [{name:"Not reached",color :"#607D8B"},{name:"Under progress",color :"orange"},{name:"Completed",color :"#99e200"}]

  performanceTableData: any = [{
    stand :1,
    rolldia : 450,
    lastchange: '28/10/2024	',
    tonsRolled : 6850,
    nextchange: '06/11/2024',
    color: 'red'
  },
  {
    stand :4,
    rolldia : 380,
    lastchange: '28/10/2024	',
    tonsRolled : 6850,
    nextchange: '06/11/2024',
    color: 'red'
  },
  {
    stand :7,
    rolldia : 452,
    lastchange: '28/10/2024	',
    tonsRolled : 6850,
    nextchange: '11/11/2024',
    color: '#ee9500'
  },
  {
    stand :10,
    rolldia : 377,
    lastchange: '28/10/2024	',
    tonsRolled : 6850,
    nextchange: '15/11/2024',
    color: '#ee9500'
  },
  {
    stand :2,
    rolldia : 387,
    lastchange: '28/10/2024	',
    tonsRolled : 4523,
    nextchange: '19/11/2024',
    color: '#ee9500'
  },
  {
    stand :5,
    rolldia : 385,
    lastchange: '29/10/2024	',
    tonsRolled : 4523,
    nextchange: '19/11/2024',
    color: 'green'
  },
  {
    stand :6,
    rolldia : 384,
    lastchange: '29/10/2024	',
    tonsRolled : 	4523,
    nextchange: '21/11/2024',
    color: 'green'
  },
  {
    stand :3,
    rolldia : 380,
    lastchange: '29/10/2024',
    tonsRolled : 3987,
    nextchange: '24/11/2024',
    color: 'green'
  },
  {
    stand :9,
    rolldia : 378,
    lastchange: '29/10/2024',
    tonsRolled : 3967,
    nextchange: '28/11/2024',
    color: 'green'
  },
  {
    stand :8,
    rolldia : 370,
    lastchange: '29/10/2024',
    tonsRolled : 3890,
    nextchange: '30/11/2024',
    color: 'green'
  }
]
  banner: any[] = [{data: ' Batch #202411: 2 bars rejected due to surface cracks. Length deviation: +2.5 mm above tolerance. '},{data: 'asfafsagdsg '}]
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
      name: 'Roll Set Availability',
      circleColor:'orange',
      status: 'Warning',
      data: 'Roll Set 2A in Rolling Mill nearing critical wear levels. Current wear at 85%. Replacement scheduled in the next maintenance window.',
      borderclass:'orangeBorderBlink'
    },
    {
      name: 'Roll Set Availability',
      circleColor:'red',
      status: 'Alert',
      data: 'Emergency shutdown initiated for Roll Set 6B in Tandem Mill due to overheating (120°C). Possible lubrication failure detected',
      borderclass:'redBorderBlink'
    },
    {
      name: 'Continuos Casting',
      circleColor:'green',
      status: 'Info',
      data: 'Mold level sensors recalibrated for improved accuracy. Target liquid steel level: 250 mm. No deviations observed in current readings.',
      borderclass:'greenBorderBlink'
    },
    {
      name: 'Continuos Casting',
      circleColor:'orange',
      status: 'Warning',
      data: 'Casting speed for Strand 4 reduced to 0.8 m/min due to detected nozzle blockage. Scheduled nozzle cleaning in the next maintenance cycle.',
      borderclass:'orangeBorderBlink'
    },
    {
      name: 'Continuos Casting',
      circleColor:'red',
      status: 'Alert',
      data: 'Emergency stop triggered due to detected slag carryover from Ladle No. 8. Cleaning operation scheduled. Production delayed by 30 minutes.',
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
          // "08-01",
          "09-01",
          "10-01",
          "11-01"
        ],
        datasets: [
          {
            type: 'bar',
            data: [
              // 1200,
              1250,
              1230,
              1220
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
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
          // "Jul",
          // "Aug",
          "Sep",
          "Oct",
          "Nov"
        ],
        datasets: [
          {
            type: 'bar',
            data: [
              // 35000,
              // 35200,
              35300,
              35100,
              34800
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
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
      name:'',
      data:{
        labels:  [
          "Billet Conversion(%)",
          "Yield(%)",
          "Missroll(%)",
          "Random(%)",
          "End Cut Loss(%)",
          "Scale Loss(%)",
          "Process Rejection(%)",
          "Consumption(KWH)",
          "Mill Utilization(%)"
        ],
        datasets: [
          {
            type: 'bar',
            label: 'Target',
            data:  [
              30,
              40,
              60,
              48,
              65,
              38,
              44,
              58,
              63
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgb(153, 102, 255)',
            borderWidth: 1
          }]
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
              size: 9
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
    } 
  ];

  inventoryChartData: any ={
    labels:  [
      "30 days",
      "25 days",
      "20 days"
      // "Dolomite (20 days)",
      // "Scrap Steel (22 days)"
    ],
    datasets: [
      {
        type: 'bar',
        // label: ['Alloys','Finished Goods','Flux'],
        // yAxisID: 'y',
        data:  [
          379,235,437
        ],
        backgroundColor: ['rgba(153, 102, 255, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgb(153, 102, 255)','rgb(54, 162, 235)','rgb(255, 159, 64)'],
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
          display: false,
            labels: {
                color: 'black'
            }
        }
    },
    scales: {
        x: {
            // stacked: true,
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
        }
    }
  }
  
  kpiData: any={
    labels:  [
      "Billet Conversion",
      "Yield",
      "Missroll",
      "Random",
      "End Cut Loss",
      "Scale Loss",
      "Process Rejection",
      "Mill Utilization"
    ],
    datasets: [
      {
        type: 'bar',
        label: '',
        data:  [
          30,
          40,
          60,
          48,
          65,
          38,
          44,
          63
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1
      }]
  };
  kpiOptions: any={
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      datalabels:{
        formatter: (value : any) => {
          return Math.trunc(value);
        },
        font: {
          size: 9
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
  };


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
    private overviewScreenService: OverviewScreenService,
    private http: HttpClient
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

  showrfDialog(){
    this.getStatusData();   
    this.dialogRF = true;
  }

  getStatusData(){
      this.statusInterval = setInterval(() => {
        this.http.get('http://127.0.0.1:8000/po_search?po='+ this.inputPo).subscribe(((res: any)=>{
            this.statusData= res;
 
            this.customer = this.statusData.Customer;
 
            this.grade = this.statusData.Grade;
 
            this.estimateddate = this.statusData.Estimated_Date;
 
            this.ponumber = this.statusData.PO_NUMBER;
 
            this.heatno = this.statusData.Heat_no;
 
            this.noofbillets = this.statusData.No_of_billets;
 
            this.size = this.statusData.Size_mm;
 
            this.orderqtymt = this.statusData.Order_Qty_MT;
 
            this.rolls = this.statusData.rolling;
 
            this.coolingbed = this.statusData.cooling_bed;
 
            this.coolingbedstatus = this.statusData.cooling_bed_status;
 
            this.coldShear = this.statusData.cold_shear;
 
            this.rack = this.statusData.rack;
 
            this.straightener = this.statusData.str;
 
            this.udt = this.statusData.udt;
 
            this.bundle= this.statusData.bundle;
 
            this.goodbars =this.statusData.good_bars;
           
            this.trashbars =this.statusData.trash_bars;
                     
            this.correctedbars = this.statusData.corrected_bars;
            this.timelineData = this.statusData.timeline;
            this.timelineData.map((result: any)=>{
                const statColor = this.statusColors.find(item=> item.name == result.status);
                if(statColor){
                    result.color = statColor.color;
                }
            });                
        }));
     }, 8000);
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
  
  bof1Screen(){
    this.router.navigate(['/TrackingSystem/overview/bof1']);
  }

  bof2Screen(){
    this.router.navigate(['/TrackingSystem/overview/bof2']);
  }
  
  lfScreen(){
    this.router.navigate(['/TrackingSystem/overview/ladle']);
  }

  vdScreen(){
    this.router.navigate(['/TrackingSystem/overview/vd']);
  }
  
  ccmScreen(){
    this.router.navigate(['/TrackingSystem/overview/ccm']);
  } 
  
  planScreen(){
    this.router.navigate(['/TrackingSystem/overview/planning']);
  }
  
  consumptionScreen(){
    this.router.navigate(['/TrackingSystem/overview/consumption']);
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
    this.rhfDetails = false;
    this.standDetails = false;
    this.il1Details = false;
    this.il2Details = false;
  }

  bof2DetailsShow(){
    this.bof2Details = !this.bof2Details ;
    this.bof1Details =false;
    this.lfDetails = false;
    this.vdDetails = false;
    this.ccmDetails = false;
    this.rhfDetails = false;
    this.standDetails = false;
    this.il1Details = false;
    this.il2Details = false;
  }

  lfDetailsShow(){
    this.lfDetails = !this.lfDetails ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.vdDetails = false;
    this.ccmDetails = false;
    this.standDetails = false;
    this.il1Details = false;
    this.il2Details = false;
  }
  vdDetailsShow(){
    this.vdDetails = !this.vdDetails;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.ccmDetails = false;
    this.rhfDetails = false;
    this.standDetails = false;
    this.il1Details = false;
    this.il2Details = false;
  }
  ccmDetailsShow(){
    this.ccmDetails = !this.ccmDetails;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.vdDetails = false;
    this.rhfDetails = false;
    this.standDetails = false;
    this.il1Details = false;
    this.il2Details = false;
  }
  rhfDetailsShow(){
    this.rhfDetails = !this.rhfDetails;
    this.ccmDetails = false;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.vdDetails = false;
    this.standDetails = false;
    this.il1Details = false;
    this.il2Details = false;
  }
  standDetailsShow(){
    this.standDetails = !this.standDetails;
    this.ccmDetails = false;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.rhfDetails = false ;
    this.vdDetails = false;
    this.il1Details = false;
    this.il2Details = false;
  }
  il1DetailsShow(){
    this.il1Details = !this.il1Details;
    this.ccmDetails = false;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.rhfDetails = false ;
    this.vdDetails = false;
    this.standDetails = false;
    this.il2Details = false;
  }
  il2DetailsShow(){
    this.il2Details = !this.il2Details;
    this.ccmDetails = false;
    this.lfDetails = false ;
    this.bof1Details =false;
    this.bof2Details = false ;
    this.rhfDetails = false ;
    this.vdDetails = false;
    this.standDetails = false;
    this.il1Details = false;
  }

  hideDialog(){
    this.bof1Details = false ;
    this.bof2Details = false;
    this.lfDetails = false;
    this.vdDetails = false;
    this.ccmDetails = false;
    this.standDetails = false;
    this.rhfDetails = false;
    this.bannerDialog = false;
    this.inputPo = null;
    this.dialogRF= false;
    clearInterval(this.statusInterval);
  }

  video() {
    this.videoPlayer?.nativeElement.play();
  }

  pageChange(event : any){  
    if(event){
      this.anomalyHeading = this.anomalyData[event.page];  
    }  
  } 
  
  assetPageChange(event : any){ 
    if(event){
      this.assetPageData = this.AssetsData[event.page];  
    }  
  }

  removeOperatorLog(data : any){   
    this.operatorLogs.splice(this.operatorLogs.indexOf(data), 1);
  }

  showBannerDialog(){
    this.bannerDialog =true;
  }

}
