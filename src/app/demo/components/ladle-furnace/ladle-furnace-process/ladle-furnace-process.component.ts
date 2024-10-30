import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ladle-furnace-process',
  templateUrl: './ladle-furnace-process.component.html',
  styleUrls: ['./ladle-furnace-process.component.scss']
})
export class LadleFurnaceProcessComponent implements OnInit{
  selectedData: any;
  loading: boolean =false;
  temperatureData : any;
  Tempdata : any;
  Tempoptions: any;
  progressValue: any;
  timeInterval: any;


  constructor(
    private http : HttpClient
  ){}
  
  ngOnInit(): void {
    this.getTempData(); 
  }

  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }


  getTempData(){
    this.http.get('http://127.0.0.1:8000/temperature').subscribe(res=>{
      this.temperatureData= res;
      this.bindTempData()
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


}
