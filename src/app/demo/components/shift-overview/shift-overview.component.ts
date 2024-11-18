import { Component } from '@angular/core';

@Component({
  selector: 'app-shift-overview',
  templateUrl: './shift-overview.component.html',
  styleUrls: ['./shift-overview.component.scss']
})
export class ShiftOverviewComponent {

  plantName: string = 'ABC'; // Example plant name
  currentDateTime: string = ''; // To hold current timestamp
  shiftOverview: string = ''; // Shift information
  private timer: any;

  ngOnInit(): void {
    this.shiftOverview = this.getShiftDetails(); // Set shift details
    this.updateDateTime(); // Initialize date and time
    this.timer = setInterval(() => {
      this.updateDateTime(); // Update timestamp every second
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer); // Clean up timer
    }
  }

  private updateDateTime(): void {
    const now = new Date();
    this.currentDateTime = now.toLocaleString(); // Format: "11/18/2024, 10:45:30 AM"
  }

  private getShiftDetails(): string {
    // Simulate fetching shift details
    return 'Shift A, Operator: Rama Krishna';
  }
}
