import { Component, OnInit } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
<<<<<<< HEAD
import {
  EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,
  AgendaService, View, ResizeService, DragAndDropService, EventRenderedArgs
} from '@syncfusion/ej2-angular-schedule';
=======
import { EventSettingsModel, WeekService, WorkWeekService, MonthService,
  ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
>>>>>>> 2582bc656c521bfb8c068149957d39ab45a4de72
import { scheduleData } from '../datasource';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [WeekService, MonthService, ResizeService, DragAndDropService]
})
export class CalenderComponent implements OnInit {
<<<<<<< HEAD

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

=======
  public selectedDate: Date = new Date(2018, 1, 20);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };
>>>>>>> 2582bc656c521bfb8c068149957d39ab45a4de72

  constructor() { }

  ngOnInit() {
  }

}
