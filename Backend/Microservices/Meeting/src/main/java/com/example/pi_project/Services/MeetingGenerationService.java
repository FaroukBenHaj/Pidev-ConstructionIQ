package com.example.pi_project.Services;

import lombok.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;




@Service
public class MeetingGenerationService {
    private static final String DAILY_API_URL = "https://api.daily.co/v1/rooms";
    private static final String API_KEY = "05d4c1a576d7cf2eb497cdd45d995ab3ca0a376ebe38eeab6ab55c6922fcc256"; // Use your key from the dashboard

    public String createDailyRoom() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Room properties (critical fixes below)
        String requestBody = "{"
                + "\"properties\": {"
                + "\"exp\": " + (System.currentTimeMillis() / 1000 + 86400) + "," // 24-hour expiry
                + "\"enable_chat\": true,"
                + "\"enable_knocking\": true," // Allows participants to request entry
                + "\"enable_prejoin_ui\": true," // Shows preview before joining
                + "\"start_video_off\": false," // Start with video on
                + "\"start_audio_off\": false"  // Start with audio on
                + "}"
                + "}";

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(
                DAILY_API_URL,
                request,
                String.class
        );

        return response.getBody(); // Returns JSON with "url" field
    }
}