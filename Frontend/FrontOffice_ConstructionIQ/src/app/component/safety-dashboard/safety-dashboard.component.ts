import { Component, OnInit } from '@angular/core';
import { Inspection } from 'src/models/inspection.model';
import { Incident, IncidentStatus } from 'src/models/incident.model';
import { ComplianceChecklist, ChecklistStatus } from 'src/models/compliance-checklist.model';
import { InspectionService } from 'src/app/services/inspection.service';
import { IncidentService } from 'src/app/services/incident.service';
import { ComplianceChecklistService } from 'src/app/services/compliance-checklist.service';
import * as L from 'leaflet';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-safety-dashboard',
  templateUrl: './safety-dashboard.component.html',
  styleUrls: ['./safety-dashboard.component.css']
})
export class SafetyDashboardComponent implements OnInit {

  inspections: Inspection[] = [];
  incidents: Incident[] = [];
  complianceChecklists: ComplianceChecklist[] = [];

  // Aggregated data for Compliance Checklists
  totalChecklists: number = 0;
  metCount: number = 0;
  notMetCount: number = 0;
  metPercentage: number = 0;
  notMetPercentage: number = 0;

  // Aggregated data for Incident Statistics
  openIncidents: number = 0;
  investigatingIncidents: number = 0;
  closedIncidents: number = 0;
  leafletMap: L.Map | null =null;
  constructor(
    private inspectionService: InspectionService,
    private incidentService: IncidentService,
    private complianceChecklistService: ComplianceChecklistService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/img/marker-icon-2x.png',
      iconUrl: 'assets/img/marker-icon.png',
      shadowUrl: 'assets/img/marker-shadow.png'
    });

    this.loadInspections();
    this.loadIncidents();
    this.loadComplianceChecklists();
  }

  loadInspections(): void {
    this.inspectionService.getAllInspections().subscribe(
      (data: Inspection[]) => {
        this.inspections = data;
      },
      error => {
        console.error('Error loading inspections', error);
      }
    );
  }

  loadIncidents(): void {
    this.incidentService.getAllIncidents().subscribe(
      (data: Incident[]) => {
        this.incidents = data;
        this.aggregateIncidentStats();
        this.initializeMap();
      },
      error => {
        console.error('Error loading incidents', error);
      }
    );
  }
  async initializeMap(): Promise<void> {
    // If the map already exists, remove it before creating a new one.
    if (this.leafletMap) {
      this.leafletMap.remove();
    }

    // Create the map instance using the map container id.
    this.leafletMap = L.map('incidentMap').setView([0, 0], 2);

    // Add OpenStreetMap tiles.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.leafletMap);

    // Loop through incidents and add markers.
    for (const incident of this.incidents) {
      if (incident.location) {
        try {
          const coords = await this.fetchCoordinates(incident.location);
          if (coords) {
            L.marker([coords.lat, coords.lon])
              .addTo(this.leafletMap)
              .bindPopup(`<b>${incident.description}</b><br>${incident.location}`);
          }
        } catch (error) {
          console.error('Geocoding error for location:', incident.location, error);
        }
      }
    }
  }

  // Use the Nominatim API to fetch coordinates for a location string.
  async fetchCoordinates(location: string): Promise<{ lat: number; lon: number } | null> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;
    try {
      const response: any = await firstValueFrom(this.http.get(url));
      if (Array.isArray(response) && response.length > 0) {
        const result = response[0];
        return { lat: parseFloat(result.lat), lon: parseFloat(result.lon) };
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
    return null;
  }

  loadComplianceChecklists(): void {
    this.complianceChecklistService.getAllComplianceChecklists().subscribe(
      (data: ComplianceChecklist[]) => {
        this.complianceChecklists = data;
        this.aggregateComplianceStats();
      },
      error => {
        console.error('Error loading compliance checklists', error);
      }
    );
  }

  aggregateComplianceStats(): void {
    this.totalChecklists = this.complianceChecklists.length;
    this.metCount = this.complianceChecklists.filter(cl => cl.status === ChecklistStatus.MET).length;
    this.notMetCount = this.complianceChecklists.filter(cl => cl.status === ChecklistStatus.NOT_MET).length;
    if (this.totalChecklists > 0) {
      this.metPercentage = Math.round((this.metCount / this.totalChecklists) * 100);
      this.notMetPercentage = 100 - this.metPercentage;
    } else {
      this.metPercentage = 0;
      this.notMetPercentage = 0;
    }
  }

  aggregateIncidentStats(): void {
    this.openIncidents = this.incidents.filter(i => i.status === IncidentStatus.OPEN).length;
    this.investigatingIncidents = this.incidents.filter(i => i.status === IncidentStatus.INVESTIGATING).length;
    this.closedIncidents = this.incidents.filter(i => i.status === IncidentStatus.CLOSED).length;
  }
}