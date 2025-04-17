import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../Services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  editForm: FormGroup;
  projectId!: number;
  dateError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private projectService: ProjectService
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ\\s]+$")]],
      description: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9À-ÿ\\s*+\\-\\/&']+$")
      ]],
      startDate: ['', [Validators.required, this.futureOrPresentValidator]],
      endDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.min(1)]]
    }, { validator: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this.projectId = +this.route.snapshot.paramMap.get('id')!;
    this.loadProject();
    
    this.editForm.get('startDate')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
    this.editForm.get('endDate')?.valueChanges.subscribe(() => {
      this.validateDates();
    });
  }

  futureOrPresentValidator(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return { pastDate: true };
    }
    return null;
  }

  // Custom validator for date range
  dateRangeValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (!startDate || !endDate) {
      return null;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    return end >= start ? null : { dateRange: true };
  }

  validateDates() {
    const startDate = this.editForm.get('startDate')?.value;
    const endDate = this.editForm.get('endDate')?.value;

    if (!startDate || !endDate) {
      this.dateError = null;
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
      this.dateError = 'Start date must be today or in the future';
    } else if (end < start) {
      this.dateError = 'End date must be after start date';
    } else {
      this.dateError = null;
    }
  }

  loadProject() {
    this.projectService.getProjectById(this.projectId).subscribe(
      (project: Project) => {
        const formattedProject = {
          ...project,
          startDate: this.formatDate(project.startDate),
          endDate: this.formatDate(project.endDate)
        };
        this.editForm.patchValue(formattedProject);
        this.validateDates(); 
      },
      (error: any) => {
        console.error('Error loading project', error);
      }
    );
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    this.validateDates(); 
    
    if (this.editForm.valid && !this.dateError) {
      const updatedProject = this.editForm.value;
      this.projectService.updateProject(this.projectId, updatedProject).subscribe(
        () => {
          this.router.navigate(['/project-list']);
        },
        (error: any) => {
          console.error('Error updating project', error);
        }
      );
    }
  }
}