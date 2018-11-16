import { Component, OnInit, NgModule } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,
  AgendaService, View, ResizeService, DragAndDropService, EventRenderedArgs, Schedule } from '@syncfusion/ej2-angular-schedule';

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
  public categoryList=[];
  public categories = [
   {name: 'Basketball', typeList:['Basketball', 'Soccer', 'Chess']},
   {name: 'Soccer', typeList: ['PingPong']},
   {name: 'Damn', typeList: ['AA']},
   {name: 'Daniel', typeList: ["Puzzles", "Scrabble"]},
   {name: 'Kintramurals', typeList: ["Yoga", "Cardio"]},
 ];
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
    if(form.value.sTime!=null){
      var sTime = form.value.sTime.split(":");
      startTime.setHours(sTime[0]);
      startTime.setMinutes(sTime[1]);
    }

    var endTime = new Date(form.value.date);
    if(form.value.eTime!=null){
      var eTime = form.value.eTime.split(":");
      endTime.setHours(eTime[0]);
      endTime.setMinutes(eTime[1]);
    }

    var event = {
      Id: scheduleData[scheduleData.length-1]['Id']+1,
      Subject: form.value.eventName,
      StartTime: startTime,
      EndTime: endTime,
      Description: 'Category: Basketball <br/> Participants: Saheed, vee'
    };
    //console.log(scheduleData[scheduleData.length-1]);
    this.data.push(event);
    //console.log(event);
    this.currentFilter = '';
    this.filteredData();
    // this.eventSettings = { dataSource: this.data };
    //console.log(scheduleData[scheduleData.length-1]);



  }

  exportOutlook(form):void {
    var fileText = '';
    var eventName;
    var sDate;
    var eDate;
    var location;
    var fileText = "";
    var events = this.eventSettings.dataSource as Array<Schedule>;
    console.log("test\n");
    console.log(events);

    for(var i = 0, len = events.length; i < len; i++) {
      if(events[i]['Subject'] === form.value.eventName) {
        eventName = events[i]['Subject'];
        sDate = this.formatDate(events[i]['StartTime']);
        eDate = this.formatDate(events[i]['EndTime']);
        location = events[i]['Location'];
        
        fileText = this.getIcsCalendar(eventName, sDate, eDate, location);
        this.saveTextAsFile(fileText, eventName + '.ics');

        return;
      }
    }
    alert("Could not find specified event. Please enter a different one.");
  }

  private formatDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //[Day of the week, Month, Day, Year, HH:MM:SS]
    date = date.toString().split(" ", 5);
  
    //year
    var newDate = date[3];

    //month
    var monthIndex = (months.findIndex((month)=> {
      return month == date[1];
    })) + 1;
    if (monthIndex < 10) {
      newDate += "0" + monthIndex;
    }
    else {
      newDate += monthIndex;
    }
    
    //day
    if (date[2] < 10) {
      newDate += "0" + date[2];
    }
    else {
      newDate += date[2];
    }

    //time
    var time = date[4].replace(/:/gi, "");
    newDate += "T" + time; 

    //YYYYMMDDTHHMMSS
    return newDate;
  }

  private getIcsCalendar(eventName, sDate, eDate, location) {
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'CLASS:PUBLIC',
      'DTSTART:' + sDate,
      'DTEND:' + eDate,
      'LOCATION:' + location,
      'SUMMARY:' + eventName,
      'TRANSP:TRANSPARENT',
      'END:VEVENT',
      'END:VCALENDAR',
      'UID:' + this.getUid(),
      'PRODID:angular-addtocalendar'
    ].join('\n');
  }

  private getUid() {
    return Math.random().toString(36).substr(2);
  }

  private saveTextAsFile (data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    var blob = new Blob([data], {type: 'text/plain'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else{
      var e = document.createEvent('MouseEvents'),
          a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click');
      a.dispatchEvent(e);
    }
  }


}
