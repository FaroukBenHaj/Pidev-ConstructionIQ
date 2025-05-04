import { Inspection } from './inspection.model';

export enum ChecklistStatus {
  MET = 'MET',
  NOT_MET = 'NOT_MET'
}

export interface ComplianceChecklist {
  checklistID: number;
  inspection: Inspection; 
  requirement: string;
  status: ChecklistStatus;
  comments?: string;
}
