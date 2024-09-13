import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private mainUrl = environment.baseUrl;
  private aliasCustomers = this.mainUrl + 'Customers';

  constructor(
    private http: HttpClient
  ) { }

  getCustomerList() {
    return this.http.get(this.aliasCustomers);
  }

  addNewCustomer(data: any) {
    return this.http.post(this.aliasCustomers, JSON.stringify(data));
  }

  updateCustomer(data: any) {
    return this.http.put(this.aliasCustomers + "/" + data.id, JSON.stringify(data));
  }

  deleteCustomer(data: any) {
    return this.http.delete(this.aliasCustomers + "/" + data.id);
  }
}