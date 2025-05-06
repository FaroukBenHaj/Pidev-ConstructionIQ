import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { UploadProjectComponent } from './upload-project/upload-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { GranttChartComponent } from './grantt-chart/grantt-chart.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { PredictionComponent } from './prediction/prediction.component';

const routes: Routes = [
  { path: 'prediction', component: PredictionComponent },
  
  { path: 'home', component: HomePageComponent }, 
  { path: 'upload-project', component: UploadProjectComponent }, 
  { path: 'project-list', component: ProjectListComponent },
  { path: 'edit-project/:id', component: EditProjectComponent },
  { path: 'gantt', component: GranttChartComponent},
 {path: 'weather/:projectId',
  component: WeatherInfoComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
