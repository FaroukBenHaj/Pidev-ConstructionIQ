import { Component } from '@angular/core';
import { Project } from '../models/project.model';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { Router } from '@angular/router';
import { ProjectService } from '../Services/project.service';
@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent {

files: NgxFileDropEntry[] = [];
  message: string = '';
  isUploading: boolean = false;
  isSuccess: boolean = false;

  constructor(private projectService: ProjectService, private router: Router) {}

  onFileDrop(files: NgxFileDropEntry[]) {
    this.files = files;
  }

  removeFile() {
    this.files = [];
    this.message = '';
  }

  uploadFiles() {
    if (this.files.length > 0) {
      this.isUploading = true;
      const fileEntry = this.files[0].fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        const formData = new FormData();
        formData.append('file', file, file.name);

        this.projectService.uploadPdf(formData).subscribe({
          next: (savedProject: Project) => {
            this.message = 'Project created successfully!';
            this.isSuccess = true;
            this.files = [];
            setTimeout(() => {
              this.router.navigate(['/project-list']);
            }, 700);
          },
          error: (error) => {
            this.message = error.error?.message || 'Error uploading PDF.';
            this.isSuccess = false;
          },
          complete: () => {
            this.isUploading = false;
          }
        });
      });
    } else {
      this.message = 'No files selected.';
    }
  }
  goToHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload(); 
    });
  }
  goToProjectList() {
    this.router.navigate(['/project-list']); 
  }

}