import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
})
export class PredictionComponent {
  formData: any = {
    quality_rating: 0,
    delay_reason: 0,
    conditions_meteo: 0,
    estimated_budget: 0,
    complexity: 0,
    num_tasks: 0,
    num_resources: 0,
    safety_incidents: 0,
    planned_duration_days: 0,
    cost_overrun: 0,
  };

  predictionResult: string = '';

  fields = [
    { key: 'quality_rating', label: 'Quality Rating' },
    { key: 'delay_reason', label: 'Delay Reason' },
    { key: 'conditions_meteo', label: 'Weather Conditions' },
    { key: 'estimated_budget', label: 'Estimated Budget' },
    { key: 'complexity', label: 'Complexity' },
    { key: 'num_tasks', label: 'Number of Tasks' },
    { key: 'num_resources', label: 'Number of Resources' },
    { key: 'safety_incidents', label: 'Safety Incidents' },
    { key: 'planned_duration_days', label: 'Planned Duration (days)' },
    { key: 'cost_overrun', label: 'Cost Overrun' },
  ];

  constructor(private http: HttpClient) {}

  submitForm() {
    this.http.post<any>('http://localhost:5000/predict', this.formData).subscribe({
      next: (response) => {
        const prediction = response.prediction;
        if (prediction === 0) this.predictionResult = '✅ The project is on time.';
        else if (prediction === 1) this.predictionResult = '⛔ The project is delayed.';
        else if (prediction === 2) this.predictionResult = '🕒 The project is in progress.';
        else this.predictionResult = 'Unknown result.';
      },
      error: () => {
        this.predictionResult = 'Error connecting to the prediction server.';
      },
    });
  }
}
