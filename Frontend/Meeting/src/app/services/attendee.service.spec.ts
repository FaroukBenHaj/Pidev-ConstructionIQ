import { TestBed } from '@angular/core/testing';

import { AttendeeService } from './attendee.service';

describe('AttendeeService', () => {
  let service: AttendeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
