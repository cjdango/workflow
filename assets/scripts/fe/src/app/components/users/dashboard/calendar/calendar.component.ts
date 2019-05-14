import { Component, OnInit, Input } from '@angular/core';

import * as _ from 'lodash';

import { ServerService } from 'src/app/commons/services/auth/server.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  isCollapsed : boolean;
  firstWeek   : Array<Date>;
  weeks       : Array<Date>;

  private _month       : number;
  private _year        : number;
  private _now         : Date;

  constructor(
    private server: ServerService
  ) {
    this.isCollapsed = true;
    this._now         = this.server.now;
    this._month       = this._now.getMonth();
    this._year        = this._now.getFullYear();
    this.firstWeek    = this._firstWeek;
    this.weeks        = this._weeks;
  }

  ngOnInit() {
  }

  private get _prevMonthLastDate(): Date {
    return new Date(this._year, this._month, 0);
  }

  private get _currMonthFirstDate(): Date {
    return new Date(this._year, this._month, 1);
  }

  private get _currMonthLastDate(): Date {
    return new Date(this._year, this._month + 1, 0);
  }

  /**
   * Get current month's firstweek including prev month's idle dates.
   */
  private get _firstWeek(): Array<Date> {
    const currMonthFirstDateWeekIdx = this._currMonthFirstDate.getDay();
    const prevMonth                 = this._month - 1;
    const prevMonthDatesCount       = currMonthFirstDateWeekIdx;
    const prevMonthDates            = [];

    // Check if the current month's first date is not monday
    // If true, push prev month dates to prevMonthDates array.
    if (currMonthFirstDateWeekIdx !== 0) {
      _.times(prevMonthDatesCount, (idx) => {
        const prevMonthDate = this._prevMonthLastDate.getDate() - idx;
        prevMonthDates.push(new Date(this._year, prevMonth, prevMonthDate));
      });

      // Reverse the array since we started pushing from
      // prevMonthLastDate backwards.
      prevMonthDates.reverse();
    }

    // Combine prev month dates and current month dates
    // then return only the first 7 dates as the first week.
    return [...prevMonthDates, ...this._currMonthDates].slice(0, 7);
  }

  /**
   * Get current month's lastweek including next month's idle dates.
   */
  private get _lastWeek(): Array<Date> {
    const currMonthLastDateWeekIdx = this._currMonthLastDate.getDay();
    const nextMonth                = this._month + 1;
    const nextMonthDatesCount      = 6 - currMonthLastDateWeekIdx;
    const nextMonthDates           = [];

    // Check if the current month's last date is not saturday
    // If true, push next month dates to nextMonthDates array.
    if (currMonthLastDateWeekIdx !== 6) {
      _.times(nextMonthDatesCount, (idx) => {
        const nextMonthDate = idx + 1;
        nextMonthDates.push(new Date(this._year, nextMonth, nextMonthDate));
      });
    }

    // Combine next month dates and current month dates
    // then return only the last 7 dates as the last week.
    return [...this._currMonthDates, ...nextMonthDates].slice(this._currMonthDates.length - 6);
  }

  /**
   * Get current month's dates not including idle dates.
   */
  private get _currMonthDates(): Array<Date> {
    const datesCount = this._currMonthLastDate.getDate();
    const dates      = [];

    // Push current month dates into dates array.
    _.times(datesCount, (idx) => {
      const date = idx + 1;
      dates.push(new Date(this._year, this._month, date));
    });

    return dates;
  }

  /**
   * Get currnent month's dates divided into several weeks
   * 7 dates per week.
   */
  private get _weeks(): Array<Date> {
    const prevMonthShownDate = this._firstWeek.filter(date => date.getMonth() !== this._month);
    const nextMonthShownDate = this._lastWeek.filter(date => date.getMonth() !== this._month);

    return _.chunk([
      ...prevMonthShownDate,
      ...this._currMonthDates,
      ...nextMonthShownDate
    ], 7);
  }

  /**
   * @summary Generate object of css classes for a `date`
   * @param date Insatance of Date;
   * @description Can be use for ngClass directive
   */
  getDateClass(date: Date): {'idleDay': boolean, 'today': boolean} {
    return {
      'idleDay': date.getMonth() !== this._month,
      'today': date.getDate() === this._now.getDate()
    };
  }

  toggleEventForm(popover, date: Date): void {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open({ date, popover });
    }
  }

}
