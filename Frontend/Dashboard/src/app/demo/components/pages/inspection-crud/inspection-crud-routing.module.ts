import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InspectionCrudComponent } from './inspection-crud.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: InspectionCrudComponent }
  ])],
  exports: [RouterModule]
})
export class InspectionCrudRoutingModule { }
