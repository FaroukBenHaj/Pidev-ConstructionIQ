import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChecklistCrudComponent } from './checklist-crud.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: ChecklistCrudComponent }
  ])],
  exports: [RouterModule]
})
export class ChecklistCrudRoutingModule { }
