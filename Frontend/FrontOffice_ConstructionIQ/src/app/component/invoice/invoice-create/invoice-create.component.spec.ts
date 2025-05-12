import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCreateComponent } from './invoice-create.component';

describe('InvoiceCreateComponent', () => {
  let component: InvoiceCreateComponent;
  let fixture: ComponentFixture<InvoiceCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceCreateComponent]
    });
    fixture = TestBed.createComponent(InvoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
