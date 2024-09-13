import { EmailErrorLogService } from './../../services/email-error-log.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-error-log',
  templateUrl: './mail-error-log.component.html',
  styleUrls: ['./mail-error-log.component.scss'],
  providers: [ConfirmationService]
})
export class MailErrorLogComponent implements OnInit {

  errorLogList: any[] = [];
  selectedRow: any;
  loading: boolean = false;
  showDailog: boolean = false;
  dialogData: any;

  constructor(
    private emailErrorLogService: EmailErrorLogService,
    private confirmationService: ConfirmationService,
    private messages: MessageService
  ) { }

  ngOnInit() {
    this.getEmailErrorLogList();
  }

  getEmailErrorLogList() {
    this.loading = true
    this.emailErrorLogService.getMailErrorLogList().subscribe((res: any) => {
      this.errorLogList = res;
      console.log(this.errorLogList);
      this.loading = false;
    })
  }

  deleteSeledtedData() {
    if (this.selectedRow?.id) {
      this.confirmationService.confirm({
        message: "Are you sure want to delete Task?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.emailErrorLogService.deleteMailErrorLog(this.selectedRow?.id).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Successfully deleted" });
              this.selectedRow = null;
              this.getEmailErrorLogList();
            },
            error: () => {
              this.selectedRow = null;
              this.messages.add({ severity: 'error', summary: "Error Occured" });
            }
          });
        }
      });
    }
  }

  resendEmail() {
    if (this.selectedRow?.id) {
      this.confirmationService.confirm({
        message: "Are you sure want to ReSend This Mail?",
        header: "Confirm",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.emailErrorLogService.ResendMail(this.selectedRow?.id).subscribe({
            next: () => {
              this.messages.add({ severity: 'success', summary: "Successfully Send" });
              this.selectedRow = null;
              this.getEmailErrorLogList();
            },
            error: () => {
              this.selectedRow = null;
              this.messages.add({ severity: 'error', summary: "Error Occured" });
            }
          });
        }
      });
    }
  }

  viewDetails() {
    this.showDailog = true;
    this.dialogData = this.selectedRow.body;
    console.log(this.selectedRow);
  }

  hideDialog() {
    this.showDailog = false;
  }
}
