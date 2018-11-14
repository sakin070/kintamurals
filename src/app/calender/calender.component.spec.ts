import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderComponent } from './calender.component';
import { InputObject, TextBox } from  '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';

describe('CalenderComponent', () => {
  let component: CalenderComponent;
  let fixture: ComponentFixture<CalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let inputobj1: TextBox = new TextBox({
      placeholder: 'Admin 1',
      floatLabelType: 'Auto'
  });
  inputobj1.appendTo(#Admin1);

  let button: Button = new Button();
  button.appendTo('#normalbtn');




});
/**
  let customers: DropDownList = new DropDownList({
    dataSource:new DataManager({ url:'http://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/' }),
    query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(5),
    fields: { text: 'ContactName', value: 'CustomerID' },
    placeholder: 'Select a customer'
  });

customers.appendTo("#list");*/
