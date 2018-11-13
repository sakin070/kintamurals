import { Component, OnInit, NgModule, NgTi } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,
  AgendaService, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';
import { scheduleData } from '../datasource';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService]
})

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})

export class CalenderComponent implements OnInit {
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: <Object[]>extend([], scheduleData, null, true) };

  constructor() { }

  ngOnInit() {
  }

  addNewEvent(form){
    var startTime = new Date(form.value.date);
    var sTime = form.value.sTime.split(":");
    startTime.setHours(sTime[0]);
    startTime.setMinutes(sTime[1]);

    var endTime = new Date(form.value.date);
    var eTime = form.value.eTime.split(":");
    endTime.setHours(eTime[0]);
    endTime.setMinutes(eTime[1]);

    var event = {
      Id: scheduleData[scheduleData.length-1]['Id']+1,
      Subject: form.value.eventName,
      StartTime: startTime,
      EndTime: endTime
    };
    console.log(scheduleData[scheduleData.length-1]);
    scheduleData.push(event);
    console.log(scheduleData[scheduleData.length-1]);



  }


}
