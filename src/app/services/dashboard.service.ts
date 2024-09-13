import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private mainUrl = environment.baseUrl;
  private dashboardUrl = this.mainUrl + 'Dashboard'

  constructor(private http: HttpClient) { }

  getDashboardData(){
    return this.http.get(this.dashboardUrl + '/GetDashboardData');
  }

  getRecentTasks(){
    return this.http.get(this.dashboardUrl + '/GetRecentTasks');
  }

  getCustomerWiseOverview(){
    return this.http.get(this.dashboardUrl + '/GetCustWiseOverview');
  }

  getDashboardNotifications(){
    return this.http.get(this.dashboardUrl + '/GetDashNotification');
  }

  getDashboardChartData(){
    return this.http.get(this.dashboardUrl + '/GetDashboardChart')
  }

}
