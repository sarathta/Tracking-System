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

  constructor(){}

  ngOnInit(): void {
    
  }

  rowSelected(){}

}
