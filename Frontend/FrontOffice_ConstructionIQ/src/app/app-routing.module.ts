import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./Pages/login/login.component";
import {RegisterComponent} from "./Pages/register/register.component";
import {ActivateAccountComponent} from "./Pages/activate-account/activate-account.component";
import { authGuard } from './services/guard/auth.guard';
import {HomePageComponent} from "./Pages/home-page/home-page.component";

const routes: Routes = [
  { path : 'home' , component:HomePageComponent },
  { path : 'login' , component:LoginComponent},
  { path : 'register' , component:RegisterComponent},
  { path : 'activate-account' , component:ActivateAccountComponent},
  { path : '' , redirectTo:'home', pathMatch:'full'},//redirect to the entity


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
