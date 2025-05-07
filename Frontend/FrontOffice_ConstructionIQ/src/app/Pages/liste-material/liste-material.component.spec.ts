import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMaterialComponent } from './liste-material.component';

describe('ListeMaterialComponent', () => {
  let component: ListeMaterialComponent;
  let fixture: ComponentFixture<ListeMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeMaterialComponent]
    });
    fixture = TestBed.createComponent(ListeMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
