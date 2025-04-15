import { Component, OnInit,ViewChild } from '@angular/core';
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
  editingTaskId: number | null = null;
  displayEditTaskDialog = false;
  lastClickTime: number = 0;
  doubleClickDelay: number = 300; 
  constructor(
    private confirmationService: ConfirmationService, // Add this
    private taskService: TaskService,
    private projectService: ProjectService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private router: Router
  ) 
  {
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
      projectName: ['', Validators.required]
    });
  }

  showAddTaskDialog() {
    this.taskForm.reset({
      status: 'NOT_STARTED',
      priority: 'MEDIUM',
      progress: 0,
      startDate: new Date(),
      endDate: new Date()
    });
    this.displayTaskDialog = true;
  }

  onTaskSubmit() {
    if (this.taskForm.invalid) {
      this.markFormGroupTouched(this.taskForm);
      return;
    }
  
    const formValue = this.taskForm.value;
    
    // Check if end date is after start date
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
  
    // Calculate duration (in days)
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Extract project name directly for database storage
    let projectNameValue = formValue.projectName;
    
    // Handle if project is selected as object (from dropdown)
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
      projectName: projectNameValue
    };
  
    this.taskService.createTask(newTask, projectNameValue).subscribe(
      (createdTask) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task created successfully'
        });
        this.displayTaskDialog = false;
        this.loadTasks(); // Refresh the task list
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
    // Filter by project
    this.filteredTasks = this.selectedProject 
      ? this.tasks.filter(task => task.projectName === this.selectedProject?.name)
      : [...this.tasks];

    // Filter by year
    if (this.selectedYear) {
      this.filteredTasks = this.tasks.filter(task => {
        if (!task.startDate) return false;
        const taskYear = new Date(task.startDate).getFullYear();
        return taskYear === this.selectedYear;
      });
    }
  
    // Then filter by project if one is selected
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
    // Reset selected project when year changes
    this.selectedProject = null; 
    this.applyFilters();
    
    // Update calendar view to show the selected year
    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.gotoDate(new Date(this.selectedYear, 0, 1)); // Go to January 1st of selected year
      calendarApi.changeView('resourceTimelineYear'); // Switch to year view
    }
  }

  prepareCalendarData(): void {
    // Get unique projects for the filtered tasks
    const visibleProjects = new Set(
      this.filteredTasks.map(task => task.projectName || 'Unassigned')
    );
  
    // Update resources (projects) shown in the calendar
    this.resources = Array.from(visibleProjects).map(project => ({
      id: project,
      title: project
    }));
  
    // Update events (tasks)
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
  

    // Group resources by project
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


// Replace your getCalendarOptions method's eventClick property
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
    // Replace eventClick and remove the eventDblClick property
    eventClick: this.handleEventClick.bind(this),
    eventContent: this.customEventContent.bind(this),
    datesSet: this.handleDatesSet.bind(this)
  };
}

// Replace your handleEventClick method with this:
handleEventClick(info: any) {
  const currentTime = new Date().getTime();
  const timeSinceLastClick = currentTime - this.lastClickTime;
  
  // If this is a double click (within the delay threshold)
  if (timeSinceLastClick < this.doubleClickDelay) {
    clearTimeout(this.clickTimeout); // Cancel the single click action
    this.handleEventDoubleClick(info);
  } else {
    // This is a single click - set a timeout to wait for potential double click
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

// Add this class property at the top with other properties
private clickTimeout: any;


handleEventDoubleClick(info: any) {
  const taskId = parseInt(info.event.id);
  this.editingTaskId = taskId;
  const task = this.tasks.find(t => t.id === taskId);
  
  if (task) {
    // Find the project object that matches the task's project name
    const project = this.projects.find(p => p.name === task.projectName);
    
    // Populate the form with task data
    this.taskForm.patchValue({
      name: task.name,
      description: task.description,
      startDate: new Date(task.startDate),
      endDate: new Date(task.endDate),
      status: task.status,
      priority: task.priority,
      progress: task.progress || 0,  // Ensure progress has a default value
      projectName: project || task.projectName  // Use project object if found, otherwise fall back to name
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
  
  // Check if end date is after start date
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

  // Calculate duration (in days)
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Extract project name
  let projectNameValue = formValue.projectName;
  
  // Handle if project is selected as object (from dropdown)
  if (typeof formValue.projectName === 'object' && formValue.projectName !== null) {
    projectNameValue = formValue.projectName.name;
  }

  const updatedTask: Task = {
    id: this.editingTaskId,
    name: formValue.name,
    description: formValue.description,
    startDate: startDate,
    endDate: endDate,
    status: formValue.status,
    priority: formValue.priority,
    progress: formValue.progress,
    duration: duration,
    projectName: projectNameValue
  };

  this.taskService.updateTask(this.editingTaskId, updatedTask).subscribe(
    () => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Task updated successfully'
      });
      this.displayEditTaskDialog = false;
      this.editingTaskId = null;
      this.loadTasks(); // Refresh the task list
    },
    (error) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update task: ' + (error.message || 'Unknown error')
      });
    }
  );
}
updateCalendarOptions(): void {
  this.calendarOptions = {
    ...this.calendarOptions,
    resources: this.resources,
    events: this.events,
    initialDate: new Date(this.selectedYear, 0, 1) // Ensure year stays in sync
  };
  
  // Refresh the calendar view if it exists
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
      // Create a complete copy of the original task and then update only the dates
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
          // Update local task to avoid unnecessary reload
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
      // Create a complete copy of the original task and then update only the dates
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
          // Update local task to avoid unnecessary reload
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

  // Modified to include task name in confirmation message
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
        this.loadTasks(); // Refresh the task list
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