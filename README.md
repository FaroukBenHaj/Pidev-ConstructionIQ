# ConstructionIQ - Meeting Management System

## Project Overview

ConstructionIQ is a comprehensive meeting management system tailored for construction projects, featuring a robust backend API powered by Spring Boot and an Angular-based frontend. The system facilitates efficient meeting management, enhanced by advanced analytics and an AI-powered chatbot for real-time insights.

## Features

### Backend (Spring Boot)

#### Meeting Management (CRUD Operations)

* **Create a Meeting**: Add a new meeting with complete details.

  * Endpoint: POST /PI_Project/meetings
* **View Meetings**:

  * All Meetings: GET /PI_Project/meetings
  * Specific Meeting by ID: GET /PI_Project/meetings/{id}
* **Update Meeting**: Modify details of an existing meeting.

  * Endpoint: PUT /PI_Project/meetings/{id}
* **Delete Meeting**: Remove a meeting from the system.

  * Endpoint: DELETE /PI_Project/meetings/{id}

#### Attendee Management

* **Add Attendees**:

  * Endpoint: POST /PI_Project/attendees/{meetingTitle}
* **View Attendees by Meeting**:

  * Endpoint: GET /PI_Project/attendees/meeting/{meetingTitle}
* **Update/Delete Attendees**:

  * Manage attendees by name.

#### AI-Powered Chatbot

* **AI Chatbot for Insights**: Ask questions about meeting efficiency.

  * Endpoint: POST /PI_Project/mistral/ask
* **Powered by Mistral (via Ollama local setup)**.

#### Reporting

* **Export Reports**:

  * Excel: GET /PI_Project/meetings/export/excel
  * PDF: GET /PI_Project/meetings/export/pdf

#### Advanced Analytics

* **Comprehensive Meeting Statistics**:

  * Full Report: GET /PI_Project/api/stats/full-report
  * Meetings Per Month: GET /PI_Project/api/stats/meetings-per-month
  * Meeting Effectiveness: GET /PI_Project/api/stats/meeting-effectiveness/{meetingId}

### Frontend (Angular)

* **User-Friendly Interface**:

  * View, manage, and track meetings.
  * Monitor attendee participation.
  * Visualize meeting statistics.
  * Interact with the AI chatbot.
  * Generate and download reports.

## Technical Stack

* **Backend**: Java, Spring Boot
* **Frontend**: Angular
* **Database**: MySQL
* **AI**: Mistral via Ollama local installation

## Setup Instructions

### Backend Setup

1. Clone the repository and navigate to the project directory.
2. Ensure all dependencies are installed.
3. Run the Spring Boot application on port 8050.

### AI Chatbot Setup

1. Install Ollama locally.
2. Download and set up the Mistral model.

### Frontend Setup

1. Run the Angular development server.
2. Configure the frontend to connect with the backend API.

## Usage Examples

* Schedule and manage safety training meetings.
* Track participant attendance and engagement.
* Analyze meeting effectiveness using AI insights.
* Export reports in PDF and Excel formats.
* Gain real-time insights with the AI chatbot.

## License

This project is developed for educational purposes as part of the ConstructionIQ system.