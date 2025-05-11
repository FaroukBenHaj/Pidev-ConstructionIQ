import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskPredictionRoutingModule } from './risk-prediction-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiskPredictionComponent } from './risk-prediction.component';


@NgModule({
  declarations: [
    RiskPredictionComponent
  ],
  imports: [
    CommonModule,
    RiskPredictionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RiskPredictionModule { }
