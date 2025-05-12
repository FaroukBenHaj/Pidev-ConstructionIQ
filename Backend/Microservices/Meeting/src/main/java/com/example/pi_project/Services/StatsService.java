package com.example.pi_project.Services;

import com.example.pi_project.Entities.Attendee;
import com.example.pi_project.Entities.Meeting;
import com.example.pi_project.Exceptions.ResourceNotFoundException;
import com.example.pi_project.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatsService {

    @Autowired
    private MeetingRepository meetingRepository;

    @Autowired
    private AttendeeRepository attendeeRepository;

    // 1. Meetings per month
    public Map<String, Long> getMeetingsPerMonth() {
        return meetingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        meeting -> String.format("%d-%02d",
                                meeting.getDate().getYear(),
                                meeting.getDate().getMonthValue()),
                        Collectors.counting()
                ));
    }

    // 2. Meetings distribution by type
    public Map<Meeting.MeetingType, Long> getMeetingsByType() {
        return meetingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        Meeting::getType,
                        Collectors.counting()
                ));
    }

    // 3. Average meeting duration
    public double getAverageMeetingDuration() {
        return meetingRepository.findAll()
                .stream()
                .mapToInt(Meeting::getDuration)
                .average()
                .orElse(0.0);
    }

    // 4. Attendance statistics
    public Map<String, Long> getAttendanceStats() {
        return attendeeRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        attendee -> attendee.getAttendanceStatus().getDisplayName(),
                        Collectors.counting()
                ));
    }

    // 5. Attendance type distribution (in-person/remote/hybrid)
    public Map<String, Long> getAttendanceTypeDistribution() {
        return attendeeRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        attendee -> attendee.getAttendanceType().getDisplayName(),
                        Collectors.counting()
                ));
    }

    // 6. Participant roles distribution
    public Map<String, Long> getParticipantRolesDistribution() {
        return attendeeRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        attendee -> attendee.getTitle().getDisplayName(),
                        Collectors.counting()
                ));
    }

    // 7. Safety briefing completion rate
    public double getSafetyBriefingCompletionRate() {
        long total = attendeeRepository.count();
        if (total == 0) return 0.0;

        long completed = attendeeRepository.countBySafetyBriefingCompleted(true);
        return (completed * 100.0) / total;
    }

    // 8. Meeting frequency distribution
    public Map<String, Long> getMeetingFrequencyDistribution() {
        return meetingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        meeting -> meeting.getFrequency().getDisplayName(),
                        Collectors.counting()
                ));
    }

    // 9. Comprehensive statistics report
    public Map<String, Object> getFullStatisticsReport() {
        Map<String, Object> report = new LinkedHashMap<>();

        report.put("meetingsPerMonth", getMeetingsPerMonth());
        report.put("meetingsByType", getMeetingsByType());
        report.put("averageDurationMinutes", getAverageMeetingDuration());
        report.put("attendanceStats", getAttendanceStats());
        report.put("attendanceTypeDistribution", getAttendanceTypeDistribution());
        report.put("participantRoles", getParticipantRolesDistribution());
        report.put("safetyBriefingCompletionRate", getSafetyBriefingCompletionRate());
        report.put("meetingFrequency", getMeetingFrequencyDistribution());

        return report;
    }
    // 1. Meeting Effectiveness Score
    public Map<String, Object> getMeetingEffectiveness(Long meetingId) {
        Meeting meeting = meetingRepository.findById(meetingId)
                .orElseThrow(() -> new ResourceNotFoundException("Meeting not found with id: " + meetingId));

        long totalAttendees = meeting.getAttendees().size();
        long attended = meeting.getAttendees().stream()
                .filter(a -> a.getAttendanceStatus() == Attendee.AttendanceStatus.ATTENDED)
                .count();

        double attendanceRate = (totalAttendees > 0) ? (attended * 100.0 / totalAttendees) : 0;
        double durationScore = Math.min(meeting.getDuration() / 60.0, 1.0) * 100; // Convert to percentage
        double effectivenessScore = (attendanceRate * 0.6) + (durationScore * 0.4);

        Map<String, Object> result = new HashMap<>();
        result.put("meetingTitle", meeting.getTitle());
        result.put("date", meeting.getDate());
        result.put("totalAttendees", totalAttendees);
        result.put("attended", attended);
        result.put("attendanceRate", attendanceRate);
        result.put("durationScore", durationScore);
        result.put("effectivenessScore", effectivenessScore);

        return result;
    }

    // 2. Busiest Meeting Times
    public Map<String, Long> getBusiestHours() {
        Map<Integer, Long> hourCounts = meetingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        meeting -> meeting.getDate().getHour(),
                        Collectors.counting()
                ));

        // Convert to more readable format
        Map<String, Long> result = new TreeMap<>();
        hourCounts.forEach((hour, count) -> {
            String timeRange = String.format("%02d:00-%02d:59", hour, hour);
            result.put(timeRange, count);
        });

        return result;
    }

    // 3. Participant Engagement by Meeting Type
    public Map<String, Map<String, Object>> getParticipantEngagement() {
        // Get all meetings grouped by type
        Map<Meeting.MeetingType, List<Meeting>> meetingsByType = meetingRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(Meeting::getType));

        Map<String, Map<String, Object>> engagement = new LinkedHashMap<>();

        meetingsByType.forEach((type, meetings) -> {
            String typeName = type.getDisplayName();

            // Calculate totals across all meetings of this type
            long totalExpected = meetings.stream()
                    .mapToLong(m -> m.getAttendees().size())
                    .sum();

            long totalAttended = meetings.stream()
                    .flatMap(m -> m.getAttendees().stream())
                    .filter(a -> a.getAttendanceStatus() == Attendee.AttendanceStatus.ATTENDED
                            || a.getAttendanceStatus() == Attendee.AttendanceStatus.CONFIRMED)
                    .count();

            double engagementRate = (totalExpected > 0) ?
                    (totalAttended * 100.0 / totalExpected) : 0;

            Map<String, Object> stats = new HashMap<>();
            stats.put("totalMeetings", meetings.size());
            stats.put("totalExpected", totalExpected);
            stats.put("totalAttended", totalAttended);
            stats.put("engagementRate", engagementRate);
            engagement.put(typeName, stats);
        });

        return engagement;
    }

    // 4. Extended Statistics (combines multiple metrics)
    public Map<String, Object> getExtendedStatistics() {
        Map<String, Object> stats = new LinkedHashMap<>();

        // Add effectiveness scores for last 5 meetings
        List<Meeting> recentMeetings = meetingRepository.findTop5ByOrderByDateDesc();
        List<Map<String, Object>> meetingEffectiveness = recentMeetings.stream()
                .map(meeting -> getMeetingEffectiveness(meeting.getId()))
                .collect(Collectors.toList());
        stats.put("recentMeetingsEffectiveness", meetingEffectiveness);

        // Add busiest hours
        stats.put("busiestHours", getBusiestHours());

        // Add participant engagement
        stats.put("participantEngagement", getParticipantEngagement());

        return stats;
    }
}