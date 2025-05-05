import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { SafetyDashboardComponent } from './Pages/safety-dashboard/safety-dashboard.component';
import {ClaimListComponent} from "./Pages/claim-list/claim-list.component";
import {AddClaimComponent} from "./Pages/add-claim/add-claim.component";
import {ClaimDetailComponent} from "./Pages/claim-detail/claim-detail.component";

const routes: Routes = [

  { path : 'home' , component:HomePageComponent},
  { path: 'safety', component: SafetyDashboardComponent },
  { path: 'claims', component: ClaimListComponent },
  { path: 'claims/add', component: AddClaimComponent },
  { path: 'claims/:id', component: ClaimDetailComponent },
  { path: 'claims/edit/:id', component: AddClaimComponent },
  { path : '' , redirectTo: '/home' , pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
