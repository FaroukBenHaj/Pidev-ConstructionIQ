package com.example.pi_project.Services;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
public class SummaryService {
    private final WebClient webClient;
    private final String HF_API_KEY = "hugging-face Token"; // Get from HuggingFace

    public SummaryService() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api-inference.huggingface.co/models/facebook/bart-large-cnn")
                .defaultHeader("Authorization", "Bearer " + HF_API_KEY)
                .build();
    }

    public Mono<String> summarize(String text) {
        return webClient.post()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("inputs", text))
                .retrieve()
                .bodyToMono(String.class);
    }
}