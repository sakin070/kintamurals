import { Component, OnInit } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, WeekService, MonthService,
  ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from '../datasource';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [WeekService, MonthService, ResizeService, DragAndDropService]
})
export class CalenderComponent implements OnInit {
  public selectedDate: Date = new Date(2018, 1, 20);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };

  constructor() { }

  ngOnInit() {
  }

}
