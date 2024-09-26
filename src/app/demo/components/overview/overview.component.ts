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
udtbarStatus:boolean = false;
okbarStatus:boolean = false;
mpi1barStatus:boolean = false;
mpi2barStatus:boolean = false;
timeInterval: any;
showbof1: number = 0;
showbof2: number = 0;
showLF: number = 0;
showVD: number = 0;
showCC: number = 0;
rfData: any;
rfBillets: any
lfData: any;
ccmData: any;
coolingBedData: any;
coldShearData: any;
mpi1Data: any;
mpi2Data: any;
okbarData: any;
rackAreaData: any;
bundling1Data: any;
bundling2Dat: any;
bundling2Data: any;
mpi1TrashData: any;
mpi1TrashDataCount: number=0;
mpi2TrashData: any;
mpi2TrashDataCount: number=0;
udtData: any;
udtPO: any;
coldShearPO: any;
rack1: any;
rack2: any;
rack3: any;
rack4: any;
b1Barcount: number=0;
bundlePO: any;
bundleBarCount: any;
b1PO: any;
b2PO: any;
b3PO: any;
b4PO: any;
b5PO: any;
b6PO: any;
b7PO: any;
b8PO: any;
b2Barcount: number=0;
b3Barcount: number=0;
b4Barcount: number=0;
b5Barcount: number=0;
b6Barcount: number=0;
b7Barcount: number=0;
b8Barcount: number=0;
sectionA: boolean= false;
sectionB: boolean= false;
sectionC: boolean= false;
sectionD: boolean= false;
dialogRackHeader: any;
dialogHeader: any;
dialogILHeader: any;
dialogbundles: boolean=false;
dialogRack: boolean=false;
dialogbars: boolean=false;
dialogstraightener: boolean=false;
dialogudt: boolean=false;
dialogColdShear: boolean=false;
dialogRF: boolean=false;
dialogIL: boolean=false;
barsInBundle1: number =0;
barsInBundle2: number =0;

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
    this.getCoolingBedData();
    this.getColdShearData();
    this.getRackAreaData();
    this.getUdtData();
    this.getMpi1Data();
    this.getMpi2Data();
    this.getmp1RejectedbarsData();
    this.getmp2RejectedbarsData();
    this.getokbarData();
    this.getbundling1Data();
    this.getbundling2Data();
    this.billets.push({id: i});
    this.bundles.push({id: c, loaded: true});
    if(c == 1){
      this.sectionA = true;
    }
    if(c == 2){
      this.sectionB = true;
    }
    if(c == 3){
      this.sectionC = true;
    }
    if(c == 4){
      this.sectionD = true;
    }
     
    c++;
    if(c>4){
      this.sectionA = false;
      this.sectionB = false;
      this.sectionC = false;
      this.sectionD = false;

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
      if(this.rfData != null){
        this.rfBillets = this.rfData.billets;
      }
      else{
        this.rfBillets = [];
      }
    }));
  }

  getLfData(){
    this.http.get('http://127.0.0.1:8000/lf').subscribe((res=>{
      this.lfData= res;
    }));
  }
  
  getCcmata(){
    this.http.get('http://127.0.0.1:8000/ccm').subscribe((res=>{
      this.ccmData= res;
    }));
  }

  getCoolingBedData(){
    this.http.get('http://127.0.0.1:8000/cooling_bed').subscribe((res=>{
      this.coolingBedData= res;
    }));
  }

  getColdShearData(){
    this.http.get('http://127.0.0.1:8000/cold_shear').subscribe((res=>{
      this.coldShearData= res;
      this.coldShearPO = this.coldShearData[0].po;
    }));
  }

  getRackAreaData(){
    this.http.get('http://127.0.0.1:8000/rack_area').subscribe((res=>{
      this.rackAreaData= res;
      this.rack1 = this.rackAreaData.filter((item: any)=> item.rack == 0);
      this.rack2 = this.rackAreaData.filter((item: any)=> item.rack == 1);
      this.rack3 = this.rackAreaData.filter((item: any)=> item.rack == 2);
      this.rack4 = this.rackAreaData.filter((item: any)=> item.rack == 3);
      console.log(this.rack1);
    }));
  }

  getUdtData(){
    this.http.get('http://127.0.0.1:8000/udt').subscribe((res=>{
      this.udtData= res;
      this.udtPO = this.udtData[0].po;
      if(this.udtData.length !=0){
        this.udtbarStatus= true
      }
      else{
        this.udtbarStatus = false;
      }
      if(this.udtData.length > 1){
        console.log("more than one item in udt");        
      }
    }));
  }

  getMpi1Data(){
    this.http.get('http://127.0.0.1:8000/mpi1').subscribe((res=>{
      this.mpi1Data= res;
      if(this.mpi1Data.length > 0){
        this.mpi1barStatus = true;
      }
      else{
        this.mpi1barStatus = false;
      }
      // this.coldShearPO = this.mpi1Data[0].po;
    }));
  }
  getMpi2Data(){
    this.http.get('http://127.0.0.1:8000/mpi2').subscribe((res=>{
      this.mpi2Data= res;
      if(this.mpi2Data.length > 0){
        this.mpi2barStatus = true;
      }
      else{
        this.mpi2barStatus = false;
      }
      // this.coldShearPO = this.mpi1Data[0].po;
    }));
  }

  getokbarData(){
    this.http.get('http://127.0.0.1:8000/good_bar').subscribe((res=>{
      this.okbarData= res;
      if(this.okbarData.length > 0){
        this.okbarStatus = true;
      }
      else{
        this.okbarStatus = false;
      }
      // this.coldShearPO = this.mpi1Data[0].po;
    }));
  }
  getbundling1Data(){
    this.http.get('http://127.0.0.1:8000/bundle1').subscribe((res=>{
      this.bundling1Data= res;
      this.barsInBundle1 = this.bundling1Data.length;
    }));
  }

  getbundling2Data(){
    this.http.get('http://127.0.0.1:8000/bundle2').subscribe((res=>{
      this.bundling2Data= res;
      this.barsInBundle2 = this.bundling2Data.length;
    }));
  }
 
  getmp1RejectedbarsData(){
    this.http.get('http://127.0.0.1:8000/trash1').subscribe((res=>{
      this.mpi1TrashData= res;
      this.mpi1TrashDataCount = this.mpi1TrashData.length;
    }));
  }

  getmp2RejectedbarsData(){
    this.http.get('http://127.0.0.1:8000/trash2').subscribe((res=>{
      this.mpi2TrashData= res;
      this.mpi2TrashDataCount = this.mpi2TrashData.length;
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

  showBundleDialog(data: any){
    if(data == 'b01'){
      this.bundlePO = this.b1PO;
      this.bundleBarCount = this.b1Barcount;
    }
    else  if(data == 'b02'){
      this.bundlePO = this.b2PO;
      this.bundleBarCount = this.b2Barcount;
    }
    else  if(data == 'b03'){
      this.bundlePO = this.b3PO;
      this.bundleBarCount = this.b3Barcount;
    }
    else  if(data == 'b04'){
      this.bundlePO = this.b4PO;
      this.bundleBarCount = this.b4Barcount;
    }
    else  if(data == 'b05'){
      this.bundlePO = this.b5PO;
      this.bundleBarCount = this.b5Barcount;
    }
    else  if(data == 'b06'){
      this.bundlePO = this.b6PO;
      this.bundleBarCount = this.b6Barcount;
    }
    else  if(data == 'b07'){
      this.bundlePO = this.b7PO;
      this.bundleBarCount = this.b7Barcount;
    }
    else  if(data == 'b08'){
      this.bundlePO = this.b8PO;
      this.bundleBarCount = this.b8Barcount;
    }
    
    this.dialogbundles = true;
    this.dialogHeader = data;

  }

  showRackDialog(data: any){
    this.dialogRack = true;
    if(data == 'Rack A'){
      this.rack1.forEach((element: any) => {
        if(element.bundle == 0){
          this.b1Barcount = this.b1Barcount + 1;
          this.b1PO = element.po;
        }
        else if(element.bundle == 1){
          this.b2Barcount = this.b2Barcount + 1;
          this.b2PO = element.po;
        }
        else if(element.bundle == 2){
          this.b3Barcount = this.b3Barcount + 1;
          this.b3PO = element.po;
        }
        else if(element.bundle == 3){
          this.b4Barcount = this.b4Barcount + 1;
          this.b4PO = element.po;
        }
        else if(element.bundle == 4){
          this.b5Barcount = this.b5Barcount + 1;
          this.b5PO = element.po
        }
        else if(element.bundle == 5){
          this.b6Barcount = this.b6Barcount + 1;
          this.b6PO = element.po
        }
        else if(element.bundle == 6){
          this.b7Barcount = this.b7Barcount + 1;
          this.b7PO = element.po
        }
        else if(element.bundle == 7){
          this.b8Barcount = this.b8Barcount + 1;
          this.b8PO = element.po
        }
        else if(element.bundle == 8){
          this.b8Barcount = this.b8Barcount + 1;
          this.b8PO = element.po
        }
      });
    }
    else if(data == 'Rack B'){
      this.rack2.forEach((element: any) => {
        if(element.bundle == 0){
          this.b1Barcount = this.b1Barcount + 1;
          this.b1PO = element.po;
        }
        else if(element.bundle == 1){
          this.b2Barcount = this.b2Barcount + 1;
          this.b2PO = element.po;
        }
        else if(element.bundle == 2){
          this.b3Barcount = this.b3Barcount + 1;
          this.b3PO = element.po;
        }
        else if(element.bundle == 3){
          this.b4Barcount = this.b4Barcount + 1;
          this.b4PO = element.po;
        }
        else if(element.bundle == 4){
          this.b5Barcount = this.b5Barcount + 1;
          this.b5PO = element.Po;
        }
        else if(element.bundle == 5){
          this.b6Barcount = this.b6Barcount + 1;
          this.b6PO = element.po;
        }
        else if(element.bundle == 6){
          this.b7Barcount = this.b7Barcount + 1;
          this.b7PO = element.po;
        }
        else if(element.bundle == 7){
          this.b8Barcount = this.b8Barcount + 1;
          this.b8PO = element.po;
        }
        else if(element.bundle == 8){
          this.b8Barcount = this.b8Barcount + 1;
          this.b8PO = element.po;
        }
      });
    }
    else if(data == 'Rack C'){
      this.rack3.forEach((element: any) => {
        if(element.bundle == 0){
          this.b1Barcount = this.b1Barcount + 1;
          this.b1PO = element.po;
        }
        else if(element.bundle == 1){
          this.b2Barcount = this.b2Barcount + 1;
          this.b2PO = element.po;
        }
        else if(element.bundle == 2){
          this.b3Barcount = this.b3Barcount + 1;
          this.b3PO = element.po;
        }
        else if(element.bundle == 3){
          this.b4Barcount = this.b4Barcount + 1;
          this.b4PO = element.po;
        }
        else if(element.bundle == 4){
          this.b5Barcount = this.b5Barcount + 1;
          this.b5PO = element.po;
        }
        else if(element.bundle == 5){
          this.b6Barcount = this.b6Barcount + 1;
          this.b6PO = element.po;
        }
        else if(element.bundle == 6){
          this.b7Barcount = this.b7Barcount + 1;
          this.b7PO = element.po;
        }
        else if(element.bundle == 7){
          this.b8Barcount = this.b8Barcount + 1;
          this.b8PO = element.po;
        }
        else if(element.bundle == 8){
          this.b8Barcount = this.b8Barcount + 1;
          this.b8PO = element.po;
        }
      });
    }
    else if(data == 'Rack D'){
      this.rack4.forEach((element: any) => {
        if(element.bundle == 0){
          this.b1Barcount = this.b1Barcount + 1;
          this.b1PO = element.po;
        }
        else if(element.bundle == 1){
          this.b2Barcount = this.b2Barcount + 1;
          this.b2PO = element.po;
        }
        else if(element.bundle == 2){
          this.b3Barcount = this.b3Barcount + 1;
          this.b3PO = element.po;
        }
        else if(element.bundle == 3){
          this.b4Barcount = this.b4Barcount + 1;
          this.b4PO = element.Po;
        }
        else if(element.bundle == 4){
          this.b5Barcount = this.b5Barcount + 1;
          this.b5PO = element.po;
        }
        else if(element.bundle == 5){
          this.b6Barcount = this.b6Barcount + 1;
          this.b6PO = element.po;
        }
        else if(element.bundle == 6){
          this.b7Barcount = this.b7Barcount + 1;
          this.b7PO = element.po;
        }
        else if(element.bundle == 7){
          this.b8Barcount = this.b8Barcount + 1;
          this.b8PO = element.po;
        }
        else if(element.bundle == 8){
          this.b8Barcount = this.b8Barcount + 1;
          this.b8PO = element.po;
        }
      });
    }
    this.dialogRackHeader = data;
  }
  
  showbarDialog(data: any){
    this.dialogbars = true;
  }
  showstraightenerDialog(){
    this.dialogstraightener = true;
  }
  showudtDialog(){
    this.dialogudt = true;
  }

  showColdShearDialog(){
    this.dialogColdShear = true;
  }

  showrfDialog(){
    this.dialogRF = true;
  }
  
  showILDialog(data :any){
    this.dialogIL = true;
    this.dialogILHeader = data;

  }

  hideDialog(){
    // this.dialogbundles = false;
    // this.dialogRack = false;
    // this.dialogbars = false;
  }

}
