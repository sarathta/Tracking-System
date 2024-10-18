import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blast-furnace',
  templateUrl: './blast-furnace.component.html',
  styleUrls: ['./blast-furnace.component.scss']
})
export class BlastFurnaceComponent {
  selectedData: any;
  loading: boolean =false;
  oxydationData : any;
  Oxydata : any;
  Oxyoptions: any;
  progressValue: any;
  timeInterval: any;




  constructor(
    private http : HttpClient
  ){}
  
  ngOnInit(): void {
    this.getOxyData();
    this.startInterval(); 
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


  getOxyData(){
    this.http.get('http://127.0.0.1:8000/oxidation').subscribe(res=>{
      this.oxydationData= res;
      this.bindOxyData()
    });
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
