import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomePageComponent } from './component/home-page/home-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListeMaterialComponent } from './component/liste-material/liste-material.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { StockComponent } from './component/stock/stock.component';
import { MaterialComponent } from './component/material/material.component';
import { StockService } from './service/stock.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddStockComponent } from './component/stock/add-stock/add-stock.component'; // Assurez-vous d'importer cela

import { ChartMaterialComponent } from './chart-material/chart-material.component';
import { CalendarModule } from 'primeng/calendar';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    MaterialComponent,
    ListeMaterialComponent,
    StockComponent,
    AddStockComponent,
    ChartMaterialComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule, // Correct import
    HttpClientModule,
    TableModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    BrowserAnimationsModule,
    CalendarModule
    
 
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
