import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:8081/construction';

  constructor(private http: HttpClient) { }

  getWeatherByCity(city: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/api/meteo/${city}`);
  }

  getProjectWeather(projectId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/projects/${projectId}/weather`);
  }

  testWeatherNotification(projectId: number, email: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/projects/test/weather-notification`, {
      params: {
        projectId: projectId.toString(),
        email: email
      }
    });
  }
}