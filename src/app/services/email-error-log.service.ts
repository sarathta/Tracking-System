import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailErrorLogService {

  private mainUrl = environment.baseUrl;
  private taskManagersUrl = this.mainUrl + 'EmailErrorLogs'

  constructor(
    private http: HttpClient
  ) { }

  getMailErrorLogList() {
    return this.http.get(this.taskManagersUrl);
  }

  ResendMail(id: number) {
    return this.http.put(this.taskManagersUrl + "/" + id, {});
  }

  deleteMailErrorLog(id: number) {
    return this.http.delete(this.taskManagersUrl + "/" + id, {});
  }
}
