import { MessageService, ConfirmationService } from 'primeng/api';
import { TaskService } from './../../../services/task.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskStatus_Enum } from 'src/app/enum/taskStatus.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  providers: [ConfirmationService]
})
export class TaskDetailsComponent implements OnInit {

  @Input() set inpTaskId(id: any) {
    if (id > 0) {
      this.taskId = id;
      this.getTaskDetails();
      this.getTaskRevisionList();
    }
  }

  @Output() isAnyUpdation = new EventEmitter();
  today = new Date();
  isEditShow: boolean = false;
  isEdit: boolean = false;
  // submitted: boolean = false;
  // remarks: string = '';
  taskId: number = 0;
  taskDetails: any;
  userPermissions: any;
  contentHeightSub: any;
  contentHeight: string = '71vh'
  reloadRequired: any;
  taskRevisionList: any[] = [];

  updateData: { isCompleted: boolean, remarks: string, dueDate: Date, revisionDate: any }
    = { isCompleted: false, remarks: "", dueDate: new Date(), revisionDate: null }

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messages: MessageService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      this.getTaskDetails();
      this.getTaskRevisionList();
    });
  }

  ngOnInit(): void {
    // this.getTaskDetails();
  }

  editForm() {
    this.isEdit = !this.isEdit
    this.updateData.remarks = this.taskDetails?.remarks;
    this.updateData.dueDate = new Date(this.taskDetails?.dueDate);
  }

  getTaskDetails() {
    if (this.taskId > 0) {
      this.taskService.getTaskDetails(this.taskId).subscribe({
        next: (res: any) => {
          this.taskDetails = res;
          if (this.taskDetails) {
            // this.taskDetails.statusName = this.taskDetails.statusNavigation?.name;
            this.taskDetails.taskUsersName = '';
            this.isEditShow = this.taskDetails?.status == TaskStatus_Enum.Closed ? false : true;
            if (this.taskDetails.taskUsers !== null) {
              this.taskDetails.taskUsers.forEach((item: any) => {
                this.taskDetails.taskUsersName += item.userName + ', '
              });
            }
          }
        },
        error: () => {
          this.messages.add({ severity: 'error', summary: "Error Occured" });
        }
      })
    }
  }

  getTaskRevisionList() {
    if (this.taskId > 0) {
      this.taskService.getTaskRevisionList(this.taskId).subscribe({
        next: (res: any) => {
          this.taskRevisionList = res;
        },
        error: () => {
          this.messages.add({ severity: 'error', summary: "Error Occured" });
        }
      })
    }
  }

  updateSubmit() {
    // this.submitted = true;
    if (this.validateForm()) {
      this.confirmationService.confirm({
        message: "Are you sure want to Update?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          if (this.taskDetails) {
            this.taskDetails.remarks = this.updateData.remarks;
            this.taskDetails.dueDate = this.updateData.dueDate;
          }
          this.taskService.updateTasks(this.taskDetails, null, this.updateData.isCompleted, this.updateData.revisionDate).subscribe({
            next: () => {
              this.isAnyUpdation.emit(true);
              this.messages.add({ severity: 'success', summary: "Successfully Updated" });
              this.cancelEdit();
              this.getTaskDetails();
              this.getTaskRevisionList();
            },
            error: (err) => {
              console.log(err);
              this.messages.add({ severity: 'error', summary: "Error Occured" });
            }
          });
        }
      });
    }
  }

  removeRevisionDate(id: number) {
    this.confirmationService.confirm({
      message: "Are you sure want to delete?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.taskService.deleteTaskRevision(id).subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: "Successfully deleted" });
            this.getTaskRevisionList();
          }
        });
      }
    });
  }

  cancelEdit() {
    this.isEdit = false;
    this.updateData.revisionDate = null;
  }

  validateForm() {
    if (!this.taskId) {
      return false
    }
    return true;
  }
}
