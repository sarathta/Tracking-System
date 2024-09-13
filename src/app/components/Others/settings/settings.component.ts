import { ConfirmationService, MessageService } from 'primeng/api';
import { SettingsService } from './../../../services/Settings/settings.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from './../../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [ConfirmationService]
})
export class SettingsComponent implements OnInit {

  urlSafe: any;
  hangefireUrl = '';

  constructor(
    public sanitizer: DomSanitizer,
    private settingsService: SettingsService,
    private confirmationService: ConfirmationService,
    private messages: MessageService,
    // private masterDataService: MasterDataService,
  ) { }

  ngOnInit(): void {
    this.hangefireUrl = environment.iframeUrl;
    this.loadIframe();
  }

  loadIframe() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.hangefireUrl);
  }


  scheduleStart() {
    this.confirmationService.confirm({
      message: "Are you sure want to Start?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.settingsService.scheduleStart().subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: "Successfully Started" });
            this.loadIframe();
          },
          error: (err) => {
            console.log(err);
            this.messages.add({ severity: 'error', summary: "Error Occured" });
          }
        });
      }
    });
  }

  scheduleStop() {
    this.confirmationService.confirm({
      message: "Are you sure want to Stop?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.settingsService.scheduleStop().subscribe({
          next: () => {
            this.messages.add({ severity: 'success', summary: "Successfully Started" });
            this.loadIframe();
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
