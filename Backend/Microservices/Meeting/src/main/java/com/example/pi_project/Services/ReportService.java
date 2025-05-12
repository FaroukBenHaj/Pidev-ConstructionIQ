package com.example.pi_project.Services;
import com.example.pi_project.Entities.*;
import com.example.pi_project.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private MeetingRepository meetingRepository;

    public Report createReport(Report report) {
        return reportRepository.save(report);
    }

    public List<Report> getReportsByMeetingTitle(String meetingTitle) {
        // Find the meeting by title
        List<Meeting> meetings = meetingRepository.findByTitle(meetingTitle);

        if (meetings.isEmpty()) {
            throw new RuntimeException("Meeting not found with title: " + meetingTitle);
        } else if (meetings.size() > 1) {
            throw new RuntimeException("Multiple meetings found with title: " + meetingTitle);
        }

        Meeting meeting = meetings.get(0); // Get the first meeting

        // Fetch reports by meeting ID
        return reportRepository.findByMeetingId(meeting.getId());
    }
}