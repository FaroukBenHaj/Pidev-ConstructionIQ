import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';

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

import { ActivateAccountComponent } from './Pages/activate-account/activate-account.component';

import { ClaimListComponent } from './Pages/claim-list/claim-list.component';
import { AddClaimComponent } from './Pages/add-claim/add-claim.component';
import { ClaimDetailComponent } from './Pages/claim-detail/claim-detail.component';

// Services & Interceptors
import { KeycloakService } from './services/keycloak/keycloak.service';
import { HttpTokenInterceptor } from './services/interceptors/http-token.interceptor';
import { StockService } from './services/Material/stock.service';

// Other Modules
import { CodeInputModule } from 'angular-code-input';
import {MaterialComponent} from "./Pages/material/material.component";
import {ListeMaterialComponent} from "./Pages/liste-material/liste-material.component";
import {StockComponent} from "./component/stock/stock.component";
import {AddStockComponent} from "./component/stock/add-stock/add-stock.component";
import {ChartMaterialComponent} from "./Pages/chart-material/chart-material.component";
import {HomePageComponent} from "./Pages/home-page/home-page.component";
import {RegisterComponent} from "./Pages/register/register.component";
import {HeroSectionComponent} from "./Pages/hero-section/hero-section.component";
import {DivisionsComponent} from "./Pages/divisions/divisions.component";
import {ServicesComponent} from "./Pages/services/services.component";
import {SafetyDashboardComponent} from "./Pages/safety-dashboard/safety-dashboard.component";

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
    ChartMaterialComponent
  ],
  imports: [
    // Angular Modules
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

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
    ToggleButtonModule,

    // App Routing
    AppRoutingModule,

    // Other Modules
    CodeInputModule
  ],
  providers: [
    // Services
    MessageService,
    StockService,
    KeycloakService,

    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },

    // Keycloak Initializer
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },

    // Pipes
    CurrencyPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
