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
import { MeetingComponent } from './pages/meeting/meeting.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AttendeeComponent } from './pages/attendee/attendee.component';
import { AddMeetingComponent } from './pages/add-meeting/add-meeting.component';
import { DropdownModule } from "primeng/dropdown";
import { MistralChatComponent } from './pages/mistral-chat/mistral-chat.component';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, MeetingComponent,AttendeeComponent, AddMeetingComponent, MistralChatComponent, DashboardComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        AppLayoutModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CalendarModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        TableModule,
        DropdownModule,
        CardModule,
        ProgressBarModule,
        CommonModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
