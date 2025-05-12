package com.example.pi_project.Controllers;

import com.example.pi_project.Entities.Meeting;
import com.example.pi_project.Services.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/stats")

public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/full-report")
    public ResponseEntity<Map<String, Object>> getFullReport() {
        return ResponseEntity.ok(statsService.getFullStatisticsReport());
    }

    @GetMapping("/meetings-per-month")
    public ResponseEntity<Map<String, Long>> getMeetingsPerMonth() {
        return ResponseEntity.ok(statsService.getMeetingsPerMonth());
    }

    @GetMapping("/meeting-types")
    public ResponseEntity<Map<Meeting.MeetingType, Long>> getMeetingTypes() {
        return ResponseEntity.ok(statsService.getMeetingsByType());
    }

    @GetMapping("/attendance-stats")
    public ResponseEntity<Map<String, Long>> getAttendanceStats() {
        return ResponseEntity.ok(statsService.getAttendanceStats());
    }
/// Attendance Score
/// Calculation: (Attended / Total Attendees) × 100
/// Duration Score
/// Calculation: (Actual Duration / Ideal Duration) × 100 An hour is the ideal duration
/// Effectiveness Score (50%):
/// Weighted combination:
/// (Attendance Rate × 60%) + (Duration Score × 40%)
    @GetMapping("/meeting-effectiveness/{meetingId}")
    public ResponseEntity<Map<String, Object>> getMeetingEffectiveness(@PathVariable Long meetingId) {
        return ResponseEntity.ok(statsService.getMeetingEffectiveness(meetingId));
    }

    @GetMapping("/busiest-hours")
    public ResponseEntity<Map<String, Long>> getBusiestHours() {
        return ResponseEntity.ok(statsService.getBusiestHours());
    }
// a little weird
    @GetMapping("/participant-engagement")
    public ResponseEntity<Map<String, Map<String, Object>>> getParticipantEngagement() {
        return ResponseEntity.ok(statsService.getParticipantEngagement());
    }
    ///Effectiveness Formula:(Attendance Rate × 0.6) + (Duration Score × 0.4)
    @GetMapping("/extended-stats")
    public ResponseEntity<Map<String, Object>> getExtendedStatistics() {
        return ResponseEntity.ok(statsService.getExtendedStatistics());
    }
}