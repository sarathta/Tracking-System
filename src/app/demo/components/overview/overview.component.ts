import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit,OnDestroy {
billets: any[]=[];
bars: any[]=[];
bundles: any[]=[];
timeInterval: any;
showbof1: number = 0;
showbof2: number = 0;
showLF: number = 0;
showVD: number = 0;
showCC: number = 0;
rfData: any;
lfData: any;
ccmData: any;

constructor(
  private http : HttpClient
 ){}

ngOnInit(): void {
   this.startInterval();
  
}

startInterval() {
  //this.intervalService.setisInterval(true);
  if (this.timeInterval) {
    clearInterval(this.timeInterval);
  }
  let i=0,j=1,c=1;
  this.timeInterval = setInterval(() => {
    this.getLfData();
    this.getCcmata();
    this.getReheatingFurnaceData();
    this.billets.push({id: i});
    this.bundles.push({id: c});
    c++;
    if(c>4){
      this.bundles = [];
      c=1;
    }
    if(j%2 == 0){
      this.bars.push({id: j})
    }
    j++;
    i++;
    if(i>7){
      this.billets = [];
      i=0;
    }  
    if(j>16){
      this.bars=[];
      j=1;
    } 
  }, 2000);
}

  getReheatingFurnaceData(){
    this.http.get('http://127.0.0.1:8000/po').subscribe((res=>{
      this.rfData= res;
      console.log(this.rfData);      
    }));
  }

  getLfData(){
    this.http.get('http://127.0.0.1:8000/lf').subscribe((res=>{
      this.lfData= res;
      console.log(this.lfData);      
    }));
  }
  
  getCcmata(){
    this.http.get('http://127.0.0.1:8000/ccm').subscribe((res=>{
      this.ccmData= res;
      console.log(this.ccmData);      
    }));
  }


  ngOnDestroy() {
    clearInterval(this.timeInterval);
  }

  Bof1(){
    this.showbof1 = ++this.showbof1;
  }
  Bof2(){
    this.showbof2 = ++this.showbof2;
  }
  LF(){
    this.showLF = ++this.showLF;
  }
  VD(){
    this.showVD = ++this.showVD;
  }
  CC(){
    this.showCC = ++this.showCC;
  }


}
