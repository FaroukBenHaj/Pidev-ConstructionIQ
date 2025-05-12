import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetingComponent } from './add-meeting.component';

describe('AddMeetingComponent', () => {
  let component: AddMeetingComponent;
  let fixture: ComponentFixture<AddMeetingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMeetingComponent]
    });
    fixture = TestBed.createComponent(AddMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
