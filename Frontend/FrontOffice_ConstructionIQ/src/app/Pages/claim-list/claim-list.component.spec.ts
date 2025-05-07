import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimListComponent } from './claim-list.component';

describe('ClaimListComponent', () => {
  let component: ClaimListComponent;
  let fixture: ComponentFixture<ClaimListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimListComponent]
    });
    fixture = TestBed.createComponent(ClaimListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
