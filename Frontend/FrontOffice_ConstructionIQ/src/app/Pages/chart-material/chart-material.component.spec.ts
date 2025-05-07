import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartMaterialComponent } from './chart-material.component';

describe('ChartMaterialComponent', () => {
  let component: ChartMaterialComponent;
  let fixture: ComponentFixture<ChartMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartMaterialComponent]
    });
    fixture = TestBed.createComponent(ChartMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
