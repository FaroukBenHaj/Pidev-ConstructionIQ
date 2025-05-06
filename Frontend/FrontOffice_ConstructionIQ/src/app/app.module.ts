import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { UploadProjectComponent } from './upload-project/upload-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { MatButtonModule } from '@angular/material/button'; 
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProjectListComponent } from './project-list/project-list.component'; 
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms'; 
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GranttChartComponent } from './grantt-chart/grantt-chart.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { MessageModule } from 'primeng/message';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProjectStatisticsComponent } from './project-statistics/project-statistics.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PredictionComponent } from './prediction/prediction.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    UploadProjectComponent,
    ProjectListComponent,
    EditProjectComponent,
    GranttChartComponent,
    WeatherInfoComponent,
    ProjectStatisticsComponent,
    PredictionComponent,
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
    MatButtonModule





  ],
  providers: [    MessageService,  ConfirmationService
],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
  
}
