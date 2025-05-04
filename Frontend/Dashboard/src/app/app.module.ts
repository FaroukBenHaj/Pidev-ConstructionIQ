import { NgModule } from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
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
import { HttpClientModule } from '@angular/common/http';
import {APP_INITIALIZER} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";
import {HttpTokenInterceptor} from "./http-token.interceptor";
import {KeycloakService} from "./keycloak.service";
import { LoginMonitorComponent } from './login-monitor/login-monitor.component';


export function kcFactory(kcService: KeycloakService){
    return () => kcService.init();
  }
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, LoginMonitorComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        CommonModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
        ,
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

