import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-planning',
  templateUrl: './bar-planning.component.html',
  styleUrls: ['./bar-planning.component.scss']
})
export class BarPlanningComponent implements OnInit{
  barPlanData : any;
  selectedData: any;
  loading: boolean = false;
  isEdit: boolean = false;
  barPlanDialog: boolean = false;
  ProductTypeList: any[]=[{id:1,name:"Bar"},{id:2,name:"Billet"},{id:3,name:"Bright Bar"}];
  GradeList: any[]=[{id:1,name:"EN8D"},{id:2,name:"C45R"},{id:3,name:"SAE1040"},{id:4,name:"45C8"},{id:5,name:"EN1A"},{id:6,name:"51CrV4"}]
  GradeClassifyList: any[]=[{id:0,name:"VD"},{id:1,name:"NVD"}];
  InspectedInList: any[]=[{id:0,name:"FASTTRACK"},{id:1,name:"IL-1"},{id:2,name:"IL-2"},{id:3,name:"MANUAL"}];
  minDate: Date = new Date();;
  // {
  //   Estimated_Date : Date;
  //   So: string;
  //   LineItemNo: number;
  //   Product_Type: string;
  //   Customer: string;
  //   Po: string;
  //   HeatNo: string;
  //   NoOfBillets: number;
  //   Grade: string;
  //   GradeId: number;
  //   Grade_Classify: string;
  //   Grade_ClassifyId: number;
  //   Size: number;
  //   Order_Qty: number;
  //   Tas: string;
  //   Rev: number;
  //   Length: number;
  //   To_be_inspected: String;
  //   To_be_inspectedId: number;
  // }
  barPlanDialogData: any={Estimated_Date : new Date(),So:'',LineItemNo:0,Product_TypeId:0,Customer:'',Po:'',HeatNo:'',NoOfBillets:0,GradeId:0,Grade_ClassifyId:0,Size:0,
    Order_Qty:0,Tas:'',Rev:0,Length:0,To_be_inspectedId:0
  }

  constructor(
    private http : HttpClient
  ){}

  ngOnInit(): void {
    this.getData();
    this.minDate = new Date();
  }

  getData(){
    this.loading= true;
    this.http.get('/assets/demo/data/dayWisePlan.json').subscribe(res=>{
      this.barPlanData= res;
      this.loading = false;
    });
  }

  showAddDialog(){
    this.barPlanDialog= true;
  }

  showEditDialog(){
    this.barPlanDialogData = {...this.selectedData};
    // if(this.barPlanDialogData.Estimated_Date){      
    //   this.barPlanDialogData.Estimated_Date = new Date(this.barPlanDialogData.Estimated_Date);
    //   console.log(this.barPlanDialogData.Estimated_Date);
    // }
    this.isEdit= true;
    this.barPlanDialog =true;
  }
  rowSelected(){}
  hideDialog(){
    this.barPlanDialog= false;
    this.isEdit= false;
    this.barPlanDialogData ={Estimated_Date : new Date(),So:'',LineItemNo:0,Product_TypeId:0,Customer:'',Po:'',HeatNo:'',NoOfBillets:0,GradeId:0,Grade_ClassifyId:0,Size:0,
      Order_Qty:0,Tas:'',Rev:0,Length:0,To_be_inspectedId:0
    }

  }

}
