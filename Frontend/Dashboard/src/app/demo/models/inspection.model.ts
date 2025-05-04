import { ComplianceChecklist } from "./compliance-checklist.model";


export enum InspectionStatus {
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  PENDING_REVIEW = 'PENDING_REVIEW'
}

export interface Inspection {
  inspectionID: number;
  project_id: number;
  inspector: string;
  date: Date;
  findings: string;
  recommendations: string;
  status: InspectionStatus;
  inspectionType: string;
  complianceChecklists?: ComplianceChecklist[];
}
