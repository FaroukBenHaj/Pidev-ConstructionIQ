import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { BudgetComponent } from './component/budget/budget.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { CommandeComponent } from './component/commande/commande.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { ShowBudgetComponent } from './component/budget/show-budget/show-budget.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    BudgetComponent,
    InvoiceComponent,
    CommandeComponent,
    BudgetDetailComponent,
    ShowBudgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule // ✅ Ajout ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
