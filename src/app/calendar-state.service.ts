import { Injectable } from '@angular/core';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CalendarStateService {
  private year: number = moment().year(); // Initialize with the current year

  getCurrentYear(): number {
    return this.year;
  }

  setCurrentYear(year: number): void {
    this.year = year; // Update the year in the service
  }
}
