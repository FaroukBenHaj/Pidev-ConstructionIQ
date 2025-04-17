import { Component, OnInit,ViewChild } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../Services/project.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectStatisticsComponent } from '../project-statistics/project-statistics.component';
import { MatDialog } from '@angular/material/dialog';
import { ProjectStatisticsDTO } from '../models/ProjectStaticsDto.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  displayedColumns: string[] = ['name', 'description', 'startDate', 'endDate', 'budget', 'actions','weather'];
  searchQuery: string = '';
  filteredProjects: Project[] = [];
  dataSource = new MatTableDataSource<Project>(); 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private projectService: ProjectService, private router: Router, private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadProjects();
  }
  viewWeather(projectId: number): void {
    this.router.navigate(['/weather', projectId]);
  }
  loadProjects() {
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        console.log('Projects from backend:', response); 
        this.projects = response; 
        this.dataSource.data = this.projects; 
        this.filteredProjects = this.projects;
      },
      (error) => {
        console.error('Error loading projects', error);
      }
    );

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onSearch() {
    if (this.searchQuery) {
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProjects = this.projects; 
    }
    this.dataSource.data = this.filteredProjects;
  }

  onProjectSelected(event: any) {
    const selectedProjectName = event.option.value;
    const selectedProject = this.projects.find(project => project.name === selectedProjectName);
    if (selectedProject) {
      this.router.navigate(['/edit-project', selectedProject.id]); 
    }
  }

  navigateToUploadProject() {
    this.router.navigate(['/upload-project']);
  }

  deleteProject(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          this.loadProjects();
        },
        (error) => {
          console.error('Error deleting project', error);
        }
      );
    }
  }
  goToHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload(); 
    });
  }
  onRowDoubleClick(project: Project): void {
    this.projectService.getProjectStatistics(project.id).subscribe(
      (stats: ProjectStatisticsDTO) => {  // Now using the properly imported type
        this.dialog.open(ProjectStatisticsComponent, {
          width: '800px',
          data: stats
        });
      },
      (error: any) => {
        console.error('Error loading project statistics', error);
      }
    );
  }
}