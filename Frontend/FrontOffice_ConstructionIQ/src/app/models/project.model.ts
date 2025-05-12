import { Task } from "./task.model";
export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: Date; 
    endDate: Date;   
    budget: number;
    task?: Task[];
    ville?: string;


  }