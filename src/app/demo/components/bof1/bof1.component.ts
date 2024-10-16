import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bof1Service } from 'src/app/services/bof1.service';

@Component({
  selector: 'app-bof1',
  templateUrl: './bof1.component.html',
  styleUrls: ['./bof1.component.scss']
})
export class Bof1Component implements OnInit,OnDestroy{
  selectedData: any;
  loading: boolean =false;
  temperatureData : any;
  oxydationData : any;
  Tempdata : any;
  Oxydata : any;
  Tempoptions: any;
  Oxyoptions: any;
  progressValue: any;
  timeInterval: any;


  constructor(
    private http : HttpClient
  ){}
  
  ngOnInit(): void {
    this.startInterval();
    this.getTempData();
    this.getOxyData();    
  }

  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }

  startInterval() {
    //this.intervalService.setisInterval(true);
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    this.timeInterval = setInterval(() => {
      this.http.get('http://127.0.0.1:8000/rem_time').subscribe(res=>{
        let number: any = res;
        this.progressValue= Math.trunc(number);
      });
    },1000);
  }

  getTempData(){
    this.http.get('http://127.0.0.1:8000/temperature').subscribe(res=>{
      this.temperatureData= res;
      this.bindTempData()
    });
  }

  getOxyData(){
    this.http.get('http://127.0.0.1:8000/oxidation').subscribe(res=>{
      this.oxydationData= res;
      this.bindOxyData()
    });
  }
 
  bindTempData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let templabelArray: any[] = [];
    let TempData: any[] = this.temperatureData.temp;
    let i =0;      
    while(i <= TempData.length){
      templabelArray.push(i);
      i=i+1;        
    }
    this.Tempdata = {
      labels: templabelArray,
      datasets: [
          {
              label: 'Temperature',
              data: TempData,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--orange-300'),
              tension: 0.4
          }
      ]
    };

    this.Tempoptions = {
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

  bindOxyData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    let oxylabelArray: any[] = [];
    let OxyData: any[] = this.oxydationData.oxidation;
    let i =0;      
    while(i <= OxyData.length){
      oxylabelArray.push(i);
      i=i+1;        
    }
    this.Oxydata = {
      labels: oxylabelArray,
      datasets: [
          {
              label: 'Oxydation',
              data: OxyData,
              fill: false,
              borderColor: documentStyle.getPropertyValue('--green-300'),
              tension: 0.4
          }
      ]
    };

    this.Oxyoptions = {
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
