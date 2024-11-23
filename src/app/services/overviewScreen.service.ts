import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class OverviewScreenService {
    private isOverview = new Subject();
    public overviewData = this.isOverview.asObservable();

    sendData(data: any) {
        this.isOverview.next(data);
    }

}