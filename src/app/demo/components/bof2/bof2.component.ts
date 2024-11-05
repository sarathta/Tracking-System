import { HttpClient } from '@angular/common/http';
import { Component,OnDestroy,OnInit } from '@angular/core';
import { Bof1Service } from 'src/app/services/bof1.service';

@Component({
  selector: 'app-bof2',
  templateUrl: './bof2.component.html',
  styleUrls: ['./bof2.component.scss']
})
export class Bof2Component implements OnInit{
  
  islogSheet:boolean= false;
     
  ngOnInit(): void {
    
  }
}
