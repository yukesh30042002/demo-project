import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { CalendarStateService } from '../calendar-state.service';
import {MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  monthsArray: { month: string; days: (number | null)[][] }[] = [];
  currentYear: number = moment().year();
  // currentYear !: number;
  yearString = "April " + this.calendarState.getCurrentYear() + " to " + "March " + (this.calendarState.getCurrentYear()+1) ;

  constructor(private calendarState: CalendarStateService, public dialog : MatDialog) {}

  ngOnInit() {
    // Retrieve the year from the service when the component initializes
    this.currentYear = this.calendarState.getCurrentYear();
    this.monthsArray = this.generateCalendar();
  }

  generateCalendar(): { month: string; days: (number | null)[][] }[] {
    const monthsArray = [];

    // Generate calendar months from April of the current year to March of the next year
    for (let monthOffset = 3; monthOffset < 15; monthOffset++) {
      const monthMoment = moment()
        .month(monthOffset % 12)
        .year(this.currentYear + Math.floor(monthOffset / 12));
      const daysInMonth = monthMoment.daysInMonth();
      const daysArray = [];

      const startDay = (monthMoment.startOf('month').day()+6)%7;
      let weekRow = Array(startDay).fill(null);

      for (let day = 1; day <= daysInMonth; day++) {
        weekRow.push(day);
        if (weekRow.length === 7) {
          daysArray.push(weekRow);
          weekRow = [];
        }
      }

      if (weekRow.length) {
        daysArray.push([...weekRow, ...Array(7 - weekRow.length).fill(null)]);
      }

      monthsArray.push({
        month: monthMoment.format('MMMM'),
        days: daysArray
      });
    }
    return monthsArray;
  }

  next() {
    event?.preventDefault();

    this.forwardChangeYear();

    this.currentYear += 1;
    this.calendarState.setCurrentYear(this.currentYear); // Update year in the service
    this.monthsArray = this.generateCalendar();
  }

  previous() {
    event?.preventDefault();

    this.backwardChangeYear();

    this.currentYear -= 1;
    this.calendarState.setCurrentYear(this.currentYear); // Update year in the service
    this.monthsArray = this.generateCalendar();
  }

  forwardChangeYear(){
    let year = this.calendarState.getCurrentYear();
    this.yearString = "April " + (year+1) + " to " + "March " + (year+2);
  }

  backwardChangeYear(){
    let year = this.calendarState.getCurrentYear();
    this.yearString = "April " + (year-1) + " to " + "March " + (year);
  }

  openDialog(){
    this.dialog.open(DialogComponent);
  }
}
