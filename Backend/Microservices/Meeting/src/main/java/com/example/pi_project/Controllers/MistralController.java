package com.example.pi_project.Controllers;

import com.example.pi_project.Services.OllamaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/PI_Project/mistral")
public class MistralController {

    private final OllamaService ollamaService;

    @Autowired
    public MistralController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    @PostMapping("/ask")
    public ResponseEntity<String> askMistral(@RequestBody String prompt) {
        try {
            String response = ollamaService.askMistral(prompt);
            return ResponseEntity.ok(response);
        } catch (OllamaService.OllamaApiException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing request: " + e.getMessage());
        }
    }
}