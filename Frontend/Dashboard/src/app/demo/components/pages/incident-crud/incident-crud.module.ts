import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentCrudComponent } from './incident-crud.component';
import { IncidentCrudRoutingModule } from './incident-crud-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';



@NgModule({
  declarations: [
    IncidentCrudComponent
  ],
  imports: [
    CommonModule,
        IncidentCrudRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        DialogModule

  ]
})
export class IncidentCrudModule { }
