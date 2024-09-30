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
barstatus: any= "good bar"
okbarStatus:boolean = false;
mpi1barStatus:boolean = false;
mpi2barStatus:boolean = false;
mpi1GoodBar:boolean = false;
mpi2GoodBar:boolean = false;
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
strData: any;
strBar: any;
strBedData: any;
strBedBars: any;
strBedPo: any;
mpi1Data: any;
mpi2Data: any;
okbarData: any;
okbarId: any;
rackAreaData: any;
dialogRackData: any;
bundling1Data: any;
bundling2Dat: any;
bundling2Data: any;
mpi1TrashData: any;
mpi1TrashDataCount: number=0;
mpi2TrashData: any;
mpi2TrashDataCount: number=0;
udtData: any;
udtPO: any;
udtBarId: any;
udtGoodBar: boolean= false;
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
cb1: any;
cb2: any;
cb3: any;
cb4: any;
cb5: any;
cb6: any;
cb7: any;
cb8: any;
cb9: any;
cb10: any;
cb11: any;
cb12: any;
cb13: any;
cb14: any;
cb15: any;

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
    this.getStrBedData();
    this.getStraightenerData();
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
  }, 1000);
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
      if(this.coolingBedData.length >0){
        this.cb1 = this.coolingBedData[0]?.BilletId ? this.coolingBedData[0]?.BilletId : null;
        this.cb2 = this.coolingBedData[1]?.BilletId ? this.coolingBedData[1]?.BilletId : null;
        this.cb3 = this.coolingBedData[2]?.BilletId ? this.coolingBedData[2]?.BilletId : null;
        this.cb4 = this.coolingBedData[3]?.BilletId ? this.coolingBedData[3]?.BilletId : null;
        this.cb5 = this.coolingBedData[4]?.BilletId ? this.coolingBedData[4]?.BilletId : null;
        this.cb6 = this.coolingBedData[5]?.BilletId ? this.coolingBedData[5]?.BilletId : null;
        this.cb7 = this.coolingBedData[6]?.BilletId ? this.coolingBedData[6]?.BilletId : null;
        this.cb8 = this.coolingBedData[7]?.BilletId ? this.coolingBedData[7]?.BilletId : null;
        this.cb9 = this.coolingBedData[8]?.BilletId ? this.coolingBedData[8]?.BilletId : null;
        this.cb10 = this.coolingBedData[9]?.BilletId ? this.coolingBedData[9]?.BilletId : null;
        this.cb11 = this.coolingBedData[10]?.BilletId ? this.coolingBedData[10]?.BilletId : null;
        this.cb12 = this.coolingBedData[11]?.BilletId ? this.coolingBedData[11]?.BilletId : null;
        this.cb12 = this.coolingBedData[12]?.BilletId ? this.coolingBedData[12]?.BilletId : null;
        this.cb13 = this.coolingBedData[13]?.BilletId ? this.coolingBedData[13]?.BilletId : null;
        this.cb14 = this.coolingBedData[14]?.BilletId ? this.coolingBedData[14]?.BilletId : null;
        this.cb15 = this.coolingBedData[15]?.BilletId ? this.coolingBedData[15]?.BilletId : null;
      }
    }));
  }

  getColdShearData(){
    this.http.get('http://127.0.0.1:8000/cold_shear').subscribe((res=>{
      this.coldShearData= res;
      this.coldShearPO = this.coldShearData[0]?.po;
    }));
  }

  getRackAreaData(){
    this.http.get('http://127.0.0.1:8000/rack_area').subscribe((res=>{
      this.rackAreaData= res;
      this.rack1 = this.rackAreaData.rack_0;
      this.rack2 = this.rackAreaData.rack_1;
      this.rack3 = this.rackAreaData.rack_2;
      this.rack4 = this.rackAreaData.rack_3;
    }));
  }

  getStraightenerData(){
    this.http.get('http://127.0.0.1:8000/str').subscribe((res=>{
      this.strData= res;
      if(this.strData.length > 0){
        this.strBar = this.strData[0];      
      }
    }));
  }

  getStrBedData(){
    this.http.get('http://127.0.0.1:8000/str_bed').subscribe((res=>{
      this.strBedData= res;
      this.strBedPo = this.strBedData.po;
      this.strBedBars = this.strBedData.NoOfBars;      
    }));
  }

  getUdtData(){
    this.http.get('http://127.0.0.1:8000/udt').subscribe((res=>{
      this.udtData= res;
      this.udtPO = this.udtData[0].po;
      this.udtBarId = this.udtData[0].BarId
      if(this.udtData.length !=0){
        this.udtbarStatus= true
        this.udtGoodBar = this.udtData[0].goodBar;
      }
      else{
        this.udtbarStatus = false;
        this.udtGoodBar = false;
      }
    }));
  }

  getMpi1Data(){
    this.http.get('http://127.0.0.1:8000/mpi1').subscribe((res=>{
      this.mpi1Data= res;
      if(this.mpi1Data.length > 0){
        this.mpi1barStatus = true;
        this.mpi1GoodBar = this.mpi1Data[0].goodBar
      }
      else{
        this.mpi1barStatus = false;
        this.mpi1GoodBar = false;
      }
      // this.coldShearPO = this.mpi1Data[0].po;
    }));
  }
  getMpi2Data(){
    this.http.get('http://127.0.0.1:8000/mpi2').subscribe((res=>{
      this.mpi2Data= res;
      if(this.mpi2Data.length > 0){
        this.mpi2barStatus = true;
        this.mpi2GoodBar = this.mpi2Data[0].goodBar
      }
      else{
        this.mpi2barStatus = false;
        this.mpi2GoodBar = false;
      }
      // this.coldShearPO = this.mpi1Data[0].po;
    }));
  }

  getokbarData(){
    this.http.get('http://127.0.0.1:8000/good_bar').subscribe((res=>{
      this.okbarData= res;
      this.okbarId = this.okbarData[0];
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
    this.dialogHeader = "b0"+ data.BundelId;
    this.bundlePO = data.po;
    this.bundleBarCount = data.NoOfBars;    
    this.dialogbundles = true;
  }

  showRackDialog(data: any){
    this.dialogRackData =[];
    if(data == 'Rack_A'){
      this.dialogRackData = this.rack1;
    }
    else if(data == 'Rack_B'){
      this.dialogRackData = this.rack2
    }
    else if(data == 'Rack_C'){
      this.dialogRackData = this.rack3
    }
    else if(data == 'Rack_D'){
      this.dialogRackData = this.rack4
    }
    this.dialogRack = true;
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
