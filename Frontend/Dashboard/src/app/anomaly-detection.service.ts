import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginAttempt} from "./LoginAttempt";

@Injectable({
  providedIn: 'root'
})
export class AnomalyDetectionService {
    private apiUrl = '/api/anomaly/detect';

    constructor(private http: HttpClient) { }

    detectAnomaly(attempts: LoginAttempt[]): Observable<string> {
        return this.http.post<string>(this.apiUrl, attempts);
    }
}
