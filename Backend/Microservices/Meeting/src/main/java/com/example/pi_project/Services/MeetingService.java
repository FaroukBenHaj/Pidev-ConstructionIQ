package com.example.pi_project.Services;
import com.example.pi_project.Entities.*;
import com.example.pi_project.Exceptions.ResourceNotFoundException;
import com.example.pi_project.Repositories.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MeetingService {
    @Autowired
    private MeetingRepository meetingRepository;

    public Meeting createMeeting(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public List<Meeting> getMeetingsByLocation(String location) {
        String normalizedLocation = normalizeLocation(location);
        return meetingRepository.findByLocationIgnoreCaseAndSpaces(normalizedLocation);
    }

    private String normalizeLocation(String location) {
        return location.toLowerCase().replaceAll("\\s", "");
    }

    public List<Meeting> getMeetingsByDate(LocalDate date) {
        return meetingRepository.findByDate(date);
    }

    public Meeting updateMeetingByTitleAndDate(String title, LocalDate date, Meeting meetingDetails) {
        Meeting meeting = meetingRepository.findByTitleAndDate(title, date)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found with title: " + title + " and date: " + date));

        updateMeetingFields(meeting, meetingDetails);
        return meetingRepository.save(meeting);
    }

    public void deleteMeetingByTitleAndDate(String title, LocalDate date) {
        Meeting meeting = meetingRepository.findByTitleAndDate(title, date)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found with title: " + title + " and date: " + date));
        meetingRepository.delete(meeting);
    }

    public Meeting updateMeetingById(Long id, Meeting meetingDetails) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found with id: " + id));

        updateMeetingFields(meeting, meetingDetails);
        return meetingRepository.save(meeting);
    }

    public void deleteMeetingById(Long id) {
        Meeting meeting = meetingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found with id: " + id));
        meetingRepository.delete(meeting);
    }

    // Helper method to update meeting fields
    private void updateMeetingFields(Meeting meeting, Meeting meetingDetails) {
        meeting.setTitle(meetingDetails.getTitle());
        meeting.setDate(meetingDetails.getDate());
        meeting.setDuration(meetingDetails.getDuration());
        meeting.setLocation(meetingDetails.getLocation());
        meeting.setAddress(meetingDetails.getAddress());
        meeting.setFrequency(meetingDetails.getFrequency());
        meeting.setType(meetingDetails.getType());
        meeting.setDescription(meetingDetails.getDescription());
    }
    public Meeting getMeetingById(Long id) {
        return meetingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found with id: " + id));
    }

}