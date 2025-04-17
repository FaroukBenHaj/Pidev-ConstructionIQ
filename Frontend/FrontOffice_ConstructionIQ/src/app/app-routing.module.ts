import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';

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
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // Budget routes
  { path: 'budgets/create', component: BudgetCreateComponent },
  { path: 'budgets/edit/:id', component: BudgetEditComponent },
  { path: 'budgets/show/:id', component: BudgetShowComponent },
  { path: 'budgets', component: BudgetCreateComponent },    
  
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }