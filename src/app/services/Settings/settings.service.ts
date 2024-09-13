import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private mainUrl = environment.baseUrl;
  private taskManagersUrl = this.mainUrl + 'Email'

  constructor(private http: HttpClient) { }

  scheduleStart() {
    return this.http.post(this.taskManagersUrl + "/scheduleEmail",{});
  }

  scheduleStop() {
    return this.http.post(this.taskManagersUrl + "/stopScheduleEmail",{});
  }

}
