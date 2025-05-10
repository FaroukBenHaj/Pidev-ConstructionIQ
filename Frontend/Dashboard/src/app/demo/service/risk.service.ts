import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RiskInput, RiskPredictionResponse } from '../models/risk-input.model';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  private apiUrl = 'http://localhost:8000/predict';

  constructor(private http: HttpClient) {}

  predictRisk(input: RiskInput): Observable<RiskPredictionResponse> {
    return this.http.post<RiskPredictionResponse>(this.apiUrl, input);
  }
}
