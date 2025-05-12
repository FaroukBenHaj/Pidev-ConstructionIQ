package com.example.pi_project.Controllers;
import com.example.pi_project.Entities.*;
import com.example.pi_project.Exceptions.ResourceNotFoundException;
import com.example.pi_project.Services.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.*;
import org.springframework.web.bind.annotation.*;
import com.example.pi_project.Repositories.*;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.format.*;
import java.util.List;
import com.itextpdf.text.*;
import java.io.*;
import org.springframework.http.*;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/meetings")
public class MeetingController {

    private final MeetingService meetingService;
    private final ExportService exportService;

    @Autowired
    public MeetingController(MeetingService meetingService, ExportService exportService) {
        this.meetingService = meetingService;
        this.exportService = exportService;
    }

    @PostMapping
    public ResponseEntity<Meeting> createMeeting(@Valid @RequestBody Meeting meeting) {
        return ResponseEntity.status(HttpStatus.CREATED).body(meetingService.createMeeting(meeting));
    }

    @GetMapping
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        return ResponseEntity.ok(meetingService.getAllMeetings());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meeting> updateMeetingById(
            @PathVariable Long id,
            @Valid @RequestBody Meeting meetingDetails) {
        try {
            Meeting updatedMeeting = meetingService.updateMeetingById(id, meetingDetails);
            return ResponseEntity.ok(updatedMeeting);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeetingById(@PathVariable Long id) {
        try {
            meetingService.deleteMeetingById(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/meetings/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable Long id) {
        Meeting meeting = meetingService.getMeetingById(id);
        return ResponseEntity.ok(meeting);
    }

    @GetMapping("/export/excel")
    public ResponseEntity<byte[]> exportToExcel() throws IOException {
        ByteArrayOutputStream outputStream = exportService.exportMeetingsToExcel();
        byte[] bytes = outputStream.toByteArray();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "meetings.xlsx");

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/export/pdf")
    public ResponseEntity<byte[]> exportToPdf() {
        try {
            ByteArrayOutputStream outputStream = exportService.exportMeetingsToPdf();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(
                    ContentDisposition.builder("attachment")
                            .filename("meetings_export.pdf")
                            .build()
            );
            headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

            return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);

        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(("No meetings found for export").getBytes(StandardCharsets.UTF_8));
        } catch (DocumentException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("PDF generation failed: " + e.getMessage()).getBytes(StandardCharsets.UTF_8));
        }
    }
}