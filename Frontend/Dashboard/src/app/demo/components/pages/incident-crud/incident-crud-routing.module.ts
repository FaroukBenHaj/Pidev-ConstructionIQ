import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IncidentCrudComponent } from './incident-crud.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: IncidentCrudComponent }
  ])],
  exports: [RouterModule]
})
export class IncidentCrudRoutingModule { }
