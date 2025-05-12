package com.example.pi_project.Controllers;

import com.example.pi_project.Services.MeetingGenerationService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/meetings")
public class MeetingGenerationController {
    private final MeetingGenerationService meetingService;

    public MeetingGenerationController(MeetingGenerationService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping("/create")
    public String createMeeting() {
        return meetingService.createDailyRoom();
    }
}