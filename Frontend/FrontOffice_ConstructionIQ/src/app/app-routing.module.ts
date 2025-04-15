import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { BudgetComponent } from './component/budget/budget.component';
import { CommandeComponent } from './component/commande/commande.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'commandes', component: CommandeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
