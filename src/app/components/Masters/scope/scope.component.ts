import { ConfirmationService, MessageService } from 'primeng/api';
import { ScopeService } from './../../../services/Master/scope.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scope',
  templateUrl: './scope.component.html',
  styleUrls: ['./scope.component.scss'],
  providers: [ConfirmationService]
})
export class ScopeComponent implements OnInit {
  scopeList: any[] = [];
  selectedData: any;
  loading: boolean = false
  showDialog: boolean = false;
  isEdit: boolean = false;
  submitted: boolean = false;
  dialogData: { name: string } =
    { name: '' }

  constructor(
    private scopeService: ScopeService,
    private confirmationService: ConfirmationService,
    private messages: MessageService
  ) { }


  ngOnInit(): void {
    this.getScopeList();
  }

  getScopeList() {
    this.loading = true;
    this.scopeService.getScopeList().subscribe({
      next: (res: any) => {
        this.scopeList = res;
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
    this.dialogData = { name: '' }
    this.showDialog = true;
  }

  showEditDialog() {
    this.isEdit = true;
    this.dialogData = { ...this.selectedData }
    this.showDialog = true;
  }

  addScope_Submit() {
    this.submitted = true;
    if (this.validateForm()) {
      this.confirmationService.confirm({
        message: "Are you sure want to add Task?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.scopeService.addNewScope(this.dialogData).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Success" });
              this.hideDialog();
              this.getScopeList();
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

  updateScope_Submit() {
    this.submitted = true;
    if (this.validateForm()) {
      this.confirmationService.confirm({
        message: "Are you sure want to update?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.scopeService.updateScope(this.dialogData).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Successfully updated" });
              this.hideDialog();
              this.getScopeList();
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

  delateScope_Submit() {
    this.confirmationService.confirm({
      message: "Are you sure want to delete Task?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.scopeService.deleteScope(this.selectedData).subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: "Successfully deleted" });
            this.getScopeList();
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
    if (!this.dialogData.name) {
      return false;
    }
    return true;
  }


  hideDialog() {
    this.isEdit = false;
    this.submitted = false;
    this.selectedData = null;
    this.showDialog = false;
  }
}
