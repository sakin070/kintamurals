import { Component, OnInit, NgModule } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,
  AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from '../datasource';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule.forRoot()
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    
  ]
})


export class CalenderComponent implements OnInit {
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };

  constructor() { }

  ngOnInit() {
  }

  addAnEventDialog(){

  }

}
