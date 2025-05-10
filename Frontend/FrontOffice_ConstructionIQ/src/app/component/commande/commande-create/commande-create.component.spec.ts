import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeCreateComponent } from './commande-create.component';

describe('CommandeCerateComponent', () => {
  let component: CommandeCreateComponent;
  let fixture: ComponentFixture<CommandeCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeCreateComponent]
    });
    fixture = TestBed.createComponent(CommandeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
