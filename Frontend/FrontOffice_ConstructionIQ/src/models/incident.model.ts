export enum IncidentSeverity {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export enum IncidentStatus {
    OPEN = 'OPEN',
    INVESTIGATING = 'INVESTIGATING',
    CLOSED = 'CLOSED'
  }
  
  export interface Incident {
    incidentID: number;
    project_id: number;
    date: Date;
    description: string;
    severity: IncidentSeverity;
    status: IncidentStatus;
    location: string;
    actionsTaken: string;
    resolutionDate?: Date;
  }
  