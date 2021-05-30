import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { startOfDay, toISODateString } from 'projects/calendar/src/lib/date-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly today = startOfDay(new Date());

  firstDayOfWeekControl = new FormControl('');
  localeControl = new FormControl('');
  minControl = new FormControl(toISODateString(new Date()));
  dateControl = new FormControl();
  datepickerControl = new FormControl();
  datepickerControl1 = new FormControl();
  disabledControl = new FormControl(false);
  numberOfMonthsControl = new FormControl(1);
  monthAndYearFormatControl = new FormControl();
  firstMonthControl = new FormControl();

  demoFormGroup = new FormGroup({
    firstDayOfWeek: this.firstDayOfWeekControl,
    locale: this.localeControl,
    min: this.minControl,
    date: this.dateControl,
    disabled: this.disabledControl,
    numberOfMonths: this.numberOfMonthsControl,
    monthAndYearFormat: this.monthAndYearFormatControl,
    firstMonth: this.firstMonthControl,
  });

  minDate$ = this.minControl.valueChanges.pipe(
    startWith(this.minControl.value),
    distinctUntilChanged(),
    map(isoDate => startOfDay(new Date(isoDate)))
  );

  firstMonth$ = this.firstMonthControl.valueChanges.pipe(
    distinctUntilChanged(),
    map(isoDate => new Date(isoDate))
  );

  constructor() {
    this.disabledControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(disabled => {
      if (disabled) {
        this.dateControl.disable();
      } else {
        this.dateControl.enable();
      }
    });
  }

  selectToday() {
    this.dateControl.setValue(this.today);
  }
}
