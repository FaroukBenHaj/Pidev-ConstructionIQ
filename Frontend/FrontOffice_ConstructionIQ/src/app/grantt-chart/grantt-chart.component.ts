import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi } from '@fullcalendar/core';
import { MessageService } from 'primeng/api';
import { TaskService } from '../Services/task.service';
import { Task } from '../models/task.model';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { ProjectService } from '../Services/project.service';
import { Project } from '../models/project.model';
import { ConfirmationService } from 'primeng/api';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-grantt-chart',
  templateUrl: './grantt-chart.component.html',
  styleUrls: ['./grantt-chart.component.css'],
  providers: [MessageService]
})
export class GranttChartComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  events: any[] = [];
  resources: any[] = [];
  projects: Project[] = [];
  selectedProject: Project | null = null;
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();
  calendarOptions: CalendarOptions;
  displayTaskDialog = false;
  taskForm: FormGroup;
  dependentTasks: Task[] = [];
  displayDependencyDialog = false;
  displayAddDependencyDialog = false;
  availableDependencies: Task[] = [];
  selectedDependency: Task | null = null;
  currentTaskId: number | null = null;

  statusOptions = [
    { label: 'Not Started', value: 'NOT_STARTED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Completed', value: 'COMPLETED' }
  ];
  priorityOptions = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' }
  ];
  typeOptions = [
    { label: 'Bétonnage', value: 'bétonnage' },
    { label: 'Extérieur', value: 'extérieur' },
    { label: 'Intérieur', value: 'intérieur' },
    { label: 'Gros œuvre', value: 'gros œuvre' },
    { label: 'Second œuvre', value: 'second œuvre' }
];

risqueOptions = [
    { label: 'Faible', value: 'faible' },
    { label: 'Moyen', value: 'moyen' },
    { label: 'Élevé', value: 'élevé' }
];
  editingTaskId: number | null = null;
  displayEditTaskDialog = false;
  lastClickTime: number = 0;
  doubleClickDelay: number = 300; 
  
  constructor(
    private confirmationService: ConfirmationService, 
    private taskService: TaskService,
    private projectService: ProjectService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.calendarOptions = this.getCalendarOptions();
    this.taskForm = this.createTaskForm();
  }

  ngOnInit(): void {
    this.loadProjects();
    this.generateYearOptions();
    this.loadTasks();
  }

  createTaskForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      status: ['NOT_STARTED', Validators.required],
      priority: ['MEDIUM', Validators.required],
      progress: [0, [Validators.min(0), Validators.max(100)]],
      projectName: ['', Validators.required],
      budgetAllocation: [0, [Validators.min(0)]],
      type: ['', [Validators.required, Validators.pattern(/^(bétonnage|extérieur|intérieur|gros œuvre|second œuvre)$/)]],
      niveauRisque: ['faible']
    });
}

showAddTaskDialog() {
    this.taskForm.reset({
      status: 'NOT_STARTED',
      priority: 'MEDIUM',
      progress: 0,
      startDate: new Date(),
      endDate: new Date(),
      budgetAllocation: 0,
      type: '',
      niveauRisque: 'faible'
    });
    this.displayTaskDialog = true;
}

onTaskSubmit() {
  if (this.taskForm.invalid) {
      this.markFormGroupTouched(this.taskForm);
      return;
  }

  const formValue = this.taskForm.value;
  const startDate = new Date(formValue.startDate);
  const endDate = new Date(formValue.endDate);
  
  if (endDate < startDate) {
      this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'End date must be after start date'
      });
      return;
  }

  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let projectNameValue = formValue.projectName;
  
  if (typeof formValue.projectName === 'object' && formValue.projectName !== null) {
      projectNameValue = formValue.projectName.name;
  }

  const newTask: Task = {
      name: formValue.name,
      description: formValue.description,
      startDate: startDate,
      endDate: endDate,
      status: formValue.status,
      priority: formValue.priority,
      progress: formValue.progress,
      duration: duration,
      projectName: projectNameValue,
      budgetAllocation: formValue.budgetAllocation,
      type: formValue.type,
      niveauRisque: formValue.niveauRisque
  };

  this.taskService.createTask(newTask, projectNameValue).subscribe(
      (createdTask) => {
          this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Task created successfully'
          });
          this.displayTaskDialog = false;
          this.loadTasks();
      },
      (error) => {
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to create task: ' + (error.message || 'Unknown error')
          });
      }
  );
}
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load projects'
        });
      }
    );
  }

  generateYearOptions(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({length: 10}, (_, i) => currentYear + i);
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
        this.applyFilters();
      },
      (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load tasks'
        });
      }
    );
  }

  applyFilters(): void {
    this.filteredTasks = this.selectedProject 
      ? this.tasks.filter(task => task.projectName === this.selectedProject?.name)
      : [...this.tasks];

    if (this.selectedYear) {
      this.filteredTasks = this.tasks.filter(task => {
        if (!task.startDate) return false;
        const taskYear = new Date(task.startDate).getFullYear();
        return taskYear === this.selectedYear;
      });
    }
  
    if (this.selectedProject) {
      this.filteredTasks = this.filteredTasks.filter(task => 
        task.projectName === this.selectedProject?.name
      );
    }
    this.prepareCalendarData();
    this.updateCalendarOptions();
  }

  onProjectChange(): void {
    this.applyFilters();
  }

  onYearChange(): void {
    this.selectedProject = null; 
    this.applyFilters();
    
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.gotoDate(new Date(this.selectedYear, 0, 1)); 
      calendarApi.changeView('resourceTimelineYear'); 
    }
  }

  prepareCalendarData(): void {
    const visibleProjects = new Set(
      this.filteredTasks.map(task => task.projectName || 'Unassigned')
    );
  
    this.resources = Array.from(visibleProjects).map(project => ({
      id: project,
      title: project
    }));
  
    this.events = this.filteredTasks
      .filter(task => task.id !== undefined)
      .map(task => ({
        id: task.id!.toString(),
        title: task.name,
        start: task.startDate ? new Date(task.startDate) : new Date(),
        end: task.endDate ? new Date(task.endDate) : new Date(),
        resourceId: task.projectName || 'Unassigned',
        extendedProps: {
          description: task.description,
          status: task.status,
          priority: task.priority,
          progress: task.progress || 0
        },
        className: this.getPriorityClass(task.priority)
      }));
  

    const projects = new Set(this.filteredTasks.map(task => task.projectName || 'Unassigned'));
    this.resources = Array.from(projects).map(project => ({
      id: project,
      title: project
    }));
  }

  getPriorityClass(priority?: string): string {
    switch (priority?.toUpperCase()) {
      case 'HIGH': return 'fc-event-high';
      case 'MEDIUM': return 'fc-event-medium';
      case 'LOW': return 'fc-event-low';
      default: return '';
    }
  }

  getCalendarOptions(): CalendarOptions {
    return {
      plugins: [resourceTimelinePlugin, interactionPlugin],
      initialView: 'resourceTimelineYear',
      initialDate: new Date(this.selectedYear, 0, 1),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth,resourceTimelineYear'
      },
      editable: true,
      resourceAreaHeaderContent: 'Projects',
      resources: this.resources,
      events: this.events,
      eventDragStop: this.handleEventDragDrop.bind(this),
      eventResize: this.handleEventResize.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventContent: this.customEventContent.bind(this),
      datesSet: this.handleDatesSet.bind(this),
      
    };
  }

  handleEventClick(info: any) {
    const currentTime = new Date().getTime();
    
    if (this.lastClickTime && (currentTime - this.lastClickTime) < this.doubleClickDelay) {
      // Double click detected
      clearTimeout(this.clickTimeout);
      this.handleEventDoubleClick(info);
    } else {
      // Single click
      this.clickTimeout = setTimeout(() => {
        const taskId = parseInt(info.event.id);
        const task = this.tasks.find(t => t.id === taskId);
        
        if (task) {
          this.editingTaskId = taskId;
          this.confirmDeleteTask(task.name);
        }
      }, this.doubleClickDelay);
    }
    
    this.lastClickTime = currentTime;
  }

  private clickTimeout: any;

  handleEventDoubleClick(info: any) {
    const taskId = parseInt(info.event.id);
    this.editingTaskId = taskId;
    const task = this.tasks.find(t => t.id === taskId);
    
    if (task) {
        const project = this.projects.find(p => p.name === task.projectName);
        
        const startDate = typeof task.startDate === 'string' ? new Date(task.startDate) : task.startDate;
        const endDate = typeof task.endDate === 'string' ? new Date(task.endDate) : task.endDate;

        this.taskForm.patchValue({
            name: task.name,
            description: task.description,
            startDate: startDate,
            endDate: endDate,
            status: task.status,
            priority: task.priority,
            progress: task.progress || 0,
            projectName: project || task.projectName, 
            budgetAllocation: task.budgetAllocation || 0,
            type: task.type || '',
            niveauRisque: task.niveauRisque || 'faible'
        });
        
        this.displayEditTaskDialog = true;
    }
}
  
onTaskUpdate() {
  if (this.taskForm.invalid || this.editingTaskId === null) {
      this.markFormGroupTouched(this.taskForm);
      return;
  }

  const formValue = this.taskForm.value;
  const startDate = new Date(formValue.startDate);
  const endDate = new Date(formValue.endDate);
  
  if (endDate < startDate) {
      this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'End date must be after start date'
      });
      return;
  }

  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let projectName = formValue.projectName;
  if (projectName && typeof projectName === 'object') {
      projectName = projectName.name;
  }

  const payload = {
      id: this.editingTaskId,
      name: formValue.name,
      description: formValue.description,
      startDate: startDate,
      endDate: endDate,
      status: formValue.status,
      priority: formValue.priority,
      progress: formValue.progress || 0,
      duration: duration,
      projectName: projectName,
      budgetAllocation: formValue.budgetAllocation,
      type: formValue.type,
      niveauRisque: formValue.niveauRisque
  };

  console.log('Updating task with payload:', payload); 

  this.taskService.updateTask(this.editingTaskId, payload).subscribe({
      next: (response) => {
          this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Task updated successfully'
          });
          this.displayEditTaskDialog = false;
          this.editingTaskId = null;
          this.loadTasks();
      },
      error: (error) => {
          console.error('Update error:', error);
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error?.message || 'Failed to update task'
          });
      }
  });
}
  updateCalendarOptions(): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      resources: this.resources,
      events: this.events,
      initialDate: new Date(this.selectedYear, 0, 1) 
    };
    
    if (this.calendarComponent) {
      this.calendarComponent.getApi().render();
    }
  }

  customEventContent(arg: any) {
    const progress = arg.event.extendedProps.progress;
    const progressBar = progress > 0 ? 
      `<div class="progress-bar" style="width: ${progress}%;"></div>` : '';
    
    return {
      html: `
        <div class="gantt-event">
          <div class="event-title">${arg.event.title}</div>
          ${progressBar}
        </div>
      `
    };
  }

  handleEventDragDrop(info: any) {
    const taskId = parseInt(info.event.id);
    const originalTask = this.tasks.find(t => t.id === taskId);
    
    if (originalTask) {
      const updatedTask: Task = {
        ...originalTask,
        startDate: new Date(info.event.start),
        endDate: info.event.end ? new Date(info.event.end) : new Date(info.event.start)
      };
      
      this.taskService.updateTask(taskId, updatedTask).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Task updated successfully'
          });
          const taskIndex = this.tasks.findIndex(t => t.id === taskId);
          if (taskIndex !== -1) {
            this.tasks[taskIndex] = updatedTask;
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update task: ' + (error.message || 'Unknown error')
          });
          info.revert();
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Task not found'
      });
      info.revert();
    }
  }
  
  handleEventResize(info: any) {
    const taskId = parseInt(info.event.id);
    const originalTask = this.tasks.find(t => t.id === taskId);
    
    if (originalTask) {
      const updatedTask: Task = {
        ...originalTask,
        startDate: new Date(info.event.start),
        endDate: info.event.end ? new Date(info.event.end) : new Date(info.event.start)
      };
      
      this.taskService.updateTask(taskId, updatedTask).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Task duration updated successfully'
          });
          const taskIndex = this.tasks.findIndex(t => t.id === taskId);
          if (taskIndex !== -1) {
            this.tasks[taskIndex] = updatedTask;
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update task: ' + (error.message || 'Unknown error')
          });
          info.revert();
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Task not found'
      });
      info.revert();
    }
  }

  handleDatesSet(info: any) {
    console.log('View changed:', info.view.type);
  }

  confirmDeleteTask(taskName: string) {
    if (this.editingTaskId === null) {
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete task "${taskName}"?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTask();
      }
    });
  }

  deleteTask() {
    if (this.editingTaskId === null) {
      return;
    }

    this.taskService.deleteTask(this.editingTaskId).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task deleted successfully'
        });
        this.displayEditTaskDialog = false;
        this.editingTaskId = null;
        this.loadTasks();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete task: ' + (error.message || 'Unknown error')
        });
      }
    );
  }

  goToHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

 }