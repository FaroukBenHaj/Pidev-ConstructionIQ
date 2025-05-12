export interface ProjectStatisticsDTO {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    notStartedTasks: number;
    overallProgress: number;
    tasksByPriority: { [key: string]: number };
    tasksByStatus: { [key: string]: number };
    budgetUtilization: number;
    overdueTasks: number;
    tasksDueSoon: number;
  }