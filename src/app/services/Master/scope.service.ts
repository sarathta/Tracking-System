import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScopeService {

  private mainUrl = environment.baseUrl;
  private aliasScope = this.mainUrl + 'ScopeMasters';

  constructor(
    private http: HttpClient
  ) { }

  getScopeList() {
    return this.http.get(this.aliasScope);
  }

  addNewScope(data: any) {
    return this.http.post(this.aliasScope, JSON.stringify(data));
  }

  updateScope(data: any) {
    return this.http.put(this.aliasScope + "/" + data.id, JSON.stringify(data));
  }

  deleteScope(data: any) {
    return this.http.delete(this.aliasScope + "/" + data.id);
  }
}
