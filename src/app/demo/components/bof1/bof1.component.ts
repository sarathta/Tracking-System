import { Component, OnInit } from '@angular/core';
import { Bof1Service } from 'src/app/services/bof1.service';

@Component({
  selector: 'app-bof1',
  templateUrl: './bof1.component.html',
  styleUrls: ['./bof1.component.scss']
})
export class Bof1Component implements OnInit{
  selectedData: any;
  loading: boolean =false;
  ngOnInit(): void {
    
  }
 

}
