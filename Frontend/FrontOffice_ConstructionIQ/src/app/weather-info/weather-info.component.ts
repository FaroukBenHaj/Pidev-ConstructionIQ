import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project.model';
import { ProjectService } from '../Services/project.service';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {
  
  project: Project | null = null;
  weatherData: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.loadProject(projectId);  
  }

  loadProject(projectId: number): void {
    this.loading = true;
    this.error = null;
    
    this.projectService.getProjectById(projectId).subscribe({
      next: (project: Project) => {
        this.project = project;
        if (project?.ville) {
          this.loadWeatherData(project.ville);
        } else {
          this.error = 'No city specified for this project';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Failed to load project data';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadWeatherData(city: string): void {
    this.loading = true;
    this.projectService.checkWeatherRisk(this.project!.id).subscribe({
      next: (data: any) => {
        if (typeof data === 'string') {
          try {
            this.weatherData = JSON.parse(data);
          } catch {
            this.weatherData = {
              weather: [{ description: data }],
              main: { temp: null }
            };
          }
        } else {
          this.weatherData = data;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load weather data';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getWeatherIconUrl(iconCode: string): string {
    return iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : '';
  }

  hasRainWarning(): boolean {
    if (!this.weatherData?.weather) return false;
    const weatherDescription = this.weatherData.weather[0]?.description?.toLowerCase() || '';
    return weatherDescription.includes('rain') || 
           weatherDescription.includes('shower');
  }
}