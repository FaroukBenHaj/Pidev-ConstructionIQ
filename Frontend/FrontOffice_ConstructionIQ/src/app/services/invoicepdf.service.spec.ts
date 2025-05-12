import { TestBed } from '@angular/core/testing';

import { InvoicepdfService } from './invoicepdf.service';

describe('InvoicepdfService', () => {
  let service: InvoicepdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoicepdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
