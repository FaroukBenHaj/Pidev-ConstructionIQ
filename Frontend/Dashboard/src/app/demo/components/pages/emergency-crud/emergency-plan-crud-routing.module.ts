import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmergencyCrudComponent } from './emergency-crud.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: EmergencyCrudComponent }
  ])],
  exports: [RouterModule]
})
export class EmergencyPlanCrudRoutingModule { }
