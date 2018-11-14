import { Component, OnInit, NgModule } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,
  AgendaService, View, ResizeService, DragAndDropService, EventRenderedArgs } from '@syncfusion/ej2-angular-schedule';

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
  providers: [WeekService, MonthService, ResizeService, DragAndDropService]
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
  public data: Object[] = <Object[]>extend([], scheduleData, null, true);
  newData: Object[] = <Object[]> [];
  public selectedDate: Date = new Date(2018, 1, 15);
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';
  filter = 'Basketball';
  currentFilter = '';

  oneventRendered(args: EventRenderedArgs): void {
    console.log(this.eventSettings.dataSource);
    const categoryColor: string = args.data.CategoryColor as string;
    const category: string = args.data.Description as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {

      args.element.style.backgroundColor = categoryColor;
      if (category.includes(this.filter)) {
        args.element.style.backgroundColor = '#1aaa55';
      }
    }
    this.filteredData();
  }

  filteredData() {
    if (this.currentFilter !== this.filter) {
      this.newData = <Object[]> [];
      for (let i = 0; i < this.data.length ; i++) {
        // @ts-ignore
        const currentData = this.data[i].Description;
        if (currentData.includes(this.filter)) {
          this.newData.push(this.data[i]);
        }
      }
      this.eventSettings = { dataSource: this.newData };
      this.currentFilter = this.filter;
    }

  }


  constructor() { }

  ngOnInit() {
  }

  addNewEvent(form):void {
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
      EndTime: endTime,
      Description: 'Category: Basketball <br/> Participants: Saheed, vee'
    };
    console.log(scheduleData[scheduleData.length-1]);
    this.data.push(event);
    console.log(event);
    this.currentFilter = '';
    this.filteredData();
    // this.eventSettings = { dataSource: this.data };
    console.log(scheduleData[scheduleData.length-1]);



  }


}
