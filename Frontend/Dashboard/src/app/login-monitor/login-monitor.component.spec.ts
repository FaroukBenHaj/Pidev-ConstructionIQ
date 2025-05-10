import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMonitorComponent } from './login-monitor.component';

describe('LoginMonitorComponent', () => {
  let component: LoginMonitorComponent;
  let fixture: ComponentFixture<LoginMonitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMonitorComponent]
    });
    fixture = TestBed.createComponent(LoginMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
