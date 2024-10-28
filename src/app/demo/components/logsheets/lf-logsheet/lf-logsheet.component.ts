import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lf-logsheet',
  templateUrl: './lf-logsheet.component.html',
  styleUrls: ['./lf-logsheet.component.scss']
})
export class LfLogsheetComponent implements OnInit{
  lfLogSheetData: any;
  selectedData: any;
  loading: boolean=false;

  constructor() {}

  ngOnInit(): void {
    
  }
  rowSelected(){}
}
