import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpTokenInterceptor } from './http-token.interceptor';
// -- Remove these imports entirely --
// import { APP_INITIALIZER } from '@angular/core';
// import { KeycloakService } from './keycloak.service';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    // LoginMonitorComponent  <-- if this was only for Keycloak you can remove it too
  ],
  imports: [
    AppRoutingModule,
    AppLayoutModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CountryService,
    CustomerService,
    EventService,
    IconService,
    NodeService,
    PhotoService,
    ProductService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    // -- Remove the APP_INITIALIZER block below --
    // {
    //   provide: APP_INITIALIZER,
    //   deps: [KeycloakService],
    //   useFactory: kcFactory,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
