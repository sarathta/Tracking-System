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
  operatorLogs: any;
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
  productionData: any;
  productionInterval:any;
  inventoryChartData : any;
  inventoryOptions: any;
  inventoryValues: any;
  kpiData :any;
  kpiOptions :any;
  kpiValues :any;
  bannerData :any;
  shiftProdValues :any;
  dayProdValues :any;
  monthProdValues :any;
  

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
  productionPlanData: any;
  productionStatusData: any = {
    productionActual: 0,
    productionPlan: 0,
    yieldActual: 0,
    yieldPlan: 0,
    delayActual:0,
    delayPlan:0,
    shiftTeam:'',
    shiftCrew:'',
    powerConsumptionPerTon:'',
    powerConsumptionMonthly:''
  };

  equipmentsData:  any;
  bof1Data: any;
  bof2Data: any;
  lfData: any;
  vdData: any;
  ccmData: any;
  rhfData: any;
  standData: any;
  il1Data: any;
  il2Data: any;
  rollHistoryData: any[]=[];
  chemistryData: any[]=[];
  logItem: any;
  assetsData: any[]=[
    {
      name: "",
      color: 1,
      status: "",
      data : "",
      circleColor: '',
      borderclass:''
    }
  ];

  anomalyData: any[]=[];
  productionGraphs: any;  
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
    this.initProdChart();
    this.getkpiData();
    this.getinventoryChartData();
    this.getProductionPlandata();
    this.getProductionStatusdata();
    this.getEquipmentsdata();
    this.getAssetsData();
    this.getAnomalyData();
    this.getBannerData();
    this.getOperatorLogData();
    this.getProductionGraphData();
    this.overviewScreenService.sendData(1);
    this.layoutService.hideMenu();
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
  }
   
  ngOnDestroy(): void {
    this.overviewScreenService.sendData(0);
    if (this.tracking) {
      clearInterval(this.tracking);
    }
  }

  initProdChart(){
    this.productionGraphs = [
      {
        name:'Shift (t)',
        data:{
          labels:  [
            
          ],
          datasets: [
            {
              type: 'bar',
              label: 'Day',
              data:  [
                
              ],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgb(75, 192, 192)',
              borderWidth: 1
            },
            {
              type: 'bar',
              label: 'Night',
              data: [
               
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
           
          ],
          datasets: [
            {
              type: 'bar',
              data: [
               
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
            
          ],
          datasets: [
            {
              type: 'bar',
              data: [
                
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

  // video() {
  //   this.videoPlayer?.nativeElement.play();
  // }

  pageChange(event : any){  
    if(event){
      this.anomalyHeading = this.anomalyData[event.page];  
    }  
  } 
  
  assetPageChange(event : any){ 
    if(event){
      this.assetPageData = this.assetsData[event.page];  
    }  
  }

  showBannerDialog(){
    this.bannerDialog =true;
  }

  getProductionPlandata() {
    this.http.get('http://127.0.0.1:8000/production_plan').subscribe(res => {
      this.productionPlanData = res;
    });
  }

  getProductionStatusdata() {
    this.http.get('http://127.0.0.1:8000/production_status').subscribe((res: any) => {
      this.productionStatusData = res[0];
    });
  }
  
  getEquipmentsdata() {
    this.rollHistoryData = [];
    this.http.get('http://127.0.0.1:8000/get_equip').subscribe(res => {
      this.equipmentsData = res;
      this.rollHistoryData = [...this.equipmentsData.roll_history];      
      this.chemistryData = [...this.equipmentsData.chemistry];      
      this.bof1Data = this.equipmentsData.bof;
      this.lfData = this.equipmentsData.lf;
      this.vdData = this.equipmentsData.vd;
      this.ccmData = this.equipmentsData.ccm;
      this.rhfData = this.equipmentsData.rhf;
      this.standData = this.equipmentsData.rolls;
      this.il1Data = this.equipmentsData.il;
    });
  }

  getAssetsData() {
    this.http.get('http://127.0.0.1:8000/monitor').subscribe((res: any) => {      
      this.assetsData = res;
      this.assetsData.map((result : any)=>{
        switch(result.color){
          case 0 : result.circleColor = 'green';
                  result.borderclass = 'greenBorderBlink';
                  break;
          case 1 : result.circleColor = 'orange';
                   result.borderclass = 'orangeBorderBlink';
                   break;
          case 2 : result.circleColor = 'red';
                   result.borderclass = 'redBorderBlink';
                   break;
          default: break;
        }
      }); 
    });
    
  }

  getAnomalyData() {
    this.http.get('http://127.0.0.1:8000/roll_set').subscribe((res: any) => {      
      this.anomalyData = res;
    });    
  }

  getBannerData() {
    this.http.get('http://127.0.0.1:8000/banner').subscribe((res: any) => {      
      this.bannerData = res;
    });    
  }

  getOperatorLogData() {
    this.http.get('http://127.0.0.1:8000/operator_logs').subscribe((res: any) => {      
      this.operatorLogs = res;
    });    
  }

  getProductionGraphData() {
    this.productionGraphs = [];
    this.http.get('http://127.0.0.1:8000/production').subscribe((res:any)=>{
      this.shiftProdValues = res.shift;
      this.dayProdValues = res.daily;
      this.monthProdValues = res.month;
      this.productionGraphs=[
        {
          name:'Shift (t)',
          data:{
            labels: this.shiftProdValues.time,
            datasets: [
              {
                type: 'bar',
                label: 'Day',
                data:  this.shiftProdValues.shift2,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1
              },
              {
                type: 'bar',
                label: 'Night',
                data: this.shiftProdValues.shift3,
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
            labels:  this.dayProdValues.time,
            datasets: [
              {
                type: 'bar',
                data: this.dayProdValues.value,
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
            labels: this.monthProdValues.time,
            datasets: [
              {
                type: 'bar',
                data: this.monthProdValues.value,
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
    });
  }

  addLogItem(){
    // if(this.logItem){
    //     this.operatorLogs.push({data: this.logItem});
    //     this.logItem= null;
    // }
    if(this.logItem){
      let option ={ log : this.logItem};
      this.http.post('http://127.0.0.1:8000/add_operator_log',option).subscribe((res: any) => {
        console.log(res);     
        this.logItem = null;
        this.getOperatorLogData();      
     });
    }
  }

  removeOperatorLog(data : any){   
    // this.operatorLogs.splice(this.operatorLogs.indexOf(data), 1);
    this.http.delete('http://127.0.0.1:8000/delete_operator_log/' + data._id).subscribe((res: any) => {      
       console.log(res);     
       this.getOperatorLogData();      
    });
  }

  getinventoryChartData(){
    this.http.get('http://127.0.0.1:8000/inventory').subscribe(res=>{
      this.inventoryValues = res;
      this.bindinventoryChartData()
    });
  }

  bindinventoryChartData(){
    let inventoryChartDatas: any = this.inventoryValues[0].value;
    let inventoryLabels: any =  this.inventoryValues[0].days;

    this.inventoryChartData = {
      labels: inventoryLabels,
      datasets: [
          {
              data: inventoryChartDatas,
              backgroundColor: ['rgba(153, 102, 255, 0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 159, 64, 0.2)'],
              borderColor: ['rgb(153, 102, 255)','rgb(54, 162, 235)','rgb(255, 159, 64)'],
              borderWidth: 1
          }
      ]
    };

    this.inventoryOptions = {
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
  }

  getkpiData(){
    this.http.get('http://127.0.0.1:8000/performance').subscribe(res=>{
      this.kpiValues = res;
      this.kpiChartData()
    });
  }

  kpiChartData() {
    let kpiDatas: any = this.kpiValues[0].data;
    let kpiLabels: any = this.kpiValues[0].labels;

    this.kpiData = {
      labels: kpiLabels,
      datasets: [
        {
          data: kpiDatas,
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgb(153, 102, 255)',
          borderWidth: 1
        }
      ]
    };

    this.kpiOptions = {
      // indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        datalabels: {
          formatter: (value: any) => {
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
    }

  }
}
