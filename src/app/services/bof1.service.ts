import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Bof1Service {

  private mainUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  getbof1() {
    return this.http.get('/assets/demo/data/bof1/bof1data.json');
  }

  getO2Consumption() {
    return this.http.get('/assets/demo/data/bof1/o2ConsumptionData.json');
  }

}
