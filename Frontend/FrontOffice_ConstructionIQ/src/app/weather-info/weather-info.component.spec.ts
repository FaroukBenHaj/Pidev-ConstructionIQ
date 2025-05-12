import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInfoComponent } from './weather-info.component';

describe('WeatherInfoComponent', () => {
  let component: WeatherInfoComponent;
  let fixture: ComponentFixture<WeatherInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherInfoComponent]
    });
    fixture = TestBed.createComponent(WeatherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
