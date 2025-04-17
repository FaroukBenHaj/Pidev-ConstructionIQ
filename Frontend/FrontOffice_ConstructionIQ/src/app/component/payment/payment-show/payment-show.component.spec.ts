import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentShowComponent } from './payment-show.component';

describe('PaymentShowComponent', () => {
  let component: PaymentShowComponent;
  let fixture: ComponentFixture<PaymentShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentShowComponent]
    });
    fixture = TestBed.createComponent(PaymentShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
