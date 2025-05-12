import { Component, OnInit } from '@angular/core';
import { ComplianceChecklist, ChecklistStatus } from 'src/app/demo/models/compliance-checklist.model';
import { ComplianceChecklistService } from 'src/app/demo/service/compliance-checklist.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { Inspection } from 'src/app/demo/models/inspection.model';
import { InspectionService } from 'src/app/demo/service/inspection.service';

@Component({
  selector: 'app-checklist-crud',
  templateUrl: './checklist-crud.component.html',
  styleUrls: ['./checklist-crud.component.scss'],
  providers: [MessageService]
})
export class ChecklistCrudComponent implements OnInit {
  checklistDialog: boolean = false;
  deleteChecklistDialog: boolean = false;
  deleteChecklistsDialog: boolean = false;
  checklists: ComplianceChecklist[] = [];
  checklist: ComplianceChecklist = {} as ComplianceChecklist;
  selectedChecklists: ComplianceChecklist[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  // Dropdown options for Inspections (full Inspection objects)
  inspectionOptions: { label: string, value: Inspection }[] = [];
  inspections: Inspection[] = [];
  // Selected inspection object
  selectedInspection?: Inspection;

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private checklistService: ComplianceChecklistService,
    private inspectionService: InspectionService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadChecklists();
    this.loadInspections();

    this.cols = [
      { field: 'checklistID', header: 'ID' },
      { field: 'inspection', header: 'Inspection' },
      { field: 'requirement', header: 'Requirement' },
      { field: 'status', header: 'Status' },
      { field: 'comments', header: 'Comments' }
    ];

    // Dropdown options for checklist status.
    this.statuses = [
      { label: 'MET', value: ChecklistStatus.MET },
      { label: 'NOT MET', value: ChecklistStatus.NOT_MET }
    ];
  }

  loadChecklists() {
    this.checklistService.getAllComplianceChecklists().subscribe(
      data => this.checklists = data,
      error => console.error('Error loading checklists', error)
    );
  }

  loadInspections() {
    this.inspectionService.getAllInspections().subscribe(
      data => {
        this.inspections = data;
        // Map each inspection to an option object.
        this.inspectionOptions = this.inspections.map(ins => ({
          label: `${ins.inspectionID} - ${ins.inspector}`,
          value: ins
        }));
      },
      error => console.error('Error loading inspections', error)
    );
  }

  openNew() {
    this.checklist = {} as ComplianceChecklist;
    this.selectedInspection = undefined;
    this.submitted = false;
    this.checklistDialog = true;
  }

  editChecklist(cl: ComplianceChecklist) {
    this.checklist = { ...cl };
    this.selectedInspection = cl.inspection;
    this.checklistDialog = true;
  }

  deleteChecklist(cl: ComplianceChecklist) {
    this.deleteChecklistDialog = true;
    this.checklist = { ...cl };
  }

  deleteSelectedChecklists() {
    this.deleteChecklistsDialog = true;
  }

  confirmDelete() {
    this.checklistService.deleteComplianceChecklist(this.checklist.checklistID).subscribe({
      next: () => {
        this.checklists = this.checklists.filter(val => val.checklistID !== this.checklist.checklistID);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Checklist Deleted', life: 3000 });
        this.deleteChecklistDialog = false;
        this.checklist = {} as ComplianceChecklist;
      },
      error: err => console.error('Error deleting checklist', err)
    });
  }

  confirmDeleteSelected() {
    const deleteObservables = this.selectedChecklists.map(cl =>
      this.checklistService.deleteComplianceChecklist(cl.checklistID)
    );
    Promise.all(deleteObservables.map(obs => obs.toPromise()))
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Checklists Deleted', life: 3000 });
        this.selectedChecklists = [];
        this.loadChecklists();
      })
      .catch(err => console.error('Error deleting selected checklists', err));
    this.deleteChecklistsDialog = false;
  }

  hideDialog() {
    this.checklistDialog = false;
    this.submitted = false;
  }

  saveChecklist() {
    this.submitted = true;
    // Validate required fields: requirement, status and inspection selection.
    if (this.checklist.requirement?.trim() && this.checklist.status && this.selectedInspection) {
      // Assign the selected inspection object.
      this.checklist.inspection = this.selectedInspection;
      if (this.checklist.checklistID) {
        // Update existing checklist.
        this.checklistService.updateComplianceChecklist(this.checklist.checklistID,this.checklist.inspection.inspectionID,this.checklist)
          .subscribe({
            next: updatedChecklist => {
              const index = this.findIndexById(updatedChecklist.checklistID);
              this.checklists[index] = updatedChecklist;
              this.loadChecklists();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Checklist Updated', life: 3000 });
              this.checklistDialog = false;
              this.checklist = {} as ComplianceChecklist;
              this.selectedInspection = undefined;
              this.submitted = false;
            },
            error: err => console.error('Error updating checklist', err)
          });
      } else {
        // Create new checklist.
        this.checklistService.createComplianceChecklist(this.checklist.inspection.inspectionID,this.checklist)
          .subscribe({
            next: createdChecklist => {
              this.checklists.push(createdChecklist);
              this.loadChecklists();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Checklist Created', life: 3000 });
              this.checklistDialog = false;
              this.checklist = {} as ComplianceChecklist;
              this.selectedInspection = undefined;
              this.submitted = false;
            },
            error: err => console.error('Error creating checklist', err)
          });
      }
    }
  }

  findIndexById(id: number): number {
    return this.checklists.findIndex(cl => cl.checklistID === id);
  }


  getInspectionDisplay(inspection: Inspection): string {
    return `${inspection.inspectionID} - ${inspection.inspector}`;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
