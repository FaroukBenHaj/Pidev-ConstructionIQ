import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistralChatComponent } from './mistral-chat.component';

describe('MistralChatComponent', () => {
  let component: MistralChatComponent;
  let fixture: ComponentFixture<MistralChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MistralChatComponent]
    });
    fixture = TestBed.createComponent(MistralChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
