package com.example.pi_project.Services;
import com.example.pi_project.Entities.*;
import com.example.pi_project.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AttendeeService {
    private final AttendeeRepository attendeeRepository;
    private final MeetingRepository meetingRepository;

    public AttendeeService(AttendeeRepository attendeeRepository, MeetingRepository meetingRepository) {
        this.attendeeRepository = attendeeRepository;
        this.meetingRepository = meetingRepository;
    }

    public Attendee addAttendee(String meetingTitle, Attendee attendee) {
        List<Meeting> meetings = meetingRepository.findByTitle(meetingTitle);

        if (meetings.isEmpty()) {
            throw new RuntimeException("Meeting not found with title: " + meetingTitle);
        } else if (meetings.size() > 1) {
            throw new RuntimeException("Multiple meetings found with title: " + meetingTitle);
        }

        Meeting meeting = meetings.get(0);
        attendee.setMeeting(meeting);
        return attendeeRepository.save(attendee);
    }

    public List<Attendee> getAttendeesByMeetingTitle(String meetingTitle) {
        List<Meeting> meetings = meetingRepository.findByTitle(meetingTitle);

        if (meetings.isEmpty()) {
            throw new RuntimeException("Meeting not found with title: " + meetingTitle);
        } else if (meetings.size() > 1) {
            throw new RuntimeException("Multiple meetings found with title: " + meetingTitle);
        }

        Meeting meeting = meetings.get(0);
        return attendeeRepository.findByMeetingId(meeting.getId());
    }

    public Attendee updateAttendeeByName(String name, Attendee updatedAttendee) {
        Attendee existingAttendee = attendeeRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("Attendee not found with name: " + name));

        existingAttendee.setName(updatedAttendee.getName());
        existingAttendee.setEmail(updatedAttendee.getEmail());
        existingAttendee.setTitle(updatedAttendee.getTitle());
        existingAttendee.setAttendanceType(updatedAttendee.getAttendanceType());
        existingAttendee.setAttendanceStatus(updatedAttendee.getAttendanceStatus());
        existingAttendee.setSafetyBriefingCompleted(updatedAttendee.isSafetyBriefingCompleted());

        return attendeeRepository.save(existingAttendee);
    }

    public void deleteAttendeeByName(String name) {
        Attendee attendee = attendeeRepository.findByNameIgnoreCase(name)
                .orElseThrow(() -> new RuntimeException("Attendee not found with name: " + name));
        attendeeRepository.delete(attendee);
    }
}