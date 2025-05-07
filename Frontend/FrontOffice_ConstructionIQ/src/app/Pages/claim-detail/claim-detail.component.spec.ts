import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimDetailComponent } from './claim-detail.component';

describe('ClaimDetailComponent', () => {
  let component: ClaimDetailComponent;
  let fixture: ComponentFixture<ClaimDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimDetailComponent]
    });
    fixture = TestBed.createComponent(ClaimDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
