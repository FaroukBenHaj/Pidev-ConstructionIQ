import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/demo/models/incident.model';
import { IncidentService } from 'src/app/demo/service/incident.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-incident-crud',
  templateUrl: './incident-crud.component.html',
  styleUrls: ['./incident-crud.component.scss'],
  providers: [MessageService]
})
export class IncidentCrudComponent implements OnInit{
  incidentDialog: boolean = false;
  deleteIncidentDialog: boolean = false;
  deleteIncidentsDialog: boolean = false;
  incidents: Incident[] = [];
  incident: Incident = {} as Incident;
  selectedIncidents: Incident[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  //severities: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];
  constructor(private incidentService: IncidentService, private messageService: MessageService) { }
  ngOnInit() {
    this.incidentService.getAllIncidents().subscribe(data => this.incidents = data);

    this.cols = [
        { field: 'incidentID', header: 'ID' },
        { field: 'project_id', header: 'Project ID' },
        { field: 'date', header: 'Date' },
        { field: 'description', header: 'Description' },
        { field: 'severity', header: 'Severity' },
        { field: 'status', header: 'Status' },
        { field: 'location', header: 'Location' },
        { field: 'resolutionDate', header: 'Resolution Date' }
    ];

    

    this.statuses = [
        { label: 'OPEN', value: 'OPEN' },
        { label: 'INVESTIGATING', value: 'INVESTIGATING' },
        { label: 'CLOSED', value: 'CLOSED' }
    ];
}
openNew() {
  this.incident = {} as Incident;
  this.submitted = false;
  this.incidentDialog = true;
}
deleteSelectedIncidents() {
  this.deleteIncidentsDialog = true;
}
editIncident(incident: Incident) {
  this.incident = { ...incident };
  this.incidentDialog = true;
}
deleteIncident(incident: Incident) {
  this.deleteIncidentDialog = true;
  this.incident = { ...incident };
}
confirmDeleteSelected() {
  this.deleteIncidentsDialog = false;
  this.incidentService.deleteIncident(this.incident.incidentID).subscribe(()=>{
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Incidents Deleted', life: 3000 });
  })
  
  this.selectedIncidents = [];
}
confirmDelete() {
  this.incidentService.deleteIncident(this.incident.incidentID).subscribe({
      next: () => {
          this.incidents = this.incidents.filter(val => val.incidentID !== this.incident.incidentID);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Incident Deleted', life: 3000 });
          this.deleteIncidentDialog = false;
          this.incident = {} as Incident;
      },
      error: err => console.error('Error deleting incident', err)
  });
}
hideDialog() {
  this.incidentDialog = false;
  this.submitted = false;
}
saveIncident() {
  this.submitted = true;

  if (this.incident.description?.trim()) {
      if (this.incident.incidentID) {
          this.incidentService.updateIncident(this.incident.incidentID, this.incident).subscribe({
              next: updatedIncident => {
                  const index = this.findIndexById(updatedIncident.incidentID);
                  this.incidents[index] = updatedIncident;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Incident Updated', life: 3000 });
                  this.incidentDialog = false;
                  this.incident = {} as Incident;
              },
              error: err => console.error('Error updating incident', err)
          });
      } else {
          this.incidentService.createIncident(this.incident).subscribe({
              next: createdIncident => {
                  this.incidents.push(createdIncident);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Incident Created', life: 3000 });
                  this.incidentDialog = false;
                  this.incident = {} as Incident;
              },
              error: err => console.error('Error creating incident', err)
          });
      }
  }
}
findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.incidents.length; i++) {
      if (this.incidents[i].incidentID === id) {
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
