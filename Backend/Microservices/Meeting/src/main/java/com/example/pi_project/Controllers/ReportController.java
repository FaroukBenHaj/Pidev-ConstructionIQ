package com.example.pi_project.Controllers;
import com.example.pi_project.Entities.*;
import com.example.pi_project.Services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody Report report) {
        Report createdReport = reportService.createReport(report);
        return ResponseEntity.ok(createdReport);
    }

    @GetMapping("/by-meeting-title")
    public ResponseEntity<List<Report>> getReportsByMeetingTitle(@RequestParam String meetingTitle) {
        List<Report> reports = reportService.getReportsByMeetingTitle(meetingTitle);
        return ResponseEntity.ok(reports);
    }
}