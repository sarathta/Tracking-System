import { Component, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-bof1-logsheet',
  templateUrl: './bof1-logsheet.component.html',
  styleUrls: ['./bof1-logsheet.component.scss'],
  providers: [ConfirmationService]

})
export class Bof1LogsheetComponent {
  
  @Input() set inp_ShowDialog(data: any) {
    if (data > 0) {
      this.isLfLogSheetDialog = true;
    }
    else {
      this.clearData();
    }
  }

  logSheetList1: any[] = [];
  logSheetList2: any[] = [];
  selectedData: any;
  steelGradeList: any[]=[{id:1,name:"EN8D"},{id:2,name:"C45R"},{id:3,name:"SAE1040"},{id:4,name:"45C8"},{id:5,name:"EN1A"},{id:6,name:"51CrV4"}]
  shift: any[]=[{id:1,name:'A'},{id:2,name:'B'},{id:3,name:'C'}];
  GradeClassifyList: any[]=[{id:0,name:"VD"},{id:1,name:"NVD"}];
  CarNo: any[]=[{id:0,name:"1"},{id:1,name:"2"}];
  submitted: boolean = false;
  dialogData = {
    date:new Date(),
    heatNo: '',
    shiftId: 0,
    steelGradeId: 0,
    liqTemp: 0,
    gradeTypeId: 0,
    tas:'',
    weight: 0,
    freeBoard:0,
    size:0,
    time:new Date(),
    ladleTemp:0,
    arcingTime:0,
    argonFlow:0,
    arConsumption:0,
    carNo:0,
    lrfProcessTime:0
  }
  errorMessage: string = '';
  isLfLogSheetDialog: boolean = false;
  isMasterDataLoaded: boolean = false;
  dlgProgress: boolean = false;
  minDate: Date = new Date();

  constructor( ) { }

  ngOnInit(): void {
  }

  //MASTER DATA
  getMasterData() {
    
  }

  addNewItem_to_List() {
    this.submitted = true;
    if (this.validateForm()) {
      let rowData = JSON.parse(JSON.stringify(this.dialogData));
      if(!rowData.date){
        rowData.date = new Date();
      }
      if(!rowData.time){
        rowData.time = new Date();
      }
      this.dialogData = {
        date:new Date(),
        heatNo: '',
        shiftId: 0,
        steelGradeId: 0,
        liqTemp: 0,
        gradeTypeId: 0,
        tas:'',
        weight: 0,
        freeBoard:0,
        size:0,
        time: new Date(),
        ladleTemp:0,
        arcingTime:0,
        argonFlow:0,
        arConsumption:0,
        carNo:0,
        lrfProcessTime:0
      }

      const shift = this.shift.find((item: any) => item.id == rowData.shiftId);
      if(shift){
        rowData.shiftName = shift.name;
      }
      const grade = this.steelGradeList.find((item: any) => item.id == rowData.steelGradeId);
      if(grade){
        rowData.gradeName = grade.name;
      }
      const gradeType = this.GradeClassifyList.find((item: any) => item.id == rowData.gradeTypeId);
      if(gradeType){
        rowData.typeName = gradeType.name;
      }
      const carNo = this.CarNo.find((item: any) => item.id == rowData.carNo);
      if(carNo){
        rowData.carNumber = carNo.name;
      }
      // const product = this.productsList.find((item: any) => item.id == rowData.productId);
      // if (product) {
      //   rowData.productName = product.sapcode;
      //   // this.productsList.splice(this.productsList.indexOf(product), 1);
      // }
      // const grade = this.steelGradeList.find((item: any) => item.id === rowData.steelGradeId);
      // if (grade) { rowData.gradeName = grade.name; }

      this.logSheetList1.push(rowData);
    }
  }

  addNewItem_to_List2() {
    this.submitted = true;
    if (this.validateForm()) {
      let rowData = JSON.parse(JSON.stringify(this.dialogData));
      if(!rowData.date){
        rowData.date = new Date();
      }
      if(!rowData.time){
        rowData.time = new Date();
      }
      this.dialogData = {
        date:new Date(),
        heatNo: '',
        shiftId: 0,
        steelGradeId: 0,
        liqTemp: 0,
        gradeTypeId: 0,
        tas:'',
        weight: 0,
        freeBoard:0,
        size:0,
        time: new Date(),
        ladleTemp:0,
        arcingTime:0,
        argonFlow:0,
        arConsumption:0,
        carNo:0,
        lrfProcessTime:0
      }

      const shift = this.shift.find((item: any) => item.id == rowData.shiftId);
      if(shift){
        rowData.shiftName = shift.name;
      }
      const grade = this.steelGradeList.find((item: any) => item.id == rowData.steelGradeId);
      if(grade){
        rowData.gradeName = grade.name;
      }
      const gradeType = this.GradeClassifyList.find((item: any) => item.id == rowData.gradeTypeId);
      if(gradeType){
        rowData.typeName = gradeType.name;
      }
      const carNo = this.CarNo.find((item: any) => item.id == rowData.carNo);
      if(carNo){
        rowData.carNumber = carNo.name;
      }
      // const product = this.productsList.find((item: any) => item.id == rowData.productId);
      // if (product) {
      //   rowData.productName = product.sapcode;
      //   // this.productsList.splice(this.productsList.indexOf(product), 1);
      // }
      // const grade = this.steelGradeList.find((item: any) => item.id === rowData.steelGradeId);
      // if (grade) { rowData.gradeName = grade.name; }

      this.logSheetList2.push(rowData);
    }
  }

  removeItem(index: any) {
    // console.log(index);
    // const removeItem = this.logSheetList1[index];
    // var product = this.productAllList.find((item: any) => item.id == removeItem.productId);
    // if (product) {
    //   // console.log(this.productsList.indexOf(product));
    //   this.productsList.splice(0, 0, product)
    // }
    this.logSheetList1.splice(index, 1);
  }

  removeItem2(index: any) {
    // console.log(index);
    // const removeItem = this.logSheetList1[index];
    // var product = this.productAllList.find((item: any) => item.id == removeItem.productId);
    // if (product) {
    //   // console.log(this.productsList.indexOf(product));
    //   this.productsList.splice(0, 0, product)
    // }
    this.logSheetList2.splice(index, 1);
  }



  validateForm() {
    
    return true;
  }

  validateSave() {
    if (!this.logSheetList1?.length) {
      return false;
    }
    return true;
  }

  clearData() {
    this.dialogData = {
      date:new Date(),
      heatNo: '',
      shiftId: 0,
      steelGradeId: 0,
      liqTemp: 0,
      gradeTypeId: 0,
      tas:'',
      weight: 0,
      freeBoard:0,
      size:0,
      time:new Date(),
      ladleTemp:0,
      arcingTime:0,
      argonFlow:0,
      arConsumption:0,
      carNo:0,
      lrfProcessTime:0
    }
    this.logSheetList1 = [];
    this.isLfLogSheetDialog = false;
    this.errorMessage = "";
  }
}



