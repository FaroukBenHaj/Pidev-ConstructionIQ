import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ListeMaterialComponent } from './component/liste-material/liste-material.component';
import { MaterialComponent } from './component/material/material.component';
import { StockComponent } from './component/stock/stock.component'; // Import StockComponent
import { AddStockComponent } from './component/stock/add-stock/add-stock.component';
import { ChartMaterialComponent } from './chart-material/chart-material.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'ListeMaterial', component: ListeMaterialComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'material', component: MaterialComponent },
  { path: 'chart', component:ChartMaterialComponent },

  { path: 'material/:id', component: MaterialComponent },  // Route pour mettre à jour un matériau

  { path: 'stock', component: StockComponent }, // Route pour afficher les stocks
  { path: 'add-stock', component: AddStockComponent }, // Route pour ajouter un stock
  { path: '**', redirectTo: '/home' } // Si aucune route ne correspond, rediriger vers /home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
