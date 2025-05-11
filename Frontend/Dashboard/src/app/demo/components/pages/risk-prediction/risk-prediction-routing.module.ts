import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiskPredictionComponent } from './risk-prediction.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: RiskPredictionComponent }
  ])],
  exports: [RouterModule]
})
export class RiskPredictionRoutingModule { }
