import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class NotificationService {
    private notification = new Subject();
    public notificationCount = this.notification.asObservable();

    sendData(data: any) {
        this.notification.next(data);
    }

}