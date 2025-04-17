import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCreateComponent } from './budget-create.component';

describe('BudgetCreateComponent', () => {
  let component: BudgetCreateComponent;
  let fixture: ComponentFixture<BudgetCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetCreateComponent]
    });
    fixture = TestBed.createComponent(BudgetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
