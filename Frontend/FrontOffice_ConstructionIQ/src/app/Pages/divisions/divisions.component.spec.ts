import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionsComponent } from './divisions.component';

describe('DivisionsComponent', () => {
  let component: DivisionsComponent;
  let fixture: ComponentFixture<DivisionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DivisionsComponent]
    });
    fixture = TestBed.createComponent(DivisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
