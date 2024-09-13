import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private mainUrl = environment.baseUrl;
  private aliasUser = this.mainUrl + 'Users';

  constructor(
    private http: HttpClient
  ) { }

  getUsersList() {
    return this.http.get(this.aliasUser);
  }

  addNewUsers(data: any) {
    return this.http.post(this.aliasUser, JSON.stringify(data));
  }

  updateUsers(data: any) {
    return this.http.put(this.aliasUser + "/" + data.id, JSON.stringify(data));
  }

  deleteUsers(data: any) {
    return this.http.delete(this.aliasUser + "/" + data.id);
  }
}
