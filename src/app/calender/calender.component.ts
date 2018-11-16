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
  public startHour: string = '08:00';
  public endHour: string = '18:00';
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  public currentView: View = 'Week';
  filter = 'Basketball';
  currentFilter = '';
  public categoryList=[];
  public categories = [{name:'All'},
   {name: 'Basketball', typeList:['Basketball', 'Soccer', 'Chess']},
   {name: 'Soccer', typeList: ['PingPong']},
   {name: 'Damn', typeList: ['AA']},
   {name: 'Daniel', typeList: ["Puzzles", "Scrabble"]},
   {name: 'Kintramurals', typeList: ["Yoga", "Cardio"]},
  ];

  public participantList=[];
  public participants = [
    {name: 'acrozman@kinaxis.com', typeList:['Aaron']},
    {name: 'asabean@kinaxis.com', typeList:['Abby']},
    {name: 'akabani@kinaxis.com', typeList:['Abdul Rehman']},
    {name: 'apandya@kinaxis.com', typeList:['Abhishek']},
    {name: 'accountspayable@kinaxis.com', typeList:['Accounts']},
    {name: 'aellis@kinaxis.com', typeList:['Adam']},
    {name: 'ayusuf@kinaxis.com', typeList:['Adam']},
    {name: 'achoudhry@kinaxis.com', typeList:['Ahsen']},
    {name: 'aadeghe@kinaxis.com', typeList:['Aisosa']},
    {name: 'agrewal@kinaxis.com', typeList:['Ajaydeep']},
    {name: 'asharma@kinaxis.com', typeList:['Akanksha']},
    {name: 'amahmud@kinaxis.com', typeList:['Akib']},
    {name: 'c-akamegaya@kinaxis.com', typeList:['Akira']},
    {name: 'amummigatti@kinaxis.com', typeList:['Akshatha']},
    {name: 'agupta@kinaxis.com', typeList:['Aldeep']},
    {name: 'anajera@kinaxis.com', typeList:['Alejandro']},
    {name: 'mon-alerts@kinaxis.com', typeList:['Alerts']},
    {name: 'abisaillion@kinaxis.com', typeList:['Alex']},
    {name: 'afitzpatrick@kinaxis.com', typeList:['Alex']},
    {name: 'AMorrison@kinaxis.com', typeList:['Alex']},
    {name: 'azafiropoulos@kinaxis.com', typeList:['Alex']},
    {name: 'acheater@kinaxis.com', typeList:['Alexa']},
    {name: 'amaxwell@kinaxis.com', typeList:['Alexander']},
    {name: 'avetrov@kinaxis.com', typeList:['Alexander']},
    {name: 'aerlihman@kinaxis.com', typeList:['Alexandra']},
    {name: 'arotenberg@kinaxis.com', typeList:['Alexis']},
    {name: 'aryan@kinaxis.com', typeList:['Alfonso']},
    {name: 'aasgari@kinaxis.com', typeList:['Ali']},
    {name: 'anejad@kinaxis.com', typeList:['Alireza']},
    {name: 'ateimoori@kinaxis.com', typeList:['Alireza']},
    {name: 'acrawford@kinaxis.com', typeList:['Alison']},
    {name: 'aproulx@kinaxis.com', typeList:['Alison']},
    {name: 'ayogasingam@kinaxis.com', typeList:['Allan']},
    {name: 'afernandez@kinaxis.com', typeList:['Alvaro']},
    {name: 'c-avo@kinaxis.com', typeList:['Amanda']},
    {name: 'amclellan@kinaxis.com', typeList:['Amelia']},
    {name: 'alejarazu@kinaxis.com', typeList:['America']},
    {name: 'alewis@kinaxis.com', typeList:['Amy']},
    {name: 'ahuynh@kinaxis.com', typeList:['An']},
    {name: 'c-asundaresan@kinaxis.com', typeList:['Anand']},
    {name: 'adukelow@kinaxis.com', typeList:['Andrea']},
    {name: 'athomason@kinaxis.com', typeList:['Andrea']},
    {name: 'aanisenia@kinaxis.com', typeList:['Andrei']},
    {name: 'apivkine@kinaxis.com', typeList:['Andrei']},
    {name: 'abell@kinaxis.com', typeList:['Andrew']},
    {name: 'adunbar@kinaxis.com', typeList:['Andrew']},
    {name: 'ahynes@kinaxis.com', typeList:['Andrew']},
    {name: 'amacneil@kinaxis.com', typeList:['Andrew']},
    {name: 'amcdonald@kinaxis.com', typeList:['Andrew']},
    {name: 'amoore@kinaxis.com', typeList:['Andrew']},
    {name: 'aolson@kinaxis.com', typeList:['Andrew']},
    {name: 'asherk@kinaxis.com', typeList:['Andrew']},
    {name: 'azeitz@kinaxis.com', typeList:['Andrew']},
    {name: 'aosadca@kinaxis.com', typeList:['Andy']},
    {name: 'c-agabe@kinaxis.com', typeList:['Andy']},
    {name: 'aadams@kinaxis.com', typeList:['Angela']},
    {name: 'ajones@kinaxis.com', typeList:['Angela']},
    {name: 'alin@kinaxis.com', typeList:['Angela']},
    {name: 'amartins@kinaxis.com', typeList:['Angelo']},
    {name: 'ahon@kinaxis.com', typeList:['Angie']},
    {name: 'aakai@kinaxis.com', typeList:['Aniekan']},
    {name: 'abathini@kinaxis.com', typeList:['Anirudh']},
    {name: 'asood@kinaxis.com', typeList:['Ankkita']},
    {name: 'aevstafyeva@kinaxis.com', typeList:['Anna']},
    {name: 'amahajan@kinaxis.com', typeList:['Anshul']},
    {name: 'c-apisaturo@kinaxis.com', typeList:['Antonio']},
    {name: 'adahiya@kinaxis.com', typeList:['Anurag']},
    {name: 'c-ali@kinaxis.com', typeList:['Apple']},
    {name: 'ataucer@kinaxis.com', typeList:['Armando']},
    {name: 'c-asamykannu@kinaxis.com', typeList:['Arul']},
    {name: 'c-aramanathan@kinaxis.com', typeList:['Arun']},
    {name: 'aponugumati@kinaxis.com', typeList:['Ashok']},
    {name: 'alangley@kinaxis.com', typeList:['Ashton']},
    {name: 'aadhikari@kinaxis.com', typeList:['Astha']},
    {name: 'aaristama@kinaxis.com', typeList:['Aswin']},
    {name: 'amuraoka@kinaxis.com', typeList:['Atsushi']},
    {name: 'c-achivukula@kinaxis.com', typeList:['Avinash']},
    {name: 'c-aramandha@kinaxis.com', typeList:['Avinash']},
    {name: 'bncwana@kinaxis.com', typeList:['Bafana']},
    {name: 'bbalakumar@kinaxis.com', typeList:['Bala']},
    {name: 'bpei@kinaxis.com', typeList:['Baoqing']},
    {name: 'bschulman@kinaxis.com', typeList:['Bart']},
    {name: 'bramadhan@kinaxis.com', typeList:['Basim']},
    {name: 'bhajisoleimani@kinaxis.com', typeList:['Behrouz']},
    {name: 'bthomas@kinaxis.com', typeList:['Belinda']},
    {name: 'bwilkins@kinaxis.com', typeList:['Benjamin']},
    {name: 'bweigand@kinaxis.com', typeList:['Bernadette']},
    {name: 'BDubois@kinaxis.com', typeList:['Bill']},
    {name: 'bmahoney@kinaxis.com', typeList:['Bill']},
    {name: 'bthorton@kinaxis.com', typeList:['Billy Bob3']},
    {name: 'bxie@kinaxis.com', typeList:['Bin']},
    {name: 'bzhang@kinaxis.com', typeList:['Bin']},
    {name: 'BWalsh@kinaxis.com', typeList:['Blaine']},
    {name: 'RHauser@kinaxis.com', typeList:['Bob']},
    {name: 'bxue@kinaxis.com', typeList:['Bowen']},
    {name: 'bpizzati@kinaxis.com', typeList:['Brad']},
    {name: 'bcowie@kinaxis.com', typeList:['Brendan']},
    {name: 'bfurman@kinaxis.com', typeList:['Brian']},
    {name: 'bniebrzydowski@kinaxis.com', typeList:['Brian']},
    {name: 'bbenard@kinaxis.com', typeList:['Brigitte']},
    {name: 'c-cwoodbury@kinaxis.com', typeList:['Calvin']},
    {name: 'chumplik@kinaxis.com', typeList:['Carmen']},
    {name: 'cpatterson@kinaxis.com', typeList:['Carol']},
    {name: 'ctoomey@kinaxis.com', typeList:['Carolyn']},
    {name: 'casereplies@kinaxis.com', typeList:['Case']},
    {name: 'cbigelow@kinaxis.com', typeList:['Casey']},
    {name: 'cdobson@kinaxis.com', typeList:['Cassandra']},
    {name: 'cmcdonald@kinaxis.com', typeList:['Cathy']},
    {name: 'c-cholliday@kinaxis.com', typeList:['Chad']},
    {name: 'cbissonkrol@kinaxis.com', typeList:['Chantal']},
    {name: 'cwehlage@kinaxis.com', typeList:['Charles']},
    {name: 'crawal@kinaxis.com', typeList:['Charmi']},
    {name: 'cojukwu@kinaxis.com', typeList:['Chiedozie']},
    {name: 'CHarrison@kinaxis.com', typeList:['Chris']},
    {name: 'colson@kinaxis.com', typeList:['Chris']},
    {name: 'cmeerman@kinaxis.com', typeList:['Christiaan']},
    {name: 'csobb@kinaxis.com', typeList:['Christian']},
    {name: 'cfulford@kinaxis.com', typeList:['Christine']},
    {name: 'cburt@kinaxis.com', typeList:['Christopher']},
    {name: 'cmilner@kinaxis.com', typeList:['Claire']},
    {name: 'cchapman@kinaxis.com', typeList:['Clint']},
    {name: 'cphelan@kinaxis.com', typeList:['Colm']},
    {name: 'cmandala@kinaxis.com', typeList:['Conrad']},
    {name: 'cmacrae@kinaxis.com', typeList:['Courtney']},
    {name: 'cpitala@kinaxis.com', typeList:['Craig']},
    {name: 'CWest@kinaxis.com', typeList:['Craig']},
    {name: 'cbantudinu@kinaxis.com', typeList:['Cristina']},
    {name: 'dburnett@kinaxis.com', typeList:['Dale']},
    {name: 'dhudson@kinaxis.com', typeList:['Dale']},
    {name: 'c-dbertrand@kinaxis.com', typeList:['Dan']},
    {name: 'dhenshall@kinaxis.com', typeList:['Dane']},
    {name: 'dfischer@kinaxis.com', typeList:['Daniel']},
    {name: 'dkaratosic@kinaxis.com', typeList:['Daniel']},
    {name: 'dnowicki@kinaxis.com', typeList:['Daniel']},
    {name: 'dmcneiltaylor@kinaxis.com', typeList:['Danielle']},
    {name: 'dburns@kinaxis.com', typeList:['Darren']},
    {name: 'dneadow@kinaxis.com', typeList:['Daryn']},
    {name: 'ddennis@kinaxis.com', typeList:['Dave']},
    {name: 'daddison@kinaxis.com', typeList:['David']},
    {name: 'dbeckham@kinaxis.com', typeList:['David']},
    {name: 'dcoffey@kinaxis.com', typeList:['David']},
    {name: 'ddawkins@kinaxis.com', typeList:['David']},
    {name: 'dkelly@kinaxis.com', typeList:['David']},
    {name: 'dloignon@kinaxis.com', typeList:['David']},
    {name: 'dplatt@kinaxis.com', typeList:['David']},
    {name: 'dyoung@kinaxis.com', typeList:['David']},
    {name: 'ddong@kinaxis.com', typeList:['Davina']},
    {name: 'dbaley@kinaxis.com', typeList:['Debbie']},
    {name: 'ddiokno@kinaxis.com', typeList:['Deborah']},
    {name: 'dgann@kinaxis.com', typeList:['Deborah']},
    {name: 'devservicedesk@kinaxis.com', typeList:['Dev']},
    {name: 'dcumarasamy@kinaxis.com', typeList:['Devaroobini']},
    {name: 'dclaremont@kinaxis.com', typeList:['Dillon']},
    {name: 'dthomas@kinaxis.com', typeList:['Dominic']},
    {name: 'dcalhoun@kinaxis.com', typeList:['Don']},
    {name: 'dnicholson@kinaxis.com', typeList:['Drewan']},
    {name: 'DKlett@kinaxis.com', typeList:['Duncan']},
    {name: 'dellicott@kinaxis.com', typeList:['Dylan']},
    {name: 'erivero@kinaxis.com', typeList:['Eduardo']},
    {name: 'erobbins@kinaxis.com', typeList:['Edward']},
    {name: 'eakpoguma@kinaxis.com', typeList:['Efetobore']},
    {name: 'ekono@kinaxis.com', typeList:['Eiichiro']},
    {name: 'c-ktanaka@kinaxis.com', typeList:['Eiji']},
    {name: 'ekonik@kinaxis.com', typeList:['Elena']},
    {name: 'egarcia@kinaxis.com', typeList:['Elias']},
    {name: 'erassi@kinaxis.com', typeList:['Elias']},
    {name: 'edornor@kinaxis.com', typeList:['Elikplim']},
    {name: 'ekilgour@kinaxis.com', typeList:['Elizabeth']},
    {name: 'c-emandelman@kinaxis.com', typeList:['Elliott']},
    {name: 'echaiban@kinaxis.com', typeList:['Emile']},
    {name: 'emichaud@kinaxis.com', typeList:['Emilia']},
    {name: 'efisk@kinaxis.com', typeList:['Emily']},
    {name: 'emohns@kinaxis.com', typeList:['Emma']},
    {name: 'eyuksel@kinaxis.com', typeList:['Erdi']},
    {name: 'c-elambert@kinaxis.com', typeList:['Eric']},
    {name: 'ehaveman@kinaxis.com', typeList:['Eric']},
    {name: 'etran@kinaxis.com', typeList:['Eric']},
    {name: 'ebutler@kinaxis.com', typeList:['Erika']},
    {name: 'elenchitsky@kinaxis.com', typeList:['Evgeny']},
    {name: 'fortiz@kinaxis.com', typeList:['Fabiana']},
    {name: 'fchamseddine@kinaxis.com', typeList:['Fadel']},
    {name: 'fdejene@kinaxis.com', typeList:['Fekadeab']},
    {name: 'fvanniekerk@kinaxis.com', typeList:['Fergus']},
    {name: 'fakhibi@kinaxis.com', typeList:['Fitzgerald']},
    {name: 'fho@kinaxis.com', typeList:['Francis']},
    {name: 'flugochico@kinaxis.com', typeList:['Francisco']},
    {name: 'c-fnotarangelo@kinaxis.com', typeList:['Frank']},
    {name: 'fdingxu@kinaxis.com', typeList:['Frank']},
    {name: 'fgordon@kinaxis.com', typeList:['Fraser']},
    {name: 'fironside@kinaxis.com', typeList:['Fraser']},
    {name: 'gmartin@kinaxis.com', typeList:['Gabriel']},
    {name: 'c-gnema@kinaxis.com', typeList:['Gagan']},
    {name: 'c-gburns@kinaxis.com', typeList:['Gary']},
    {name: 'ggallant@kinaxis.com', typeList:['Gaston']},
    {name: 'gkarker@kinaxis.com', typeList:['Gaurav']},
    {name: 'GTicala@kinaxis.com', typeList:['Gelu']},
    {name: 'grodriguez@kinaxis.com', typeList:['Gerardo']},
    {name: 'GBrownlee@kinaxis.com', typeList:['Gerry']},
    {name: 'glahiani@kinaxis.com', typeList:['Ghazi']},
    {name: 'c-gsathyanarayana@kinaxis.com', typeList:['Giridhar']},
    {name: 'grobertson@kinaxis.com', typeList:['Gisele']},
    {name: 'c-gbelle@kinaxis.com', typeList:['Giselle']},
    {name: 'gbrown@kinaxis.com', typeList:['Glen']},
    {name: 'gmakwana@kinaxis.com', typeList:['Gopi']},
    {name: 'gcavell@kinaxis.com', typeList:['Gordon']},
    {name: 'gtandon@kinaxis.com', typeList:['Gozde']},
    {name: 'gwalker@kinaxis.com', typeList:['Graeme']},
    {name: 'gandrews@kinaxis.com', typeList:['Graham']},
    {name: 'gdoyle@kinaxis.com', typeList:['Greg']},
    {name: 'gfarnsworth@kinaxis.com', typeList:['Greg']},
    {name: 'gmorrison@kinaxis.com', typeList:['Griz']},
    {name: 'gtang@kinaxis.com', typeList:['Guang']},
    {name: 'gjosan@kinaxis.com', typeList:['Gulshan Preet Ka']},
    {name: 'gzhang@kinaxis.com', typeList:['Guoqing']},
    {name: 'hzhao@kinaxis.com', typeList:['Han Chao']},
    {name: 'c-hharan@kinaxis.com', typeList:['Hari']},
    {name: 'hiyer@kinaxis.com', typeList:['Harish']},
    {name: 'hdhillon@kinaxis.com', typeList:['Harmol']},
    {name: 'hsingh@kinaxis.com', typeList:['Harveer']},
    {name: 'hbaig@kinaxis.com', typeList:['Hasan']},
    {name: 'hirwin@kinaxis.com', typeList:['Heather']},
    {name: 'hlandry@kinaxis.com', typeList:['Heather']},
    {name: 'hmccauley@kinaxis.com', typeList:['Heather']},
    {name: 'hsmith@kinaxis.com', typeList:['Hillary']},
    {name: 'hkeekani@kinaxis.com', typeList:['Himalay']},
    {name: 'hdam@kinaxis.com', typeList:['Hoang']},
    {name: 'c-hralphormsby@kinaxis.com', typeList:['Holly']},
    {name: 'HPham@kinaxis.com', typeList:['Hong']},
    {name: 'hhwang@kinaxis.com', typeList:['Hosuk']},
    {name: 'halshaikhsaleh@kinaxis.com', typeList:['Huda']},
    {name: 'hallan@kinaxis.com', typeList:['Hugh']},
    {name: 'hshao@kinaxis.com', typeList:['Huixu']},
    {name: 'HNguyen@kinaxis.com', typeList:['Hung']},
    {name: 'htran@kinaxis.com', typeList:['Hung']},
    {name: 'iwu@kinaxis.com', typeList:['I-Hsuan']},
    {name: 'ikawashima@kinaxis.com', typeList:['Ikuko']},
    {name: 'ikucukcay@kinaxis.com', typeList:['Ilyas']},
    {name: 'iniroomand@kinaxis.com', typeList:['Iman']},
    {name: 'Information@kinaxis.com', typeList:['Information']},
    {name: 'isugiyama@kinaxis.com', typeList:['Isao']},
    {name: 'ioravsky@kinaxis.com', typeList:['Iva']},
    {name: 'iblackmore@kinaxis.com', typeList:['Ivy']},
    {name: 'jpiersma@kinaxis.com', typeList:['Jaap']},
    {name: 'jyuan@kinaxis.com', typeList:['Jacky']},
    {name: 'c-jturnham@kinaxis.com', typeList:['James']},
    {name: 'jhollingworth@kinaxis.com', typeList:['James']},
    {name: 'jmorganstern@kinaxis.com', typeList:['James']},
    {name: 'jreilly@kinaxis.com', typeList:['James']},
    {name: 'JRudd@kinaxis.com', typeList:['James']},
    {name: 'jward@kinaxis.com', typeList:['James']},
    {name: 'jbastien@kinaxis.com', typeList:['Jamie']},
    {name: 'jkhan@kinaxis.com', typeList:['Jamil']},
    {name: 'jjackson@kinaxis.com', typeList:['Janice']},
    {name: 'jkakazu@kinaxis.com', typeList:['Janice']},
    {name: 'JKray@kinaxis.com', typeList:['Jansen']},
    {name: 'jrai@kinaxis.com', typeList:['Jarnail']},
    {name: 'jding@kinaxis.com', typeList:['Jason']},
    {name: 'jleduc@kinaxis.com', typeList:['Jason']},
    {name: 'jneill@kinaxis.com', typeList:['Jason']},
    {name: 'jsmith@kinaxis.com', typeList:['Jason']},
    {name: 'jmuelhoefer@kinaxis.com', typeList:['Jay']},
    {name: 'jpelletier@kinaxis.com', typeList:['Jay']},
    {name: 'jswanson@kinaxis.com', typeList:['Jean']},
    {name: 'jjolin@kinaxis.com', typeList:['Jean-Francois']},
    {name: 'jbeaulieu@kinaxis.com', typeList:['Jeff']},
    {name: 'jcavill@kinaxis.com', typeList:['Jeff']},
    {name: 'jbell@kinaxis.com', typeList:['Jennifer']},
    {name: 'jpaul@kinaxis.com', typeList:['Jennifer']},
    {name: 'jchanfooktin@kinaxis.com', typeList:['Jenny']},
    {name: 'jboudin@kinaxis.com', typeList:['Jeremie']},
    {name: 'jphilip@kinaxis.com', typeList:['Jeswin']},
    {name: 'jqiu@kinaxis.com', typeList:['Jian']},
    {name: 'jwu@kinaxis.com', typeList:['Jian']},
    {name: 'jfan@kinaxis.com', typeList:['Jianjun']},
    {name: 'jili@kinaxis.com', typeList:['Jiayu']},
    {name: 'jguo@kinaxis.com', typeList:['Jichuan']},
    {name: 'jpark@kinaxis.com', typeList:['Ji-Ho']},
    {name: 'jkiley@kinaxis.com', typeList:['Jill']},
    {name: 'jalexander@kinaxis.com', typeList:['Jillian']},
    {name: 'JCrozman@kinaxis.com', typeList:['Jim']},
    {name: 'JDagg@kinaxis.com', typeList:['Jim']},
    {name: 'jwood@kinaxis.com', typeList:['Jim']},
    {name: 'jzhao@kinaxis.com', typeList:['Jingyan']},
    {name: 'jzhang@kinaxis.com', typeList:['Jinyi']},
    {name: 'jgogo@kinaxis.com', typeList:['Joelle']},
    {name: 'jpalutla@kinaxis.com', typeList:['Joga Rao']},
    {name: 'c-jfry@kinaxis.com', typeList:['John']},
    {name: 'jbugaj@kinaxis.com', typeList:['John']},
    {name: 'jhowat@kinaxis.com', typeList:['John']},
    {name: 'jnafis@kinaxis.com', typeList:['John']},
    {name: 'JSicard@kinaxis.com', typeList:['John']},
    {name: 'JWesterveld@kinaxis.com', typeList:['John']},
    {name: 'jlofton@kinaxis.com', typeList:['Jonathan']},
    {name: 'jmatthews@kinaxis.com', typeList:['Jonathan']},
    {name: 'jsoo@kinaxis.com', typeList:['Jonathan']},
    {name: 'jim@kinaxis.com', typeList:['Jong-Ho']},
    {name: 'jkramil@kinaxis.com', typeList:['Jordan']},
    {name: 'jcannata@kinaxis.com', typeList:['Joseph']},
    {name: 'jrideout@kinaxis.com', typeList:['Joseph']},
    {name: 'jbennington@kinaxis.com', typeList:['Joshua']},
    {name: 'jlabrecque@kinaxis.com', typeList:['Joshua']},
    {name: 'jbai@kinaxis.com', typeList:['Juhong']},
    {name: 'jmageau@kinaxis.com', typeList:['Julien']},
    {name: 'c-jnishijima@kinaxis.com', typeList:['Jun']},
    {name: 'jking@kinaxis.com', typeList:['Justin']},
    {name: 'jbucchio@kinaxis.com', typeList:['Justine']},
    {name: 'khaufe@kinaxis.com', typeList:['Kaitlyn']},
    {name: 'kdai@kinaxis.com', typeList:['Kaiyi']},
    {name: 'kparthipan@kinaxis.com', typeList:['Kamalanathan']},
    {name: 'kcho@kinaxis.com', typeList:['Kanghyoung']},
    {name: 'c-ktei@kinaxis.com', typeList:['Kanto']},
    {name: 'ksingh@kinaxis.com', typeList:['Kanwarpreet']},
    {name: 'c-ktanaka@kinaxis.com', typeList:['Kaori']},
    {name: 'kcrawford@kinaxis.com', typeList:['Karen']},
    {name: 'klank@kinaxis.com', typeList:['Karen']},
    {name: 'kjaniec@kinaxis.com', typeList:['Karl']},
    {name: 'kkural@kinaxis.com', typeList:['Karolina']},
    {name: 'c-kgopalan@kinaxis.com', typeList:['Karthik']},
    {name: 'kmckinnon@kinaxis.com', typeList:['Katie']},
    {name: 'kkoda@kinaxis.com', typeList:['Kazunori']},
    {name: 'klee@kinaxis.com', typeList:['Kee Hyoung']},
    {name: 'c-kmedcalf@kinaxis.com', typeList:['Keith']},
    {name: 'khamel@kinaxis.com', typeList:['Keith']},
    {name: 'kventer@kinaxis.com', typeList:['Keith']},
    {name: 'c-kwehrer@kinaxis.com', typeList:['Kelly']},
    {name: 'kmiles@kinaxis.com', typeList:['Kelly']},
    {name: 'kdonovan@kinaxis.com', typeList:['Ken']},
    {name: 'kreed@kinaxis.com', typeList:['Ken']},
    {name: 'kyip@kinaxis.com', typeList:['Ken']},
    {name: 'c-kmiyoi@kinaxis.com', typeList:['Kenichi']},
    {name: 'kcrites@kinaxis.com', typeList:['Kenneth']},
    {name: 'kpoe@kinaxis.com', typeList:['Kenneth']},
    {name: 'c-kklass@kinaxis.com', typeList:['Kerry']},
    {name: 'kcurrier@kinaxis.com', typeList:['Kerry']},
    {name: 'KZuber@kinaxis.com', typeList:['Kerry']},
    {name: 'kcameron@kinaxis.com', typeList:['Kevin']},
    {name: 'kcrocker@kinaxis.com', typeList:['Kevin']},
    {name: 'kforde@kinaxis.com', typeList:['Kevin']},
    {name: 'kmacpherson@kinaxis.com', typeList:['Kevin']},
    {name: 'kmcgowan@kinaxis.com', typeList:['Kevin']},
    {name: 'kjawhar@kinaxis.com', typeList:['Khaled']},
    {name: 'kmankal@kinaxis.com', typeList:['Khaled']},
    {name: 'kweston@kinaxis.com', typeList:['Kim']},
    {name: 'careers@kinaxis.com', typeList:['Kinaxis']},
    {name: 'certification@kinaxis.com', typeList:['Kinaxis']},
    {name: 'Consulting@kinaxis.com', typeList:['Kinaxis']},
    {name: 'kinaxisjapan@kinaxis.com', typeList:['Kinaxis']},
    {name: 'support@kinaxis.com', typeList:['Kinaxis']},
    {name: 'kyuan@kinaxis.com', typeList:['Kirk']},
    {name: 'kwatson@kinaxis.com', typeList:['Kirsten']},
    {name: 'klc-expert@kinaxis.com', typeList:['KLC']},
    {name: 'knowledge-network@kinaxis.com', typeList:['Knowledge']},
    {name: 'ksoldatov@kinaxis.com', typeList:['Kostiantyn']},
    {name: 'ksetoguchi@kinaxis.com', typeList:['Kotaro']},
    {name: 'ksamini@kinaxis.com', typeList:['Kourosh']},
    {name: 'krahn@kinaxis.com', typeList:['Kraig']},
    {name: 'KReid@kinaxis.com', typeList:['Kris']},
    {name: 'kpurpura@kinaxis.com', typeList:['Kristen']},
    {name: 'klassenba@kinaxis.com', typeList:['Kristi']},
    {name: 'kbohm@kinaxis.com', typeList:['Kristian']},
    {name: 'kchoi@kinaxis.com', typeList:['Kwok Chak']},
    {name: 'kkim@kinaxis.com', typeList:['Kyunghee']},
    {name: 'lblikman@kinaxis.com', typeList:['Lammert Johan']},
    {name: 'lberger@kinaxis.com', typeList:['Larissa']},
    {name: 'lliu@kinaxis.com', typeList:['Laura']},
    {name: 'lthibodeau@kinaxis.com', typeList:['Lauren']},
    {name: 'lslater@kinaxis.com', typeList:['Lazarus']},
    {name: 'lmcguire@kinaxis.com', typeList:['Leah']},
    {name: 'ljones@kinaxis.com', typeList:['Lee']},
    {name: 'lchen@kinaxis.com', typeList:['Lei']},
    {name: 'lisaacs@kinaxis.com', typeList:['Lenard']},
    {name: 'loudenhoven@kinaxis.com', typeList:['Leo']},
    {name: 'ltikoisuva@kinaxis.com', typeList:['Leticia']},
    {name: 'lmeade@kinaxis.com', typeList:['Liam']},
    {name: 'lxu@kinaxis.com', typeList:['Lidan']},
    {name: 'lwalters@kinaxis.com', typeList:['Lindsey']},
    {name: 'lcarter@kinaxis.com', typeList:['Lisa']},
    {name: 'lsouliere@kinaxis.com', typeList:['Lisa']},
    {name: 'leverett@kinaxis.com', typeList:['Loretta']},
    {name: 'ljohns@kinaxis.com', typeList:['Lori']},
    {name: 'c-lgarciaparedes@kinaxis.com', typeList:['Luis']},
    {name: 'llaramarquez@kinaxis.com', typeList:['Luis']},
    {name: 'lsolia@kinaxis.com', typeList:['Luiz']},
    {name: 'lpinto@kinaxis.com', typeList:['Lysanne']},
    {name: 'c-mnarayanan@kinaxis.com', typeList:['Madhav']},
    {name: 'mdurbha@kinaxis.com', typeList:['Madhav']},
    {name: 'mtrikic@kinaxis.com', typeList:['Maja']},
    {name: 'c-mgovindaraju@kinaxis.com', typeList:['Major']},
    {name: 'msharma@kinaxis.com', typeList:['Manik']},
    {name: 'mcorrea@kinaxis.com', typeList:['Manuel']},
    {name: 'malmeida@kinaxis.com', typeList:['Marcio']},
    {name: 'mgrines@kinaxis.com', typeList:['Maria']},
    {name: 'mwozniak@kinaxis.com', typeList:['Marilyn']},
    {name: 'mcreanga@kinaxis.com', typeList:['Marin']},
    {name: 'mamrite@kinaxis.com', typeList:['Mark']},
    {name: 'mhaslam@kinaxis.com', typeList:['Mark']},
    {name: 'mostrom@kinaxis.com', typeList:['Mark']},
    {name: 'mross@kinaxis.com', typeList:['Mark']},
    {name: 'mcharette@kinaxis.com', typeList:['Martin']},
    {name: 'mdubois@kinaxis.com', typeList:['Martin']},
    {name: 'mlunn@kinaxis.com', typeList:['Martin']},
    {name: 'mbenson@kinaxis.com', typeList:['Matthew']},
    {name: 'mchmiel@kinaxis.com', typeList:['Matthew']},
    {name: 'mdiener@kinaxis.com', typeList:['Matthew']},
    {name: 'mimtiaz@kinaxis.com', typeList:['Matthew']},
    {name: 'mmontgomery@kinaxis.com', typeList:['Matthew']},
    {name: 'mpenner@kinaxis.com', typeList:['Matthew']},
    {name: 'mpenny@kinaxis.com', typeList:['Matthew']},
    {name: 'mreaume@kinaxis.com', typeList:['Matthew']},
    {name: 'mtite@kinaxis.com', typeList:['Matthew']},
    {name: 'mjeffrey@kinaxis.com', typeList:['Max']},
    {name: 'mirodov@kinaxis.com', typeList:['Maxim']},
    {name: 'mcouture@kinaxis.com', typeList:['Maxime']},
    {name: 'mbrejak@kinaxis.com', typeList:['Maxwell']},
    {name: 'mpaterson@kinaxis.com', typeList:['Megan']},
    {name: 'mwatson@kinaxis.com', typeList:['Melanie']},
    {name: 'mcormier@kinaxis.com', typeList:['Melina']},
    {name: 'moudompeht@kinaxis.com', typeList:['Meng']},
    {name: 'mpowers@kinaxis.com', typeList:['Meranda']},
    {name: 'mblalock@kinaxis.com', typeList:['Michael']},
    {name: 'mdeclerck@kinaxis.com', typeList:['Michael']},
    {name: 'mfindlay@kinaxis.com', typeList:['Michael']},
    {name: 'mhargroder@kinaxis.com', typeList:['Michael']},
    {name: 'mhay@kinaxis.com', typeList:['Michael']},
    {name: 'mknol@kinaxis.com', typeList:['Michael']},
    {name: 'mmauger@kinaxis.com', typeList:['Michael']},
    {name: 'mmcguire@kinaxis.com', typeList:['Michael']},
    {name: 'mmiller@kinaxis.com', typeList:['Michael']},
    {name: 'mprigmore@kinaxis.com', typeList:['Michael']},
    {name: 'mlaforest@kinaxis.com', typeList:['Michelle']},
    {name: 'mmcallister@kinaxis.com', typeList:['Mike']},
    {name: 'mishikawa@kinaxis.com', typeList:['Miki']},
    {name: 'mtahira@kinaxis.com', typeList:['Minako']},
    {name: 'mmorrah@kinaxis.com', typeList:['Miranda']},
    {name: 'mdamjanoski@kinaxis.com', typeList:['Miroslav']},
    {name: 'myassine@kinaxis.com', typeList:['Mohamad']},
    {name: 'myeung@kinaxis.com', typeList:['Mosa']},
    {name: 'adminmmshana@kinaxis.com', typeList:['Muhuji']},
    {name: 'mmshana@kinaxis.com', typeList:['Muhuji']},
    {name: 'mlee@kinaxis.com', typeList:['Myeongheon']},
    {name: 'mju@kinaxis.com', typeList:['Myung-Jin']},
    {name: 'njoshi@kinaxis.com', typeList:['Najjal']},
    {name: 'nvinjamuri@kinaxis.com', typeList:['Naren']},
    {name: 'nkukreja@kinaxis.com', typeList:['Natesh']},
    {name: 'nstanley@kinaxis.com', typeList:['Nathaniel']},
    {name: 'nmufti@kinaxis.com', typeList:['Nazim']},
    {name: 'nerdogus@kinaxis.com', typeList:['Nazli']},
    {name: 'nauclair@kinaxis.com', typeList:['Neal']},
    {name: 'NRemlinger@kinaxis.com', typeList:['Neal']},
    {name: 'njatania@kinaxis.com', typeList:['Neel']},
    {name: 'nschein@kinaxis.com', typeList:['Ngan Mei']},
    {name: 'nzeng@kinaxis.com', typeList:['Ni']},
    {name: 'ncuccia@kinaxis.com', typeList:['Nick']},
    {name: 'npisani@kinaxis.com', typeList:['Nick']},
    {name: 'nsicard@kinaxis.com', typeList:['Nick']},
    {name: 'noreply@kinaxis.com', typeList:['No']},
    {name: 'ozbyranyk@kinaxis.com', typeList:['Oksana']},
    {name: 'osemenchuk@kinaxis.com', typeList:['Oleg']},
    {name: 'odagenais@kinaxis.com', typeList:['Olivier']},
    {name: 'odeladurantaye@kinaxis.com', typeList:['Olivier']},
    {name: 'Olivier.Houdart@softchoice.com', typeList:['Olivier']},
    {name: 'otoutounji@kinaxis.com', typeList:['Omar']},
    {name: 'odebian@kinaxis.com', typeList:['Osama']},
    {name: 'operez@kinaxis.com', typeList:['Oscar']},
    {name: 'omurphy@kinaxis.com', typeList:['Owen']},
    {name: 'pdurrani@kinaxis.com', typeList:['Palvashah']},
    {name: 'phalter@kinaxis.com', typeList:['Pam']},
    {name: 'ptruscott@kinaxis.com', typeList:['Pam']},
    {name: 'pgournas@kinaxis.com', typeList:['Panagiotis']},
    {name: 'pschaedeli@kinaxis.com', typeList:['Pascal']},
    {name: 'pvanderscheer@kinaxis.com', typeList:['Patti']},
    {name: 'c-PHaviland@kinaxis.com', typeList:['Paul']},
    {name: 'PBrenner@kinaxis.com', typeList:['Paul']},
    {name: 'pcarreiro@kinaxis.com', typeList:['Paul']},
    {name: 'pcaudle@kinaxis.com', typeList:['Paul']},
    {name: 'pjohnsen@kinaxis.com', typeList:['Paul']},
    {name: 'poleary@kinaxis.com', typeList:['Paul']},
    {name: 'PRachniowski@kinaxis.com', typeList:['Paul']},
    {name: 'psmithson@kinaxis.com', typeList:['Paul']},
    {name: 'pfalsafi@kinaxis.com', typeList:['Pedram']},
    {name: 'pshi@kinaxis.com', typeList:['Peng']},
    {name: 'pbugden@kinaxis.com', typeList:['Peter']},
    {name: 'pwhitehead@kinaxis.com', typeList:['Peter']},
    {name: 'psharp@kinaxis.com', typeList:['Philip']},
    {name: 'pbedard@kinaxis.com', typeList:['Philippe']},
    {name: 'pcadieuxpelletier@kinaxis.com', typeList:['Philippe']},
    {name: 'pregmi@kinaxis.com', typeList:['Prabhakar']},
    {name: 'pbansal@kinaxis.com', typeList:['Prachi']},
    {name: 'c-pgundampalli@kinaxis.com', typeList:['Praveen']},
    {name: 'c-psaravanan@kinaxis.com', typeList:['Praveenkumar']},
    {name: 'c-rsundararaman@kinaxis.com', typeList:['Radhika']},
    {name: 'rrafique@kinaxis.com', typeList:['Raheel']},
    {name: 'rjain@kinaxis.com', typeList:['Rahul']},
    {name: 'rverma@kinaxis.com', typeList:['Rahul']},
    {name: 'raiyar@kinaxis.com', typeList:['Rajanga']},
    {name: 'c-rkaruturi@kinaxis.com', typeList:['Rajani']},
    {name: 'rchandrasekhar@kinaxis.com', typeList:['Rajeev']},
    {name: 'c-rabbad@kinaxis.com', typeList:['Rami']},
    {name: 'rarmstrong@kinaxis.com', typeList:['Randy']},
    {name: 'rray@kinaxis.com', typeList:['Randy']},
    {name: 'rroggensack@kinaxis.com', typeList:['Randy']},
    {name: 'rwestman@kinaxis.com', typeList:['Randy']},
    {name: 'rtantawy@kinaxis.com', typeList:['Ranya']},
    {name: 'c-rreddy@kinaxis.com', typeList:['Raveendra']},
    {name: 'rleddy@kinaxis.com', typeList:['Ray']},
    {name: 'rwong@kinaxis.com', typeList:['Raymond']},
    {name: 'rwu@kinaxis.com', typeList:['Raymond']},
    {name: 'rbahmani@kinaxis.com', typeList:['Reda']},
    {name: 'rsharma@kinaxis.com', typeList:['Rekha']},
    {name: 'rhernandezremedios@kinaxis.com', typeList:['Rene']},
    {name: 'rmatin@kinaxis.com', typeList:['Reza']},
    {name: 'rdamania@kinaxis.com', typeList:['Rhythm']},
    {name: 'rtabone@kinaxis.com', typeList:['Ricardo']},
    {name: 'rkunecki@kinaxis.com', typeList:['Richard']},
    {name: 'rlord@kinaxis.com', typeList:['Richard']},
    {name: 'rmonkman@kinaxis.com', typeList:['Richard']},
    {name: 'rphillips@kinaxis.com', typeList:['Richard']},
    {name: 'rwadsworth@kinaxis.com', typeList:['Rick']},
    {name: 'rlawson@kinaxis.com', typeList:['Riley']},
    {name: 'rikhan@kinaxis.com', typeList:['Rishad']},
    {name: 'rjansen@kinaxis.com', typeList:['Rob']},
    {name: 'rmacmillan@kinaxis.com', typeList:['Rob']},
    {name: 'rjoseph@kinaxis.com', typeList:['Robbie']},
    {name: 'c-rwalker@kinaxis.com', typeList:['Robert']},
    {name: 'rarcher@kinaxis.com', typeList:['Robert']},
    {name: 'rbauer@kinaxis.com', typeList:['Robert']},
    {name: 'rbusby@kinaxis.com', typeList:['Robert']},
    {name: 'rrathwell@kinaxis.com', typeList:['Robert']},
    {name: 'rstlouis@kinaxis.com', typeList:['Robert']},
    {name: 'RWalker@kinaxis.com', typeList:['Robert']},
    {name: 'rkhan@kinaxis.com', typeList:['Robi']},
    {name: 'rbrading@kinaxis.com', typeList:['Robyn']},
    {name: 'RMcDonald@kinaxis.com', typeList:['Rod']},
    {name: 'rjohnson@kinaxis.com', typeList:['Roger']},
    {name: 'roreilly@kinaxis.com', typeList:['Roisin']},
    {name: 'c-rcolombet@kinaxis.com', typeList:['Romain']},
    {name: 'rclayton@kinaxis.com', typeList:['Ron']},
    {name: 'rstappert@kinaxis.com', typeList:['Ron']},
    {name: 'RTimlin@kinaxis.com', typeList:['Ross']},
    {name: 'rshor@kinaxis.com', typeList:['Rustam']},
    {name: 'rmccluskey@kinaxis.com', typeList:['Ryan']},
    {name: 'robyrne@kinaxis.com', typeList:['Ryan']},
    {name: 'rmcmanus@kinaxis.com', typeList:['Rylie']},
    {name: 'rtakahashi@kinaxis.com', typeList:['Ryuta']},
    {name: 'c-sdayanidhi@kinaxis.com', typeList:['Sabari']},
    {name: 'ssaeednooran@kinaxis.com', typeList:['Sahar']},
    {name: 'sakinbile@kinaxis.com', typeList:['Saheed']},
    {name: 'c-sgupta@kinaxis.com', typeList:['Sahil']},
    {name: 'ssaroop@kinaxis.com', typeList:['Sahil']},
    {name: 'salmalki@kinaxis.com', typeList:['Sajeda']},
    {name: 'sales.inquiry@kinaxis.com', typeList:['Sales']},
    {name: 'c-sgharnagh@kinaxis.com', typeList:['Sam']},
    {name: 'selhelou@kinaxis.com', typeList:['Samer']},
    {name: 'scordeiro@kinaxis.com', typeList:['Sandra']},
    {name: 'spatanshettar@kinaxis.com', typeList:['Santhosh']},
    {name: 'c-sadhav@kinaxis.com', typeList:['Santosh']},
    {name: 'sahassan@kinaxis.com', typeList:['Sara']},
    {name: 'smiles@kinaxis.com', typeList:['Sara']},
    {name: 'c-shayes@kinaxis.com', typeList:['Sarah']},
    {name: 'svlajich@kinaxis.com', typeList:['Sasha']},
    {name: 'sdutta@kinaxis.com', typeList:['Saurav']},
    {name: 'snandkeshwar@kinaxis.com', typeList:['Saywack']},
    {name: 'sgreenhorn@kinaxis.com', typeList:['Scott']},
    {name: 'sjohnson@kinaxis.com', typeList:['Scott']},
    {name: 'spochter@kinaxis.com', typeList:['Scott']},
    {name: 'swilson@kinaxis.com', typeList:['Scott']},
    {name: 'sdovan@kinaxis.com', typeList:['Sebastien']},
    {name: 'souellet@kinaxis.com', typeList:['Sebastien']},
    {name: 'c-sperumal@kinaxis.com', typeList:['SenthilVel']},
    {name: 'scozma@kinaxis.com', typeList:['Serban']},
    {name: 'skrutelevich@kinaxis.com', typeList:['Sergei']},
    {name: 'sgorbenko@kinaxis.com', typeList:['Sergii']},
    {name: 'snourashrafeddin@kinaxis.com', typeList:['Seyednaser']},
    {name: 'skhondker@kinaxis.com', typeList:['Shabbir']},
    {name: 'stownsend@kinaxis.com', typeList:['Shamika']},
    {name: 'smaguire@kinaxis.com', typeList:['Shannon']},
    {name: 'sfu@kinaxis.com', typeList:['Shaojie']},
    {name: 'shill@kinaxis.com', typeList:['Shari']},
    {name: 'skhani@kinaxis.com', typeList:['Sharokh']},
    {name: 'skatkuri@kinaxis.com', typeList:['Shashikanth']},
    {name: 'SDougherty@kinaxis.com', typeList:['Shawn']},
    {name: 'svernier@kinaxis.com', typeList:['Shawn']},
    {name: 'ssharma@kinaxis.com', typeList:['Sheenam']},
    {name: 'c-schase@kinaxis.com', typeList:['Sheila']},
    {name: 'c-sagarwal@kinaxis.com', typeList:['Shikha']},
    {name: 'schaurasia@kinaxis.com', typeList:['Shikha']},
    {name: 'skohno@kinaxis.com', typeList:['Shinji']},
    {name: 'smohseni@kinaxis.com', typeList:['Shirin']},
    {name: 'schawla@kinaxis.com', typeList:['Shruti']},
    {name: 'shuang@kinaxis.com', typeList:['Shun Yu']},
    {name: 'c-skannan@kinaxis.com', typeList:['Sibi']},
    {name: 'ssiuluo@kinaxis.com', typeList:['Silvia']},
    {name: 'sihaisz@kinaxis.com', typeList:['Simon']},
    {name: 'stetu@kinaxis.com', typeList:['Simon']},
    {name: 'sknych@kinaxis.com', typeList:['Simone']},
    {name: 'c-svelayudhan@kinaxis.com', typeList:['Siva']},
    {name: 'c-ssubbaiah@kinaxis.com', typeList:['Sivaraman']},
    {name: 'sbelleau@kinaxis.com', typeList:['Spencer']},
    {name: 'sraghunathan@kinaxis.com', typeList:['Sriprasadh']},
    {name: 'shosick@kinaxis.com', typeList:['Stefanie']},
    {name: 'svandermeeren@kinaxis.com', typeList:['Stephane']},
    {name: 'sszeto@kinaxis.com', typeList:['Stephanie']},
    {name: 'sgallagher@kinaxis.com', typeList:['Stephen']},
    {name: 'sjonker@kinaxis.com', typeList:['Stephen']},
    {name: 'sharris@kinaxis.com', typeList:['Steve']},
    {name: 'smcstravick@kinaxis.com', typeList:['Steve']},
    {name: 'sstrobl@kinaxis.com', typeList:['Steve']},
    {name: 'scraddock@kinaxis.com', typeList:['Stuart']},
    {name: 'slangan@kinaxis.com', typeList:['Stuart']},
    {name: 'spearson@kinaxis.com', typeList:['Stuart']},
    {name: 'successfactors@kinaxis.com', typeList:['SuccessFactors']},
    {name: 'ssen@kinaxis.com', typeList:['Sudip']},
    {name: 'sjung@kinaxis.com', typeList:['Sungyun']},
    {name: 'sroy@kinaxis.com', typeList:['Sunil']},
    {name: 'skohli@kinaxis.com', typeList:['Sunjot']},
    {name: 'soloughlin@kinaxis.com', typeList:['Susan']},
    {name: 'spark@kinaxis.com', typeList:['Suyoung']},
    {name: 'srondeau@kinaxis.com', typeList:['Suzanne']},
    {name: 'snoonan@kinaxis.com', typeList:['Suzie']},
    {name: 'shassan@kinaxis.com', typeList:['Syed']},
    {name: 'snaqvi@kinaxis.com', typeList:['Syed']},
    {name: 'tghani@kinaxis.com', typeList:['Tahira']},
    {name: 'tyu@kinaxis.com', typeList:['Taiyan']},
    {name: 'tyokokawa@kinaxis.com', typeList:['Takeshi']},
    {name: 'talendintegrationuserBV@kinaxis.com', typeList:['Talend']},
    {name: 'tkapuscinska@kinaxis.com', typeList:['Tamminh']},
    {name: 'ttesta@kinaxis.com', typeList:['Tanino']},
    {name: 'TTrenka@kinaxis.com', typeList:['Tanya']},
    {name: 'txie@kinaxis.com', typeList:['Tao']},
    {name: 'tmallik@kinaxis.com', typeList:['Tapan']},
    {name: 'tho@kinaxis.com', typeList:['Tat Chi Kenneth']},
    {name: 'thodgkinson@kinaxis.com', typeList:['Tate']},
    {name: 'admintmokhnach@kinaxis.com', typeList:['Tatyana']},
    {name: 'tmokhnach@kinaxis.com', typeList:['Tatyana']},
    {name: 'tmacdonald@kinaxis.com', typeList:['Taunya']},
    {name: 'tdavis@kinaxis.com', typeList:['Tawni']},
    {name: 'tchiykowski@kinaxis.com', typeList:['Teresa']},
    {name: 'tfeyko@kinaxis.com', typeList:['Terry']},
    {name: 'tjiang@kinaxis.com', typeList:['Terry']},
    {name: 'testmobile@kinaxis.com', typeList:['Test']},
    {name: 'tnguyen@kinaxis.com', typeList:['Thai']},
    {name: 'thart@kinaxis.com', typeList:['Theodore']},
    {name: 'tschneider@kinaxis.com', typeList:['Thierry']},
    {name: 'tgregorchik@kinaxis.com', typeList:['Thomas']},
    {name: 'tknowlton@kinaxis.com', typeList:['Thomas']},
    {name: 'tkrug@kinaxis.com', typeList:['Tim']},
    {name: 'tmak@kinaxis.com', typeList:['Tin Lun']},
    {name: 'c-tkeys@kinaxis.com', typeList:['TJ']},
    {name: 'c-tthomas@kinaxis.com', typeList:['Tom']},
    {name: 'tjoseph@kinaxis.com', typeList:['Tom']},
    {name: 'tmelegh@kinaxis.com', typeList:['Tom']},
    {name: 'tkaneko@kinaxis.com', typeList:['Toshiya']},
    {name: 'tmcintyre@kinaxis.com', typeList:['Traci']},
    {name: 'troomsburg@kinaxis.com', typeList:['Tracie']},
    {name: 'twillmott@kinaxis.com', typeList:['Tracy']},
    {name: 'tlewis@kinaxis.com', typeList:['Treena']},
    {name: 'tmiles@kinaxis.com', typeList:['Trevor']},
    {name: 'tpfeifer@kinaxis.com', typeList:['Tricia']},
    {name: 'tmarsolais@kinaxis.com', typeList:['Tristan']},
    {name: 'tprobst@kinaxis.com', typeList:['Tristan']},
    {name: 'tishioka@kinaxis.com', typeList:['Tsutomu']},
    {name: 'tkenanoglu@kinaxis.com', typeList:['Tulug']},
    {name: 'tmarriott@kinaxis.com', typeList:['Tyler']},
    {name: 'c-uvashi@kinaxis.com', typeList:['Ulhas']},
    {name: 'adminumccann@kinaxis.com', typeList:['Uriah']},
    {name: 'umccann@kinaxis.com', typeList:['Uriah']},
    {name: 'c-vrana@kinaxis.com', typeList:['Varun']},
    {name: 'c-vmurugadoss@kinaxis.com', typeList:['Venkatesh']},
    {name: 'vpathak@kinaxis.com', typeList:['Venus']},
    {name: 'vmurzina@kinaxis.com', typeList:['Vera']},
    {name: 'c-vkandan@kinaxis.com', typeList:['Vignesh']},
    {name: 'c-vsubramanian@kinaxis.com', typeList:['Vijay']},
    {name: 'c-vmodi@kinaxis.com', typeList:['Vinayak']},
    {name: 'vfalardeau@kinaxis.com', typeList:['Vincent']},
    {name: 'vle@kinaxis.com', typeList:['Vivian']},
    {name: 'vgarcia@kinaxis.com', typeList:['Vivien']},
    {name: 'wheyer@kinaxis.com', typeList:['Wayne']},
    {name: 'wstevens@kinaxis.com', typeList:['Wayne']},
    {name: 'wlowe@kinaxis.com', typeList:['Wendy']},
    {name: 'wng@kinaxis.com', typeList:['Wilkins']},
    {name: 'wbland@kinaxis.com', typeList:['William']},
    {name: 'wriordan@kinaxis.com', typeList:['William']},
    {name: 'xmeng@kinaxis.com', typeList:['Xiangliang']},
    {name: 'xdeng@kinaxis.com', typeList:['Xiao']},
    {name: 'xliu@kinaxis.com', typeList:['Xiaoyu']},
    {name: 'xdong@kinaxis.com', typeList:['Xue']},
    {name: 'yallie@kinaxis.com', typeList:['Yaaser']},
    {name: 'ygao@kinaxis.com', typeList:['Yan']},
    {name: 'YZhang@kinaxis.com', typeList:['Yankai']},
    {name: 'ygoto@kinaxis.com', typeList:['Yasunari']},
    {name: 'c-ykawasaki@kinaxis.com', typeList:['Yasuo']},
    {name: 'ykuwabara@kinaxis.com', typeList:['Yasutaka']},
    {name: 'yliu@kinaxis.com', typeList:['Yating']},
    {name: 'ylu@kinaxis.com', typeList:['Yingbei']},
    {name: 'ychen@kinaxis.com', typeList:['Yong']},
    {name: 'ykaram@kinaxis.com', typeList:['Youssef']},
    {name: 'ycshen@kinaxis.com', typeList:['Yu-Cheng']},
    {name: 'ywang@kinaxis.com', typeList:['Yuehui-Alice']},
    {name: 'c-ytaka@kinaxis.com', typeList:['Yugo']},
    {name: 'zlin@kinaxis.com', typeList:['Zhen']},
    {name: 'zren@kinaxis.com', typeList:['Zhuying']},
    {name: 'zatif@kinaxis.com', typeList:['Zia Ubaid']},
    {name: 'c-zrizk@kinaxis.com', typeList:['Ziad']},
    {name: 'zhuang@kinaxis.com', typeList:['Zonghao']},
  ];

  oneventRendered(args: EventRenderedArgs): void {
    console.log(scheduleData.length);
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
    //this.filteredData();
  }
/*
  filteredData() {
    //filter by category
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
    this.newData = <Object[]> [];
    var date = form.value.dateFilter;
    var category = form.value.filterEventType;
    var participant = form.value.participantsFilter;
    console.log(participant);
    var filterDate = new Date(date);
    filterDate.setDate(filterDate.getDate()+1);
    console.log(category);
    for (let i = 0; i < scheduleData.length ; i++) {
      if(this.compareDate(filterDate, scheduleData[i].StartTime) && this.compareCategory(category, scheduleData[i].Description)
      && this.compareParticipants(participant, scheduleData[i].Description)){
        this.newData.push(this.data[i]);
      }
    }
    this.eventSettings = { dataSource: this.newData };

  }
*/

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
      Description: 'Category: Basketball <br/> Participants: ',
    };
    console.log(scheduleData[scheduleData.length-1]);
    this.data.push(event);
    console.log(event);
    this.currentFilter = '';
    //this.filteredData();
    // this.eventSettings = { dataSource: this.data };
    console.log(scheduleData[scheduleData.length-1]);

    //setting participantList array to take in participant chosen

  }

  addParticipants(form):void{
    console.log("help");
    console.log(form);
    //console.log(form.value.participantName.value);

    console.log(document.getElementById("demo").innerHTML);
   for(var i=0; i<form.value.participant.length; i++){
     document.getElementById("demo").innerHTML += form.value.participant[i] + "<br>";
   }

    // var par = [];
    // var count = 0;
    // if(form.value.participant != null){
    //   for(var i=0; i<form.value.participant.length; i++){
    //     if(form.participant[i].selected){
    //       par[count] = form.participant[i].value;
    //       count++;
    //     }
    //   }
    // }

    //console.log(par);

    // for(int i=0; i<participantList.length; i++){
    //   textarea = "hello";
    // }

  }

}
