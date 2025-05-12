import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreateComponent } from './payment-create.component';

describe('PaymentCreateComponent', () => {
  let component: PaymentCreateComponent;
  let fixture: ComponentFixture<PaymentCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentCreateComponent]
    });
    fixture = TestBed.createComponent(PaymentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
