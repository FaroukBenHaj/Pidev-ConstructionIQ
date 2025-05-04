import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { SafetyDashboardComponent } from './Pages/safety-dashboard/safety-dashboard.component';

const routes: Routes = [

  { path : 'home' , component:HomePageComponent},
  { path: 'safety', component: SafetyDashboardComponent },
  { path : '' , redirectTo: '/home' , pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
