import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './component/stock/stock.component'; // Import StockComponent
import { AddStockComponent } from './component/stock/add-stock/add-stock.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { SafetyDashboardComponent } from './Pages/safety-dashboard/safety-dashboard.component';
import {ClaimListComponent} from "./Pages/claim-list/claim-list.component";
import {AddClaimComponent} from "./Pages/add-claim/add-claim.component";
import {ClaimDetailComponent} from "./Pages/claim-detail/claim-detail.component";
import {MaterialComponent} from "./Pages/material/material.component";
import {ChartMaterialComponent} from "./Pages/chart-material/chart-material.component";
import {ListeMaterialComponent} from "./Pages/liste-material/liste-material.component";

const routes: Routes = [
  { path: 'home', component: HomePageComponent },

  //Stock
  { path: 'ListeMaterial', component: ListeMaterialComponent },
  { path: 'material', component: MaterialComponent },
  { path: 'chart', component:ChartMaterialComponent },
  { path: 'material/:id', component: MaterialComponent },  // Route pour mettre à jour un matériau
  { path: 'add-stock/:id', component: AddStockComponent },
  { path: 'stock', component: StockComponent }, // Route pour afficher les stocks
  { path: 'add-stock', component: AddStockComponent }, // Route pour ajouter un stock

  //Safety
  { path: 'safety', component: SafetyDashboardComponent },

  //Reclammation
  { path: 'claims', component: ClaimListComponent },
  { path: 'claims/add', component: AddClaimComponent },
  { path: 'claims/:id', component: ClaimDetailComponent },
  { path: 'claims/edit/:id', component: AddClaimComponent },
  { path : '' , redirectTo: '/home' , pathMatch:'full'},
  { path: '**', redirectTo: '/home' } // Si aucune route ne correspond, rediriger vers /home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
