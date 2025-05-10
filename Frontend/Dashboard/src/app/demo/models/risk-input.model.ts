export interface RiskInput {
    location: string;
    budget: number;
    incident_type: string;
    severity_level: string;
    days_to_deadline: number;
    injury_count: number;
    project_duration: number;
    completion_percentage: number;
    financial_impact?: number;
  }
  
  export interface RiskPredictionResponse {
    predicted_category: string;
    probabilities: { [category: string]: string }; 
  }
  