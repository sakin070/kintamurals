import { Component, OnInit, NgModule } from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService,
  AgendaService, View, ResizeService, DragAndDropService, EventRenderedArgs, Schedule} from '@syncfusion/ej2-angular-schedule';

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
  public selectedDate: Date = new Date();
  public startHour: string = '07:30';
  public endHour: string = '19:30';
  public eventSettings: EventSettingsModel = { dataSource: scheduleData };
  public currentView: View = 'Week';
  filter = 'Basketball';
  currentFilter = '';
  public categoryList=[];
  public categories = [{name:'All'},
   {name: 'Basketball', colour: '#1aaa55'},
   {name: 'Soccer', colour:'#f57f17'},
   {name: 'Fitness', colour: '#7fa900'},
   {name: 'Kinaxis Training', colour:'#ea7a57'},
   {name: 'Kinaxis Classes', colour:'#00bdae'}
  ];
  oneventRendered(args: EventRenderedArgs): void {
    console.log(scheduleData.length);
    console.log(this.eventSettings.dataSource);
    const categoryColor: string = args.data.CategoryColor as string;
    const category: string = args.data.Description as string;
    if (!args.element || !categoryColor) {
      return;
    }
    args.element.style.backgroundColor = categoryColor;
    // if (this.currentView === 'Agenda') {
    //   (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    // } else {
    //
    //   args.element.style.backgroundColor = categoryColor;
    //   if (category.includes(this.filter)) {
    //     args.element.style.backgroundColor = '#1aaa55';
    //   }
    // }

  }

  refreshCalendar() {
      this.newData = <Object[]> [];
      for (let i = 0; i < this.data.length ; i++) {
        this.newData.push(this.data[i]);
      }
      this.eventSettings = { dataSource: this.newData };
  }

  compareDate(date, ddate):boolean{
    if(isNaN(date.getDate())){
      return true;
    }
    if((date.getFullYear() == ddate.getFullYear()) && (date.getMonth() == ddate.getMonth()) && ((date.getDate() == ddate.getDate()))){
      return true;
    }
    return false;
  }

  compareCategory(category, dcategory):boolean{
    console.log(category);
    if(dcategory.includes(category) || category == 'All'){
      return true;
    }
    return false;
  }

  compareParticipants(participants, dparticipants){
    if(dparticipants.includes(participants) || participants == undefined){
      return true;
    }
    return false;
  }

  searchFilterData(form){
    this.eventSettings = {dataSource: this.data};
    this.newData = <Object[]> [];
    var date = form.value.dateFilter;
    var category = form.value.filterEventType;
    var participant = form.value.participantsFilter;
    var eventList=this.eventSettings.dataSource as Array<Schedule>;
    console.log(participant);
    var filterDate = new Date(date);
    filterDate.setDate(filterDate.getDate()+1);
    for (let i = 0; i < eventList.length ; i++) {
      if(this.compareDate(filterDate, eventList[i]['StartTime']) && this.compareCategory(category, eventList[i]['Description'])
      && this.compareParticipants(participant, eventList[i]['Description'])){
        this.newData.push(this.data[i]);
      }
    }
    this.eventSettings = { dataSource: this.newData };

  }

  constructor() { }

  ngOnInit() {
  }

  addNewEvent(form):void {
    var startTime = new Date(form.value.date);
    var categoryValue = form.value.Category;
    if(form.value.sTime!=null){
      var sTime = form.value.sTime.split(":");
      startTime.setDate(startTime.getDate()+1);
      startTime.setHours(sTime[0]);
      startTime.setMinutes(sTime[1]);
    }

    var endTime = new Date(form.value.date);
    var colorCode = 'a';
    if(form.value.eTime!=null){
      var eTime = form.value.eTime.split(":");
      endTime.setDate(endTime.getDate()+1);
      endTime.setHours(eTime[0]);
      endTime.setMinutes(eTime[1]);
    }
    if(categoryValue != undefined || categoryValue.toLowerCase() != "all"){
      colorCode = this.assignColour(categoryValue.toLowerCase());
    }

    var descriptionString;
    var event = {
      Id: scheduleData[scheduleData.length-1]['Id']+1,
      Subject: form.value.eventName,
      StartTime: startTime,
      EndTime: endTime,
      Description: 'Category: Basketball <br/> Participants: Saheed, vee',
      CategoryColor: colorCode
    };

    this.data.push(event);
    this.refreshCalendar();

  }
  assignColour(categoryName):string{
    var categoryPos = (this.categories).map(function(x) {return x.name.toLowerCase() }).indexOf(categoryName);
    console.log(categoryPos);
    var returnColour = this.categories[categoryPos].colour;
    return returnColour;
  }

  exportOutlook(form):void {
    var fileText = '';
    var eventName;
    var sDate;
    var eDate;
    var location;
    var description;
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
        description = events[i]['Description'];
        
        fileText = this.getIcsCalendar(eventName, sDate, eDate, location,description);
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

  private getIcsCalendar(eventName, sDate, eDate, location, description) {
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      'CLASS:PUBLIC',
      'DTSTART:' + sDate,
      'DTEND:' + eDate,
      'LOCATION:' + location,
      'SUMMARY:' + eventName,
      'DESCRIPTION:' + description,
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
