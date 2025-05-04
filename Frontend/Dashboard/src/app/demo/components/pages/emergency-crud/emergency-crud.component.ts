import { Component, OnInit } from '@angular/core';
import { EmergencyPlan } from 'src/app/demo/models/emergency-plan.model';
import { EmergencyPlanService } from 'src/app/demo/service/emergency-plan.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-emergency-crud',
  templateUrl: './emergency-crud.component.html',
  styleUrls: ['./emergency-crud.component.scss'],
  providers: [MessageService]
})
export class EmergencyCrudComponent implements OnInit {
  emergencyPlanDialog: boolean = false;
  deleteEmergencyPlanDialog: boolean = false;
  deleteEmergencyPlansDialog: boolean = false;
  emergencyPlans: EmergencyPlan[] = [];
  emergencyPlan: EmergencyPlan = {} as EmergencyPlan;
  selectedEmergencyPlans: EmergencyPlan[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(private emergencyPlanService: EmergencyPlanService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadEmergencyPlans();

    this.cols = [
      { field: 'planID', header: 'ID' },
      { field: 'project_id', header: 'Project ID' },
      { field: 'riskAssessment', header: 'Risk Assessment' },
      { field: 'evacuationProcedure', header: 'Evacuation Procedure' },
      { field: 'responsiblePerson', header: 'Responsible Person' },
      { field: 'lastReviewedDate', header: 'Last Reviewed Date' },
      { field: 'version', header: 'Version' }
    ];
  }

  loadEmergencyPlans() {
    this.emergencyPlanService.getAllEmergencyPlans().subscribe(
      (data: EmergencyPlan[]) => this.emergencyPlans = data,
      error => console.error('Error fetching emergency plans', error)
    );
  }

  openNew() {
    this.emergencyPlan = {} as EmergencyPlan;
    this.submitted = false;
    this.emergencyPlanDialog = true;
  }

  editEmergencyPlan(plan: EmergencyPlan) {
    this.emergencyPlan = { ...plan };
    this.emergencyPlanDialog = true;
  }

  deleteEmergencyPlan(plan: EmergencyPlan) {
    this.deleteEmergencyPlanDialog = true;
    this.emergencyPlan = { ...plan };
  }

  deleteSelectedEmergencyPlans() {
    this.deleteEmergencyPlansDialog = true;
  }

  confirmDelete() {
    this.emergencyPlanService.deleteEmergencyPlan(this.emergencyPlan.planID).subscribe({
      next: () => {
        this.emergencyPlans = this.emergencyPlans.filter(val => val.planID !== this.emergencyPlan.planID);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Emergency Plan Deleted', life: 3000 });
        this.deleteEmergencyPlanDialog = false;
        this.emergencyPlan = {} as EmergencyPlan;
      },
      error: err => console.error('Error deleting emergency plan', err)
    });
  }

  confirmDeleteSelected() {
    const deleteObservables = this.selectedEmergencyPlans.map(plan =>
      this.emergencyPlanService.deleteEmergencyPlan(plan.planID)
    );

    Promise.all(deleteObservables.map(obs => obs.toPromise()))
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Emergency Plans Deleted', life: 3000 });
        this.selectedEmergencyPlans = [];
        this.loadEmergencyPlans();
      })
      .catch(err => console.error('Error deleting selected emergency plans', err));

    this.deleteEmergencyPlansDialog = false;
  }

  hideDialog() {
    this.emergencyPlanDialog = false;
    this.submitted = false;
  }

  saveEmergencyPlan() {
    this.submitted = true;

    // Validate required fields (project_id, riskAssessment, evacuationProcedure, responsiblePerson, lastReviewedDate, version)
    if (
      this.emergencyPlan.project_id &&
      this.emergencyPlan.riskAssessment?.trim() &&
      this.emergencyPlan.evacuationProcedure?.trim() &&
      this.emergencyPlan.responsiblePerson?.trim() &&
      this.emergencyPlan.lastReviewedDate &&
      this.emergencyPlan.version?.trim()
    ) {
      if (this.emergencyPlan.planID) {
        // Update existing plan
        this.emergencyPlanService.updateEmergencyPlan(this.emergencyPlan.planID, this.emergencyPlan).subscribe({
          next: updatedPlan => {
            const index = this.findIndexById(updatedPlan.planID);
            this.emergencyPlans[index] = updatedPlan;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Emergency Plan Updated', life: 3000 });
            this.emergencyPlanDialog = false;
            this.emergencyPlan = {} as EmergencyPlan;
            this.submitted = false;
          },
          error: err => console.error('Error updating emergency plan', err)
        });
      } else {
        // Create new plan
        this.emergencyPlanService.createEmergencyPlan(this.emergencyPlan).subscribe({
          next: createdPlan => {
            this.emergencyPlans.push(createdPlan);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Emergency Plan Created', life: 3000 });
            this.emergencyPlanDialog = false;
            this.emergencyPlan = {} as EmergencyPlan;
            this.submitted = false;
          },
          error: err => console.error('Error creating emergency plan', err)
        });
      }
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.emergencyPlans.length; i++) {
      if (this.emergencyPlans[i].planID === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}