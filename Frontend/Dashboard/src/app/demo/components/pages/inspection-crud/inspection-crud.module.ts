import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InspectionCrudComponent } from './inspection-crud.component';
import { InspectionCrudRoutingModule } from './inspection-crud-routing.module';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    InspectionCrudComponent
  ],
  imports: [
    CommonModule,
    InspectionCrudRoutingModule,
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
export class InspectionCrudModule { }
