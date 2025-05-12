import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeShowComponent } from './commande-show.component';

describe('CommandeShowComponent', () => {
  let component: CommandeShowComponent;
  let fixture: ComponentFixture<CommandeShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeShowComponent]
    });
    fixture = TestBed.createComponent(CommandeShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
