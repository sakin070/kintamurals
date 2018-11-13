import { Component, OnInit } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import {
  EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,
  AgendaService, View, ResizeService, DragAndDropService, EventRenderedArgs
} from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from '../datasource';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})
export class CalenderComponent implements OnInit {

  public data: Object[] = <Object[]>extend([], scheduleData, null, true);
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';

  oneventRendered(args: EventRenderedArgs): void {
    const categoryColor: string = args.data.CategoryColor as string;
    const category: string = args.data.Description as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {

      args.element.style.backgroundColor = categoryColor;
      if (category.includes('Basketball')) {
        args.element.style.backgroundColor = '#1aaa55';
      }
    }
  }


  constructor() { }

  ngOnInit() {
  }

}
