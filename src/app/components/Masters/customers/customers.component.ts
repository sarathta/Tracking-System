import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomerService } from '../../../services/Master/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  providers: [ConfirmationService]
})
export class CustomersComponent implements OnInit {
  customersList: any[] = [];
  selectedData: any;
  loading: boolean = false
  showDialog: boolean = false;
  isEdit: boolean = false;
  submitted: boolean = false;
  dialogData: { name: string, description: string } =
    { name: '', description: '' }

  constructor(
    private customerService: CustomerService,
    private confirmationService: ConfirmationService,
    private messages: MessageService
  ) { }

  ngOnInit(): void {
    this.getCustomersList();
  }

  getCustomersList() {
    this.loading = true;
    this.customerService.getCustomerList().subscribe({
      next: (res: any) => {
        this.customersList = res;
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
    this.dialogData = { name: '', description: '' }
    this.showDialog = true;
  }

  showEditDialog() {
    this.isEdit = true;
    this.dialogData = { ...this.selectedData }
    this.showDialog = true;
  }

  addCustomer_Submit() {
    this.submitted = true;
    if (this.validateForm()) {
      this.confirmationService.confirm({
        message: "Are you sure want to add Task?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.customerService.addNewCustomer(this.dialogData).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Success" });
              this.hideDialog();
              this.getCustomersList();
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

  updateCustomer_Submit() {
    this.submitted = true;
    if (this.validateForm()) {
      this.confirmationService.confirm({
        message: "Are you sure want to update?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.customerService.updateCustomer(this.dialogData).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Successfully updated" });
              this.hideDialog();
              this.getCustomersList();
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

  delateCustomer_Submit() {
    this.confirmationService.confirm({
      message: "Are you sure want to delete Task?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.customerService.deleteCustomer(this.selectedData).subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: "Successfully deleted" });
            this.getCustomersList();
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
    this.selectedData = null;
    this.submitted = false;
    this.isEdit = false;
    this.showDialog = false;
  }
}
