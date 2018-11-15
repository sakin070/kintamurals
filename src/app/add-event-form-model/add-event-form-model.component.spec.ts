import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventFormModelComponent } from './add-event-form-model.component';

describe('AddEventFormModelComponent', () => {
  let component: AddEventFormModelComponent;
  let fixture: ComponentFixture<AddEventFormModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventFormModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventFormModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
