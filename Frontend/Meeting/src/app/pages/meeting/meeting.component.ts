import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service'; // Import the service
import { futureOrPresentDateValidator } from '../../Validators/custom-validators';
import { Frequencies, Meeting, MeetingTypes } from 'src/app/models/meeting';
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html', // Ensure this path is correct
  styleUrls: ['./meeting.component.scss'] // Ensure this path is correct
})
export class MeetingComponent implements OnInit {
  meeting: Meeting = null;

  meetingTypes = Object.entries(MeetingTypes).map(
    ([key, value]) => ({ key,value})
  );

  meetingFrequencies = Object.entries(Frequencies).map(
    ([key, value]) => ({ key,value})
  );

  meetings: Meeting[] = []; // List of meetings
  isEditMode: boolean = false; // To track if we are in edit mode
  editMeetingId: number | null = null; // To store the ID of the meeting being edited

  futureOrPresentDateValidator = futureOrPresentDateValidator;
  constructor(private meetingService: MeetingService) { } // Inject the service

  ngOnInit(): void {
    this.loadMeetings(); // Load meetings on component initialization
  }

  // Load all meetings
  loadMeetings() {
    this.meetingService.getMeetings().subscribe(
      (data: any[]) => {
        this.meetings = data;
      },
      (error) => {
        console.error('Error loading meetings', error);
      }
    );
  }

  // Submit the form (create or update a meeting)
  onSubmit() {
    if (this.isEditMode) {
      // If in edit mode, call the update method
      this.meetingService.updateMeetingById(this.editMeetingId!, this.meeting)
        .subscribe(response => {
          console.log('Meeting updated successfully', response);
          alert('Meeting updated successfully!');
          this.loadMeetings(); // Reload meetings after updating
          this.resetForm(); // Reset the form
        }, error => {
          this.handleError(error)
        });
    } else {
      // If not in edit mode, call the create method
      this.meetingService.createMeeting(this.meeting)
        .subscribe(response => {
          console.log('Meeting added successfully', response);
          alert('Meeting added successfully!');
          this.loadMeetings(); // Reload meetings after adding a new one
          this.resetForm(); // Reset the form
        }, error => {
          this.handleError(error);
        });
    }
  }
  handleError(error: any) {
    if (error.error && error.error.errors) {
      const errors = error.error.errors;
      let errorMessage = 'Validation errors:\n';

      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          errorMessage += `${field}: ${errors[field].join(', ')}\n`;
        }
      }

      alert(errorMessage); // Display custom error messages
    } else {
      alert('An unexpected error occurred. Please try again.'); // Generic error message
    }
  }
  // Edit a meeting
  onEdit(meeting: any) {
    this.isEditMode = true;
    this.editMeetingId = meeting.id;
    this.meeting = { ...meeting }; // Populate the form with the selected meeting data
  }

  // Delete a meeting
  onDelete(meeting: any) {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.meetingService.deleteMeetingById(meeting.id)
        .subscribe(response => {
          console.log('Meeting deleted successfully', response);
          alert('Meeting deleted successfully!');
          this.loadMeetings(); // Reload meetings after deletion
        }, error => {
          console.error('Error deleting meeting', error);
          alert('Error deleting meeting!');
        });
    }
  }

  // Reset the form
  resetForm() {
    this.meeting = null;
    this.isEditMode = false;
    this.editMeetingId = null;
  }
  // Export meetings to PDF
  onExportPdf() {
    this.meetingService.exportMeetingsToPdf().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meetings.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting PDF', error);
        alert('Error exporting PDF!');
      }
    );
  }

  // Export meetings to Excel
  onExportExcel() {
    this.meetingService.exportMeetingsToExcel().subscribe(
      (data: Blob) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'meetings.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error exporting Excel', error);
        alert('Error exporting Excel!');
      }
    );
  }
}