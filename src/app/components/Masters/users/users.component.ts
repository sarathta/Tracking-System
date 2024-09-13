import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/Master/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [ConfirmationService]
})
export class UsersComponent implements OnInit {

  usersList: any[] = [];
  selectedUser: any;
  loading: boolean = false;
  showDialog: boolean = false;
  isEdit: boolean = false;
  submitted: boolean = false;
  dialogData: { code: string, userName: string, password: string, email: string, isAdmin: boolean, isActive: boolean } =
    { code: '', userName: '', password: '', email: '', isAdmin: false, isActive: false }
  emailError: boolean = false;

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messages: MessageService
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.loading = true;
    this.usersService.getUsersList().subscribe({
      next: (res: any) => {
        this.usersList = res;
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  showAddDialog() {
    this.isEdit = false;
    this.dialogData = { code: '', userName: '', password: '', email: '', isAdmin: false, isActive: false }
    this.showDialog = true;
  }

  showEditDialog() {
    this.isEdit = true;
    this.dialogData = { ...this.selectedUser }
    this.showDialog = true;
  }

  addUser_Submit() {
    this.submitted = true;
    if (this.validateForm()) {
      this.confirmationService.confirm({
        message: "Are you sure want to add Task?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.usersService.addNewUsers(this.dialogData).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Success" });
              this.hideDialog();
              this.getUsersList();
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

  updateUser_Submit() {
    this.submitted = true;
    if (this.validateForm()) {
      this.confirmationService.confirm({
        message: "Are you sure want to update?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.usersService.updateUsers(this.dialogData).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Successfully updated" });
              this.hideDialog();
              this.getUsersList();
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

  delateUser_Submit() {
    this.confirmationService.confirm({
      message: "Are you sure want to delete Task?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.usersService.deleteUsers(this.selectedUser).subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: "Successfully deleted" });
            this.getUsersList();
          },
          error: (err) => {
            console.log(err);
            this.messages.add({ severity: 'error', summary: "Error Occured" });
          }
        });
      }
    });
  }

  validateForm() {
    if (!this.dialogData.code
      || !this.dialogData.userName
      || !this.dialogData.password
      || !this.dialogData.email
    ) {
      return false;
    }
    else {
      const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const result: boolean = expression.test(this.dialogData.email); // true
      if (!result) {
        this.emailError = true;
        return false;
      }
      else {
        this.emailError = false;
      }
      return true;
    }
  }


  hideDialog() {
    this.selectedUser = null;
    this.submitted = false;
    this.isEdit = false;
    this.showDialog = false;
  }
}
