import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEditComponent } from './budget-edit.component';

describe('BudgetEditComponent', () => {
  let component: BudgetEditComponent;
  let fixture: ComponentFixture<BudgetEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetEditComponent]
    });
    fixture = TestBed.createComponent(BudgetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
