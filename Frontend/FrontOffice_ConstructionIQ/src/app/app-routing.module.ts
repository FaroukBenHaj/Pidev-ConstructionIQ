import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
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
=======
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

// Budget components
import { BudgetCreateComponent } from './component/budget/budget-create/budget-create.component';
import { BudgetEditComponent } from './component/budget/budget-edit/budget-edit.component';
import { BudgetShowComponent } from './component/budget/budget-show/budget-show.component';

// Commande components
import { CommandeListComponent } from './component/commande/commande-list/commande-list.component';
import { CommandeCreateComponent } from './component/commande/commande-create/commande-create.component';
import { CommandeEditComponent } from './component/commande/commande-edit/commande-edit.component';
import { CommandeShowComponent } from './component/commande/commande-show/commande-show.component';

// Invoice components
import { InvoiceListComponent } from './component/invoice/invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from './component/invoice/invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './component/invoice/invoice-edit/invoice-edit.component';
import { InvoiceShowComponent } from './component/invoice/invoice-show/invoice-show.component';

// Payment components
import { PaymentListComponent } from './component/payment/payment-list/payment-list.component';
import { PaymentCreateComponent } from './component/payment/payment-create/payment-create.component';
import { PaymentEditComponent } from './component/payment/payment-edit/payment-edit.component';
import { PaymentShowComponent } from './component/payment/payment-show/payment-show.component';

const routes: Routes = [
  // Home
  { path: 'home', component: HomePageComponent },
  
  // Budget routes
  { path: 'budgets/create', component: BudgetCreateComponent },
  { path: 'budgets/edit/:id', component: BudgetEditComponent },
  { path: 'budgets/show/:id', component: BudgetShowComponent },
  { path: 'budgets', component: BudgetShowComponent },    
  
  // Commande routes
  { path: 'commandes', component: CommandeListComponent },
  { path: 'commandes/create', component: CommandeCreateComponent },
  { path: 'commandes/edit/:id', component: CommandeEditComponent },
  { path: 'commandes/show/:id', component: CommandeShowComponent },
  
  // Invoice routes
  { path: 'factures', component: InvoiceListComponent },
  { path: 'factures/create', component: InvoiceCreateComponent },
  { path: 'factures/edit/:id', component: InvoiceEditComponent },
  { path: 'factures/show/:id', component: InvoiceShowComponent },
  
  // Payment routes
  { path: 'paiements', component: PaymentListComponent },
  { path: 'paiements/create', component: PaymentCreateComponent },
  { path: 'paiements/edit/:id', component: PaymentEditComponent },
  { path: 'paiements/show/:id', component: PaymentShowComponent },

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

>>>>>>> main
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }