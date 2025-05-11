import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RiskPredictionResponse, RiskInput } from 'src/app/demo/models/risk-input.model';
import { RiskService } from 'src/app/demo/service/risk.service';

@Component({
  selector: 'app-risk-prediction',
  templateUrl: './risk-prediction.component.html',
  styleUrls: ['./risk-prediction.component.scss']
})
export class RiskPredictionComponent {
  riskForm: FormGroup;
  loading = false;
  error?: string;
  result?: RiskPredictionResponse;

  constructor(private fb: FormBuilder, private riskService: RiskService) {
    this.riskForm = this.fb.group({
      location: ['Tunis', Validators.required],
      budget: [100, [Validators.required, Validators.min(0)]],
      incident_type: ['Fire', Validators.required],
      severity_level: ['High', Validators.required],
      days_to_deadline: [30, Validators.required],
      injury_count: [0, [Validators.required, Validators.min(0)]],
      project_duration: [24, [Validators.required, Validators.min(1)]],
      completion_percentage: [75, [Validators.required, Validators.min(0), Validators.max(100)]],
      financial_impact: [null]
    });
  }

  onSubmit() {
    if (this.riskForm.invalid) {
      return;
    }
    this.loading = true;
    this.error = undefined;
    this.result = undefined;
    const input: RiskInput = this.riskForm.value;
    this.riskService.predictRisk(input).subscribe({
      next: res => {
        console.log(res);
        this.result = res;
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.error = err.message || 'Prediction failed';
        this.loading = false;
      }
    });
  }

  isNumberField(key: string): boolean {
    return ['budget','days_to_deadline','injury_count','project_duration','completion_percentage','financial_impact'].includes(key);
  }
}
