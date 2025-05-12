import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranttChartComponent } from './grantt-chart.component';

describe('GranttChartComponent', () => {
  let component: GranttChartComponent;
  let fixture: ComponentFixture<GranttChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GranttChartComponent]
    });
    fixture = TestBed.createComponent(GranttChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
