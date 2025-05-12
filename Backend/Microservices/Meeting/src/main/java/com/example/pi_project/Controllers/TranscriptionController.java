package com.example.pi_project.Controllers;

import com.example.pi_project.Services.SummaryService;
import com.example.pi_project.Services.VoskTranscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;
import com.example.pi_project.Services.SummaryService;
import com.example.pi_project.Services.VoskTranscriptionService;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/transcribe")
public class TranscriptionController {
    private final VoskTranscriptionService voskService;
    private final SummaryService summaryService;

    // Constructor injection (recommended)
    @Autowired
    public TranscriptionController(VoskTranscriptionService voskService,
                                   SummaryService summaryService) {
        this.voskService = voskService;
        this.summaryService = summaryService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Mono<Map<String, String>>> transcribeAndSummarize(
            @RequestParam("file") MultipartFile file) {
        try {
            // 1. Transcribe audio
            String transcript = voskService.transcribe(file);

            // 2. Summarize and return
            Mono<Map<String, String>> result = summaryService.summarize(transcript)
                    .map(summary -> Map.of(
                            "transcript", transcript,
                            "summary", summary
                    ));

            return ResponseEntity.ok(result);

        } catch (IOException | UnsupportedAudioFileException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Mono.just(Map.of(
                            "error", "Audio processing failed: " + e.getMessage()
                    )));
        }
    }
}