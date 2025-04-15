export interface Task {
    id?: number; 
    name: string;
    description: string;
    startDate: Date | string;  
    endDate: Date | string;
    status: string;
    duration: number;
    priority: string;
    projectName?: string;
    progress?: number;        

  }