import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-anomaly',
  templateUrl: './anomaly.component.html',
  styleUrls: ['./anomaly.component.scss']
})
export class AnomalyComponent implements OnInit,OnDestroy{
  data: any;
  options: any;
  timeInterval: any;
  anomalyData: any;

  constructor(
    private http : HttpClient
  ){}

  ngOnInit(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
    this.timeInterval = setInterval(() => {
      this.getData();
    }, 1000);

    this.bindData();

  }

  getData(){
    this.http.get('http://127.0.0.1:8000/anomaly').subscribe((res=>{
      this.anomalyData= res;
  }));

  }

  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }

  bindData(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'red',
              tension: 0.4
          }          
      ]
    };

    this.options = {
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
