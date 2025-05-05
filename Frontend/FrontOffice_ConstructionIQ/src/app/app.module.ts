import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Pages/header/header.component';
import { FooterComponent } from './Pages/footer/footer.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './Pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './Pages/register/register.component';
import { ActivateAccountComponent } from './Pages/activate-account/activate-account.component';
import {CodeInputModule} from "angular-code-input";
import {KeycloakService} from "./services/keycloak/keycloak.service";
import { HeroSectionComponent } from './Pages/hero-section/hero-section.component';
import { DivisionsComponent } from './Pages/divisions/divisions.component';
import { ServicesComponent } from './Pages/services/services.component';
import {HttpTokenInterceptor} from "./services/interceptors/http-token.interceptor";
import {SafetyDashboardComponent} from "./Pages/safety-dashboard/safety-dashboard.component";
import { ClaimListComponent } from './Pages/claim-list/claim-list.component';
import { AddClaimComponent } from './Pages/add-claim/add-claim.component';
import { ClaimDetailComponent } from './Pages/claim-detail/claim-detail.component';
import {RouterModule} from "@angular/router";

export function kcFactory (kcService: KeycloakService) {
return () => kcService.init();
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    SafetyDashboardComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    HeroSectionComponent,
    DivisionsComponent,
    ServicesComponent,
    ClaimListComponent,
    AddClaimComponent,
    ClaimDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CodeInputModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
