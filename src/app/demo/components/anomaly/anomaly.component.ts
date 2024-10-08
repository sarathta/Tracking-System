import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anomaly',
  templateUrl: './anomaly.component.html',
  styleUrls: ['./anomaly.component.scss']
})
export class AnomalyComponent implements OnInit{
  data: any;
  options: any;
  timeInterval: any;
  anomalyData: any;
  selectedData: any;
  loading: boolean= false;

  constructor(
    private http : HttpClient
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.getData();
  }

  getData(){
    this.http.get('http://127.0.0.1:8000/anomaly').subscribe(res=>{
      this.anomalyData= res;
      this.selectedData = this.anomalyData[0];
      this.loading = false;
      this.bindData()
    });
  }

  bindData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    if(this.selectedData){
      console.log(this.selectedData);
      
      let labelArray: any[] = [];
      let CurrentData: any[] = this.selectedData?.Current;
      let AnomalyCurrentData: any[]= this.selectedData?.AnomalyCurrent;
      let i =0;      
      while(i <= CurrentData.length){
        labelArray.push(i);
        i=i+1;        
      }
      this.data = {
        labels: labelArray,
        datasets: [
          {
            label: 'Anomaly',
            data: AnomalyCurrentData,
            fill: false,
            borderDash: [5, 5],
            tension: 0.4,
            borderColor: documentStyle.getPropertyValue('--orange-500')
          },
          {
            label: 'Ideal',
            data: CurrentData,
            fill: true,
            borderColor: documentStyle.getPropertyValue('--teal-500'),
            tension: 0.4,
            backgroundColor: 'rgba(19, 206, 22, 0.15)'              
          }       
        ]
      };
    }
    this.options = {
        // responsive: false,
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
