import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { SafetyDashboardComponent } from './component/safety-dashboard/safety-dashboard.component';

const routes: Routes = [

  { path : 'home' , component:HomePageComponent},
  { path : '' , redirectTo: '/home' , pathMatch:'full'},
  { path: 'dashboard', component: SafetyDashboardComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
