import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private mainUrl = environment.baseUrl;
  private taskManagersUrl = this.mainUrl + 'taskmanagers'

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.taskManagersUrl);
  }

  getUsers() {
    return this.http.get(this.mainUrl + 'users');
  }

  getCustomers() {
    return this.http.get(this.mainUrl + 'Customers');
  }

  getScopeList() {
    return this.http.get(this.mainUrl + 'ScopeMasters');
  }

  addTasks(data: any, userIds: any) {
    Date.prototype.toISOString = function () { return moment(this).format("YYYY-MM-DDT00:00:00"); }; //to avoid timezone change
    return this.http.post(this.taskManagersUrl + userIds, JSON.stringify(data));
  }

  updateTasks(data: any, userIds?: any, isCompleted?: boolean, revisionDate?: any) {
    Date.prototype.toISOString = function () { return moment(this).format("YYYY-MM-DDT00:00:00"); }; //to avoid timezone change
    let url = this.taskManagersUrl + "/" + data.id;
    if (userIds) {
      url += userIds;
    }
    if (isCompleted) {
      url += "?isCompleted=" + isCompleted;
      if (revisionDate) {
        url += "&revisionDate=" + moment(revisionDate).format("YYYY-MM-DDT00:00:00");
      }
    }
    else {
      if (revisionDate) {
        url += "?revisionDate=" + moment(revisionDate).format("YYYY-MM-DDT00:00:00");
      }
    }
    return this.http.put(url, JSON.stringify(data));
  }

  deleteTasks(data: any) {
    return this.http.delete(this.taskManagersUrl + "/" + data.id);
  }

  getTaskDetails(taskId: number) {
    return this.http.get(this.taskManagersUrl + "/" + taskId);
  }

  getTaskRevisionList(taskId: number) {
    return this.http.get(this.taskManagersUrl + "/GetTaskRevisionList?taskId=" + taskId);
  }

  getTaskTypes() {
    return this.http.get(this.mainUrl + 'TaskTypes');
  }

  deleteTaskRevision(id: number) {
    return this.http.delete(this.taskManagersUrl + "/DeleteTaskRevision?id=" + id);
  }

}
