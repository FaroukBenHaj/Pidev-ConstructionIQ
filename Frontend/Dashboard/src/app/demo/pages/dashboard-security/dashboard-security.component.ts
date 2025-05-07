import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { IncidentService } from '../../../../../../../../../../Pidev-ConstructionIQ/Frontend/Dashboard/src/app/Demo/service/incident.service';
import { ComplianceChecklistService } from '../../../../../../../../../../Pidev-ConstructionIQ/Frontend/Dashboard/src/app/Demo/service/compliance-checklist.service';
import { InspectionService } from '../../../../../../../../../../Pidev-ConstructionIQ/Frontend/Dashboard/src/app/Demo/service/inspection.service';
import { EmergencyPlanService } from '../../../../../../../../../../Pidev-ConstructionIQ/Frontend/Dashboard/src/app/Demo/service/emergency-plan.service';

interface SummaryCard {
  label: string;
  value: string | number;
  icon: string;
  bgClass: string;
  iconColor: string;
  change: string;
  period: string;
  progress: number;
  progressClass: string;
}

interface Notification {
  title: string;
  message: string;
}

interface SelectOption {
  name: string;
  value: string;
}

@Component({
  selector: 'app-dashboard-security',
  templateUrl: './dashboard-security.component.html',
  styleUrls: ['./dashboard-security.component.scss']
})
export class DashboardSecurityComponent implements OnInit, OnDestroy {
  // Data arrays
  incidents = [] as any[];
  compliance = [] as any[];
  inspections = [] as any[];
  emergencyPlans = [] as any[];

  // Summary cards
  summaryCards = [] as SummaryCard[];

  // Notifications
  notifications = [] as Notification[];

  // Chart data and options
  incidentTrendData: any;
  severityDistData: any;
  complianceRateData: any;
  lineOptions: any;
  pieOptions: any;

  // View mode toggles
  viewModes: SelectOption[] = [
    { name: 'Grid', value: 'grid' },
    { name: 'Charts', value: 'charts' },
    { name: 'Table', value: 'table' }
  ];
  selectedView = this.viewModes[0].value;

  // Time filters for incident trend
  timeFilters: SelectOption[] = [
    { name: '7 Days', value: '7d' },
    { name: '30 Days', value: '30d' },
    { name: '90 Days', value: '90d' }
  ];
  selectedTimeFilter = this.timeFilters[0].value;

  private pollSub!: Subscription;

  constructor(
    private incidentSvc: IncidentService,
    private compSvc: ComplianceChecklistService,
    private inspSvc: InspectionService,
    private planSvc: EmergencyPlanService
  ) {
    // Chart options
    const baseOptions = {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    };
    this.lineOptions = {
      ...baseOptions,
      scales: { x: { title: { display: true, text: 'Date' } }, y: { title: { display: true, text: 'Count' } } }
    };
    this.pieOptions = { ...baseOptions };
  }

  ngOnInit() {
    this.loadAll();
    this.pollSub = interval(10000).subscribe(() => this.loadAll());
  }

  ngOnDestroy() {
    this.pollSub.unsubscribe();
  }

  private loadAll() {
    this.incidentSvc.getAllIncidents().subscribe(data => {
      this.incidents = data;
      this.buildIncidentCharts();
      this.buildNotifications();
      this.buildSummary();
    });

    this.compSvc.getAllComplianceChecklists().subscribe(data => {
      this.compliance = data;
      this.buildComplianceChart();
      this.buildSummary();
    });

    this.inspSvc.getAllInspections().subscribe(data => {
      this.inspections = data;
      this.buildSummary();
    });

    this.planSvc.getAllEmergencyPlans().subscribe(data => {
      this.emergencyPlans = data;
      this.buildSummary();
    });
  }

  private buildSummary() {
    const totalIncidents = this.incidents.length;
    const openInspections = this.inspections.filter(i => i.status !== 'PASSED').length;
    const met = this.compliance.filter(c => c.status === 'MET').length;
    const passRate = this.compliance.length ? Math.round(met / this.compliance.length * 100) : 0;
    const now = Date.now();
    const dueSoon = this.emergencyPlans.filter(p => {
      const diffDays = (new Date(p.lastReviewedDate).getTime() - now) / (1000*60*60*24);
      return diffDays >= 0 && diffDays < 30;
    }).length;

    this.summaryCards = [
      { label: 'Total Incidents', value: totalIncidents, icon: 'pi-exclamation-triangle', bgClass: 'critical', iconColor: 'text-red-500', change: '', period: '', progress: 0, progressClass: '' },
      { label: 'Open Inspections', value: openInspections, icon: 'pi-search', bgClass: 'warning', iconColor: 'text-orange-500', change: '', period: '', progress: 0, progressClass: '' },
      { label: 'Compliance Pass %', value: passRate + '%', icon: 'pi-check-circle', bgClass: 'safe', iconColor: 'text-green-500', change: '', period: '', progress: passRate, progressClass: 'p-progressbar-success' },
      { label: 'Plans Due < 30d', value: dueSoon, icon: 'pi-calendar-times', bgClass: 'info', iconColor: 'text-blue-500', change: '', period: '', progress: 0, progressClass: '' }
    ];
  }

  private buildNotifications() {
    const oneDay = 1000*60*60*24;
    const now = Date.now();
    this.notifications = this.incidents
      .filter(i => now - new Date(i.date).getTime() < oneDay)
      .slice(0,5)
      .map(i => ({ title: `Incident #${i.incidentID}`, message: `${i.severity} reported` }));
  }

  private buildIncidentCharts() {
    const counts: Record<string, number> = {};
    this.incidents.forEach(inc => {
      const day = new Date(inc.date).toLocaleDateString();
      counts[day] = (counts[day] || 0) + 1;
    });
    this.incidentTrendData = {
      labels: Object.keys(counts),
      datasets: [{ label: 'Incidents/day', data: Object.values(counts), fill: false, tension: 0.4 }]
    };

    const sevCount: Record<string, number> = {};
    this.incidents.forEach(inc => sevCount[inc.severity] = (sevCount[inc.severity] || 0) + 1);
    this.severityDistData = {
      labels: Object.keys(sevCount),
      datasets: [{ data: Object.values(sevCount), backgroundColor: ['#FF6384','#36A2EB','#FFCE56'] }]
    };
  }

  private buildComplianceChart() {
    const met = this.compliance.filter(c => c.status === 'MET').length;
    const notMet = this.compliance.length - met;
    this.complianceRateData = {
      labels: ['MET','NOT_MET'],
      datasets: [{ data: [met, notMet], backgroundColor: ['#4CAF50','#F44336'] }]
    };
  }

  getSeverityClass(sev: string) {
    return sev === 'HIGH' ? 'danger' : sev === 'MEDIUM' ? 'warning' : 'success';
  }
}
