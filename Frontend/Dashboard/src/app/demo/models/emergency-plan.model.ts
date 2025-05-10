export interface EmergencyPlan {
    planID: number;
    project_id: number;
    riskAssessment: string;
    evacuationProcedure: string;
    responsiblePerson: string;
    lastReviewedDate: Date;
    version: string;
  }
  