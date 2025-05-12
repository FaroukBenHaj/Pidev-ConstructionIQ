import { Component, OnInit } from '@angular/core';
import { AttendeeService } from '../../services/attendee.service';
import { Meeting } from 'src/app/models/meeting';
import { MeetingService } from 'src/app/services/meeting.service';
import { Observable } from 'rxjs';
import { AttendanceStatuses, Attendee, Titles } from 'src/app/models/attendee';

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.scss']
})
export class AttendeeComponent implements OnInit {
  attendee: Attendee = { name: "", email: "", title: null , attendanceStatus: null};

  attendees: Attendee[] = []; // List of attendees
  meetingTitle: string = ''; // To store the meeting title for filtering

  meetings: Observable<Meeting[]> = this.meetingService.getMeetings().pipe(()=> this.meetingService.getMeetings());

  attendanceStatuses = Object.entries(AttendanceStatuses).map(
      ([key, value]) => ({ key,value})
  );
  
  attendeeTitles = Object.entries(Titles).map(
      ([key, value]) => ({ key,value})
  );
   
  constructor(private attendeeService: AttendeeService, private meetingService: MeetingService) { }

  ngOnInit(): void {
    this.loadAttendees(); // Load attendees on component initialization
  }

  // Load attendees by meeting title
  loadAttendees() {
    if (this.meetingTitle) {
      this.attendeeService.getAttendeesByMeetingTitle(this.meetingTitle)
        .subscribe(
          (data: any[]) => {
            this.attendees = data;
          },
          (error) => {
            console.error('Error loading attendees', error);
          }
        );
    }
  }

  // Add an attendee
  onSubmit() {
    this.attendeeService.addAttendee(this.meetingTitle, this.attendee)
      .subscribe(
        (response) => {
          console.log('Attendee added successfully', response);
          alert('Attendee added successfully!');
          this.loadAttendees(); // Reload attendees after adding
          this.resetForm(); // Reset the form
        },
        (error) => {
          this.handleError(error); // Handle validation errors
        }
      );
  }
// Handle validation errors
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
  // Delete an attendee
  onDelete(name: string) {
    if (confirm('Are you sure you want to delete this attendee?')) {
      this.attendeeService.deleteAttendeeByName(name)
        .subscribe(response => {
          console.log('Attendee deleted successfully', response);
          alert('Attendee deleted successfully!');
          this.loadAttendees(); // Reload attendees after deletion
        }, error => {
          console.error('Error deleting attendee', error);
          alert('Error deleting attendee!');
        });
    }
  }

  // Update an attendee
  onEdit(attendee: any) {
    this.attendee = { ...attendee }; // Populate the form with the selected attendee data
  }

  // Reset the form
  resetForm() {
    this.attendee = { name: "", email: "", title: null, attendanceStatus: null};;
  }
}