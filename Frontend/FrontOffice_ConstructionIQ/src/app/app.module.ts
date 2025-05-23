import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';
import { UploadProjectComponent } from './upload-project/upload-project.component';
import { MatButtonModule } from '@angular/material/button'; 
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProjectListComponent } from './project-list/project-list.component'; 
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GranttChartComponent } from './grantt-chart/grantt-chart.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectStatisticsComponent } from './project-statistics/project-statistics.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PredictionComponent } from './prediction/prediction.component';
// PrimeNG Modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessageService } from 'primeng/api';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ActivateAccountComponent } from './Pages/activate-account/activate-account.component';
import { HeroSectionComponent } from './Pages/hero-section/hero-section.component';
import { DivisionsComponent } from './Pages/divisions/divisions.component';
import { ServicesComponent } from './Pages/services/services.component';
import { SafetyDashboardComponent } from './Pages/safety-dashboard/safety-dashboard.component';
import { ClaimListComponent } from './Pages/claim-list/claim-list.component';
import { AddClaimComponent } from './Pages/add-claim/add-claim.component';
import { ClaimDetailComponent } from './Pages/claim-detail/claim-detail.component';
import { ListeMaterialComponent } from './Pages/liste-material/liste-material.component';
import { MaterialComponent } from './Pages/material/material.component';
import { StockComponent } from './component/stock/stock.component';
import { AddStockComponent } from './component/stock/add-stock/add-stock.component';
import { ChartMaterialComponent } from './Pages/chart-material/chart-material.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';

// Budget Components
import { BudgetCreateComponent } from './component/budget/budget-create/budget-create.component';
import { BudgetEditComponent } from './component/budget/budget-edit/budget-edit.component';
import { BudgetShowComponent } from './component/budget/budget-show/budget-show.component';

// Commande Components
import { CommandeListComponent } from './component/commande/commande-list/commande-list.component';
import { CommandeCreateComponent } from './component/commande/commande-create/commande-create.component';
import { CommandeEditComponent } from './component/commande/commande-edit/commande-edit.component';
import { CommandeShowComponent } from './component/commande/commande-show/commande-show.component';

// Invoice Components
import { InvoiceListComponent } from './component/invoice/invoice-list/invoice-list.component';
import { InvoiceCreateComponent } from './component/invoice/invoice-create/invoice-create.component';
import { InvoiceEditComponent } from './component/invoice/invoice-edit/invoice-edit.component';
import { InvoiceShowComponent } from './component/invoice/invoice-show/invoice-show.component';

// Payment Components
import { PaymentListComponent } from './component/payment/payment-list/payment-list.component';
import { PaymentCreateComponent } from './component/payment/payment-create/payment-create.component';
import { PaymentEditComponent } from './component/payment/payment-edit/payment-edit.component';
import { PaymentShowComponent } from './component/payment/payment-show/payment-show.component';

// Services & Interceptors
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpTokenInterceptor } from './services/interceptors/http-token.interceptor';
import { StockService } from './services/Material/stock.service';
import { PdfService } from './services/pdf.service';
import { InvoicePdfService } from './services/invoicepdf.service';

// Other Modules
import { CodeInputModule } from 'angular-code-input';

export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    LoginComponent,
    UploadProjectComponent,
    ProjectListComponent,
    EditProjectComponent,
    GranttChartComponent,
    WeatherInfoComponent,
    ProjectStatisticsComponent,
    PredictionComponent,
    RegisterComponent,
    ActivateAccountComponent,
    HeroSectionComponent,
    DivisionsComponent,
    ServicesComponent,
    SafetyDashboardComponent,
    ClaimListComponent,
    AddClaimComponent,
    ClaimDetailComponent,
    ListeMaterialComponent,
    MaterialComponent,
    StockComponent,
    AddStockComponent,
    ChartMaterialComponent,
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
    RouterModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, 
    MatButtonModule,
    NgxFileDropModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule, 
    FullCalendarModule,
    DropdownModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    SliderModule,
    ConfirmDialogModule,
    TableModule,
    PanelModule,
    FieldsetModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    ToastModule,
    ConfirmDialogModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CodeInputModule,
    // PrimeNG Modules
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    ToastModule,
    MultiSelectModule,
    ProgressBarModule,
    SliderModule,
    RatingModule,
    RippleModule,
    ToggleButtonModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    StockService,
    KeycloakService,
    PdfService,
    InvoicePdfService,
    CurrencyPipe,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: kcFactory,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { 
  
  
}
