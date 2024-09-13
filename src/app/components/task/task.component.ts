import { TaskStatus_Enum } from './../../enum/taskStatus.enum';
import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import * as moment from 'moment';
import { MessageService, ConfirmationService } from 'primeng/api';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class TaskComponent implements OnInit {
  tasksList: any[] = [];
  taskDialogData: { id: number; name: string; description: string; typeId: any; categoryId: any; responsibility: number; customerId: number; scopeId: any; dueDate: Date; alertBefore: number; isAlertDaily: boolean; } =
    { id: 0, name: '', description: '', typeId: 0, categoryId: 0, responsibility: 0, customerId: 0, scopeId: 0, dueDate: new Date(), alertBefore: 0, isAlertDaily: false }
  dialogDisplay: boolean = false;
  isAdd: boolean = false;
  isEdit: boolean = false;
  otherUsers: any[] = [];
  selectedTask: any;
  dueDate: any;
  formatedDate = moment(new Date()).format("YYYY-MM-DDT00:00:00");
  today = new Date();
  tommorrow = new Date(this.today.setDate(this.today.getDate() + 1));
  selectedMulti: any[] = [];
  usersList: any[] = [];
  taskUsersList: any[] = [];
  submitted: boolean = false;
  customerList: any[] = [];
  scopeList: any[] = [];
  viewDialog: boolean = false;
  isDetailsUpdated: boolean = false;
  userDataList: any[] = [];
  taskId: number = 0;
  taskStatus = TaskStatus_Enum;

  responsibilityList: any[] = [];
  typesList: any = {}
  typesCategoryList: any[] = [];

  statuses: any[] = [
    { id: 1, name: "created" },
    { id: 2, name: "opened" },
    { id: 3, name: "modified" },
    { id: 4, name: "closed" },
    { id: 5, name: "escalated" },
  ];

  types: any[] = [{ id: 1, code: "Document", value: "document" },
  { id: 2, code: "Purchase", value: "Purchase" }]


  loading: boolean = false;


  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messages: MessageService
  ) { }

  ngOnInit() {
    this.getMasterData();
  }

  getMasterData() {
    this.taskService.getUsers().subscribe((res: any) => {
      this.usersList = res
      this.taskUsersList = res.map((res: any) => {
        return {
          userId: res.id,
          userName: res.userName
        }
      })
    });

    this.getCustomers();
    this.getScopeList();
    this.getTypes();
    this.getTaskList();
  }

  getCustomers() {
    this.taskService.getCustomers().subscribe((res: any) => {
      this.customerList = res;
    })
  }

  getScopeList() {
    this.taskService.getScopeList().subscribe((res: any) => {
      this.scopeList = res;
    })
  }

  getTypes() {
    this.taskService.getTaskTypes().subscribe((res: any) => {
      this.typesList = res;
    });
  }


  onChange(event: any) {
    this.userDataList = this.taskUsersList.filter(res => res.userId !== event.value);
  }

  onTypeChange(event: any) {
    const types: any = this.typesList.find((x: any) => x.id == event);
    if (types) {
      this.typesCategoryList = types.taskCategories;
      if (this.typesCategoryList) {
        this.typesCategoryList.unshift({ "id": 0, "name": "select" });
      }
    }
  }

  getTaskList() {
    this.loading = true;
    setTimeout(() => {
      this.taskService.getTasks().subscribe((result: any) => {
        // result.map((res: any) => {
        //   const type = this.types.find((item: any) => item.id === res.type)
        //   if (type) {
        //     res.typeName = type.code;
        //   }
        //   // const status = this.statuses.find((item: any) => item.id === res.status)
        //   // if (status) {
        //   //   res.statusName = status.name;
        //   // }
        // });
        this.tasksList = result;
        this.loading = false;
      });
    }, 1000);
  }

  addDialog() {
    this.taskDialogData = { id: 0, name: '', description: '', typeId: 0, categoryId: 0, responsibility: 0, customerId: 0, scopeId: 0, dueDate: this.tommorrow, alertBefore: 0, isAlertDaily: false }
    this.isAdd = true;
    this.dialogDisplay = true;
  }

  editDialog() {
    this.isEdit = true;
    this.taskDialogData = { ...this.selectedTask };
    if (this.taskDialogData.responsibility) {
      this.userDataList = this.taskUsersList.filter(res => res.userId !== this.taskDialogData.responsibility);
    }
    if (this.selectedTask?.taskUsers) {
      this.selectedMulti = this.selectedTask?.taskUsers;
    }
    if (this.taskDialogData.dueDate) {
      this.taskDialogData.dueDate = new Date(this.taskDialogData.dueDate);
    }
    if (this.taskDialogData.typeId) {
      this.typesCategoryList = this.typesList.find((x: any) => x.id == this.taskDialogData.typeId).taskCategories;
      if (this.typesCategoryList) {
        this.typesCategoryList.unshift({ "id": 0, "name": "select" });
      }
    }
    this.dialogDisplay = true;
  }

  hideDialog() {
    this.dialogDisplay = false;
    this.isAdd = false;
    this.isEdit = false;
    this.selectedMulti = [];
    this.submitted = false;
    this.selectedTask = null;
    this.userDataList = [];
    this.typesCategoryList = [];
    if (this.isDetailsUpdated) {
      this.getTaskList();
    }
  }

  showDialog(id: number) {
    this.taskId = id;
    this.isDetailsUpdated = false;
    this.viewDialog = true;
  }

  addTask() {
    this.submitted = true;
    let query = '?';
    for (let i = 0; i < this.selectedMulti?.length; i++) {
      query = query + '&userIds=' + this.selectedMulti[i].userId;
    }
    if (this.validateForm()) {
      if (this.selectedMulti?.length) {
        query = query.slice(0, 1) + query.slice(1 + 1);
      }
      this.confirmationService.confirm({
        message: "Are you sure want to add Task?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.taskService.addTasks(this.taskDialogData, query).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Successfully added" });
              this.hideDialog();
              this.getTaskList();
            }
          });
        }
      });
    }
  }

  updateTask() {
    let query = '?';
    for (let i = 0; i < this.selectedMulti?.length; i++) {
      query = query + '&userIds=' + this.selectedMulti[i].userId;
    }
    this.submitted = true;
    if (this.validateForm()) {
      if (this.selectedMulti?.length) {
        query = query.slice(0, 1) + query.slice(1 + 1);
      }
      if (this.taskDialogData) {
        this.confirmationService.confirm({
          message: "Are you sure want to update?",
          header: "Confirm",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            this.taskService.updateTasks(this.taskDialogData, query).subscribe({
              next: () => {
                this.messages.add({ severity: 'success', summary: "Successfully updated" });
                this.hideDialog();
                this.getTaskList();
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
        });
      }
    }
  }

  deleteTask() {
    this.confirmationService.confirm({
      message: "Are you sure want to delete Task?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.taskService.deleteTasks(this.selectedTask).subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: "Successfully deleted" });
            this.getTaskList();
          }
        });
      }
    });
  }

  validateForm() {
    if (this.taskDialogData.typeId === 0) {
      this.taskDialogData.typeId = null;
    }
    if (this.taskDialogData.categoryId === 0) {
      this.taskDialogData.categoryId = null;
    }
    if (this.taskDialogData.scopeId === 0) {
      this.taskDialogData.scopeId = null;
    }
    if (!this.taskDialogData.name || !this.taskDialogData.dueDate || !this.taskDialogData.responsibility) {
      return false;
    }
    return true;
  }

  isDetailUpdation(event: boolean) {
    this.isDetailsUpdated = event;
  }
}
