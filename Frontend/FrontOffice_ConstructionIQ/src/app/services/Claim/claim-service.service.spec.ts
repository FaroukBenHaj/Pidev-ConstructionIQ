import { TestBed } from '@angular/core/testing';

import { ClaimServiceService } from './claim-service.service';

describe('ClaimServiceService', () => {
  let service: ClaimServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
