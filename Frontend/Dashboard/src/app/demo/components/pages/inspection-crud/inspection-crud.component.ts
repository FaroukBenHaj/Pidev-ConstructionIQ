import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Inspection, InspectionStatus } from 'src/app/demo/models/inspection.model';
import { InspectionService } from 'src/app/demo/service/inspection.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-inspection-crud',
  templateUrl: './inspection-crud.component.html',
  styleUrls: ['./inspection-crud.component.scss'],
  providers: [MessageService]
})
export class InspectionCrudComponent implements OnInit,AfterViewInit {
  inspectionDialog: boolean = false;
  deleteInspectionDialog: boolean = false;
  deleteInspectionsDialog: boolean = false;
  inspections: Inspection[] = [];
  inspection: Inspection = {} as Inspection;
  selectedInspections: Inspection[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private inspectionService: InspectionService, private messageService: MessageService,private cdr:ChangeDetectorRef) { }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.inspectionService.getAllInspections().subscribe(data => this.inspections = data);
    setTimeout(() => {
      this.inspection.status = InspectionStatus.PASSED; // or any default value
    });

    this.cols = [
      { field: 'inspectionID', header: 'ID' },
      { field: 'project_id', header: 'Project ID' },
      { field: 'inspector', header: 'Inspector' },
      { field: 'date', header: 'Date' },
      { field: 'findings', header: 'Findings' },
      { field: 'recommendations', header: 'Recommendations' },
      { field: 'status', header: 'Status' },
      { field: 'inspectionType', header: 'Inspection Type' }
    ];

    // Set up dropdown options for inspection status using the InspectionStatus enum
    this.statuses = [
      { label: 'PASSED', value: InspectionStatus.PASSED },
      { label: 'FAILED', value: InspectionStatus.FAILED },
      { label: 'PENDING_REVIEW', value: InspectionStatus.PENDING_REVIEW }
    ];
  }

  openNew() {
    this.inspection = {} as Inspection;
    this.submitted = false;
    this.inspectionDialog = true;
  }

  editInspection(inspection: Inspection) {
    this.inspection = { ...inspection };
    this.inspectionDialog = true;
  }

  deleteInspection(inspection: Inspection) {
    this.deleteInspectionDialog = true;
    this.inspection = { ...inspection };
  }

  deleteSelectedInspections() {
    this.deleteInspectionsDialog = true;
  }

  confirmDelete() {
    this.inspectionService.deleteInspection(this.inspection.inspectionID).subscribe({
      next: () => {
        this.inspections = this.inspections.filter(val => val.inspectionID !== this.inspection.inspectionID);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inspection Deleted', life: 3000 });
        this.deleteInspectionDialog = false;
        this.inspection = {} as Inspection;
      },
      error: err => console.error('Error deleting inspection', err)
    });
  }

  confirmDeleteSelected() {
    const deleteObservables = this.selectedInspections.map(ins =>
      this.inspectionService.deleteInspection(ins.inspectionID)
    );
    // Using Promise.all with toPromise conversion to wait for all delete calls
    Promise.all(deleteObservables.map(obs => obs.toPromise()))
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inspections Deleted', life: 3000 });
        this.selectedInspections = [];
        this.loadInspections();
      })
      .catch(err => console.error('Error deleting selected inspections', err));
    this.deleteInspectionsDialog = false;
  }

  hideDialog() {
    this.inspectionDialog = false;
    this.submitted = false;
  }

  saveInspection() {
    this.submitted = true;
    // Check that required fields are filled: project_id, inspector, date, and findings are required
    if (this.inspection.project_id && this.inspection.inspector?.trim() && this.inspection.date && this.inspection.findings?.trim()) {
      if (this.inspection.inspectionID) {
        // Update existing inspection
        this.inspectionService.updateInspection(this.inspection.inspectionID, this.inspection).subscribe({
          next: updatedInspection => {
            const index = this.findIndexById(updatedInspection.inspectionID);
            this.inspections[index] = updatedInspection;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inspection Updated', life: 3000 });
            this.inspectionDialog = false;
            this.inspection = {} as Inspection;
            this.submitted = false;
          },
          error: err => console.error('Error updating inspection', err)
        });
      } else {
        // Create new inspection
        this.inspectionService.createInspection(this.inspection).subscribe({
          next: createdInspection => {
            this.inspections.push(createdInspection);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Inspection Created', life: 3000 });
            this.inspectionDialog = false;
            this.inspection = {} as Inspection;
            this.submitted = false;
          },
          error: err => console.error('Error creating inspection', err)
        });
      }
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.inspections.length; i++) {
      if (this.inspections[i].inspectionID === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  loadInspections() {
    this.inspectionService.getAllInspections().subscribe(data => this.inspections = data);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
