import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeEditComponent } from './commande-edit.component';

describe('CommandeEditComponent', () => {
  let component: CommandeEditComponent;
  let fixture: ComponentFixture<CommandeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeEditComponent]
    });
    fixture = TestBed.createComponent(CommandeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
