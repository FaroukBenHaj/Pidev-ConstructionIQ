import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Layout components
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
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

// Services
import { PdfService } from './services/pdf.service';
import { InvoicePdfService } from './services/invoicepdf.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    BudgetCreateComponent,
    BudgetEditComponent,
    BudgetShowComponent,
    CommandeListComponent,
    CommandeCreateComponent,
    CommandeEditComponent,
    CommandeShowComponent,
    InvoiceListComponent,
    InvoiceCreateComponent,
    InvoiceEditComponent,
    InvoiceShowComponent,
    PaymentListComponent,
    PaymentCreateComponent,
    PaymentEditComponent,
    PaymentShowComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    PdfService,
    InvoicePdfService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }