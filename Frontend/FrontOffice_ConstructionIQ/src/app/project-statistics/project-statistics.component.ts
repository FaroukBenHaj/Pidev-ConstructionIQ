import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectStatisticsDTO } from '../models/ProjectStaticsDto.model';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-project-statistics',
  templateUrl: './project-statistics.component.html',
  styleUrls: ['./project-statistics.component.css']
})
export class ProjectStatisticsComponent implements OnInit {
  @ViewChild('statusChart') statusChartRef!: ElementRef;
  @ViewChild('priorityChart') priorityChartRef!: ElementRef;
  @ViewChild('progressChart') progressChartRef!: ElementRef;

  statusChart: any;
  priorityChart: any;
  progressChart: any;

  constructor(
    public dialogRef: MatDialogRef<ProjectStatisticsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectStatisticsDTO
  ) {}

  ngOnInit(): void {
    // Delay chart creation to ensure view is initialized
    setTimeout(() => this.createCharts(), 0);
  }

  ngOnDestroy(): void {
    // Destroy charts to prevent memory leaks
    if (this.statusChart) this.statusChart.destroy();
    if (this.priorityChart) this.priorityChart.destroy();
    if (this.progressChart) this.progressChart.destroy();
  }

  createCharts(): void {
    this.createStatusChart();
    this.createPriorityChart();
    this.createProgressChart();
  }

  createStatusChart(): void {
    try {
      const ctx = this.statusChartRef?.nativeElement?.getContext('2d');
      if (!ctx) return;

      this.statusChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Completed', 'In Progress', 'Not Started'],
          datasets: [{
            data: [
              this.data.completedTasks,
              this.data.inProgressTasks,
              this.data.notStartedTasks
            ],
            backgroundColor: [
              '#4CAF50', // green
              '#FFC107', // amber
              '#F44336'  // red
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = (context.dataset.data as number[]).reduce((a, b) => Number(a) + Number(b), 0);
const percentage = total > 0 ? Math.round((Number(value) / total) * 100) : 0;

                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating status chart:', error);
    }
  }

  createPriorityChart(): void {
    try {
      if (!this.data.tasksByPriority || Object.keys(this.data.tasksByPriority).length === 0) return;

      const ctx = this.priorityChartRef?.nativeElement?.getContext('2d');
      if (!ctx) return;

      const priorityLabels = Object.keys(this.data.tasksByPriority);
      const priorityData = Object.values(this.data.tasksByPriority);
      
      this.priorityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: priorityLabels,
          datasets: [{
            label: 'Tasks by Priority',
            data: priorityData,
            backgroundColor: [
              '#2196F3', // blue
              '#9C27B0', // purple
              '#00BCD4', // cyan
              '#FF9800'  // orange
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Tasks'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Priority Level'
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.raw}`
              }
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating priority chart:', error);
    }
  }

  createProgressChart(): void {
    try {
      const ctx = this.progressChartRef?.nativeElement?.getContext('2d');
      if (!ctx) return;
  
      // Convert all values to numbers with proper fallbacks
      const overallProgress = typeof this.data.overallProgress === 'number' ? this.data.overallProgress : 0;
      const budgetUtilization = typeof this.data.budgetUtilization === 'number' ? this.data.budgetUtilization : 0;
      const completedTasks = typeof this.data.completedTasks === 'number' ? this.data.completedTasks : 0;
      const totalTasks = typeof this.data.totalTasks === 'number' ? this.data.totalTasks : 0;
  
      // Calculate chart values
      const completionRate = overallProgress * 100;
      const budgetRate = budgetUtilization;
      const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
      this.progressChart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['Completion Rate', 'Budget Utilization', 'Task Progress'],
          datasets: [{
            label: 'Project Metrics',
            data: [
              completionRate,
              budgetRate,
              taskCompletionRate
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            r: {
              angleLines: {
                display: true
              },
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }
      });
    } catch (error) {
      console.error('Error creating progress chart:', error);
    }
  }
  
  formatProgress(progress: number): string {
    return (progress * 100).toFixed(2) + '%';
  }

  onClose(): void {
    this.dialogRef.close();
  }
  hasPriorityTasks(): boolean {
  return this.data.tasksByPriority && Object.keys(this.data.tasksByPriority).length > 0;
}
}