import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProjectComponent } from './upload-project.component';

describe('UploadProjectComponent', () => {
  let component: UploadProjectComponent;
  let fixture: ComponentFixture<UploadProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadProjectComponent]
    });
    fixture = TestBed.createComponent(UploadProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
