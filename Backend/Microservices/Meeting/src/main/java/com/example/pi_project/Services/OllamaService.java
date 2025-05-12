package com.example.pi_project.Services;

import com.example.pi_project.Entities.Attendee;
import com.example.pi_project.Entities.Meeting;
import com.example.pi_project.Repositories.AttendeeRepository;
import com.example.pi_project.Repositories.MeetingRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayOutputStream;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class OllamaService {
    // Enhanced constants and configuration
    private static final Logger log = LoggerFactory.getLogger(OllamaService.class);

    @Value("${ollama.api.url:http://localhost:11434/api/generate}")
    private String ollamaApiUrl;

    @Value("${ollama.api.timeout:5000}")
    private int apiTimeout;

    // Enhanced meeting type translations with pattern matching
    private static final Map<Pattern, Meeting.MeetingType> MEETING_TYPE_PATTERNS = Map.of(
            Pattern.compile("review|revue", Pattern.CASE_INSENSITIVE), Meeting.MeetingType.REVIEW,
            Pattern.compile("progress|progrès", Pattern.CASE_INSENSITIVE), Meeting.MeetingType.PROGRESS_UPDATE,
            Pattern.compile("safety|sécurité", Pattern.CASE_INSENSITIVE), Meeting.MeetingType.SAFETY,
            Pattern.compile("planning|planification", Pattern.CASE_INSENSITIVE), Meeting.MeetingType.PLANNING
    );

    // Dependencies with constructor injection
    private final RestTemplate restTemplate;
    private final MeetingRepository meetingRepository;
    private final AttendeeRepository attendeeRepository;
    private final StatsService statsService;
    private final ExportService exportService;
    private final ObjectMapper objectMapper;

    @Autowired
    public OllamaService(RestTemplate restTemplate,
                         MeetingRepository meetingRepository,
                         AttendeeRepository attendeeRepository,
                         StatsService statsService,
                         ExportService exportService,
                         ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.meetingRepository = meetingRepository;
        this.attendeeRepository = attendeeRepository;
        this.statsService = statsService;
        this.exportService = exportService;
        this.objectMapper = objectMapper;

        // Configure timeout for RestTemplate
        ((SimpleClientHttpRequestFactory) restTemplate.getRequestFactory())
                .setConnectTimeout(apiTimeout);
        ((SimpleClientHttpRequestFactory) restTemplate.getRequestFactory())
                .setReadTimeout(apiTimeout);
    }
    // Add these missing helper methods
    private void validatePrompt(String prompt) {
        if (StringUtils.isBlank(prompt)) {
            throw new IllegalArgumentException("Prompt cannot be null or empty");
        }
        if (prompt.length() > 1000) {
            throw new IllegalArgumentException("Prompt too long (max 1000 characters)");
        }
    }
    // Enhanced Mistral API interaction
    public String askMistral(String prompt) {
        validatePrompt(prompt);

        try {
            String systemMessage = """
                You are a professional meeting management assistant. Respond with:
                1. Clear, concise answers
                2. Structured information when appropriate
                3. Professional tone
                """;

            Map<String, Object> request = new HashMap<>();
            request.put("model", "mistral");
            request.put("prompt", systemMessage + "\n\nUser query: " + prompt);
            request.put("stream", false);

            Map<String, Object> options = new HashMap<>();
            options.put("temperature", 0.5);  // More focused responses
            options.put("top_p", 0.9);
            options.put("max_tokens", 300);   // Allow longer responses
            options.put("repeat_penalty", 1.1);

            request.put("options", options);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    ollamaApiUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            return cleanResponse(extractResponse(response.getBody()));

        } catch (HttpClientErrorException e) {
            log.error("API request failed with status {}: {}", e.getStatusCode(), e.getResponseBodyAsString());
            throw new OllamaApiException("Failed to process your request. Please try again.", e);
        } catch (RestClientException e) {
            log.error("Communication error with Ollama API", e);
            throw new OllamaApiException("Service unavailable. Please try again later.", e);
        }
    }


    private String normalizeQuestion(String question) {
        return question == null ? "" : question.toLowerCase().trim();
    }

    private boolean containsAnyPattern(String input, String... patterns) {
        return Arrays.stream(patterns).anyMatch(input::contains);
    }

    private boolean matchesAnyPattern(String input, String... patterns) {
        return Arrays.stream(patterns)
                .anyMatch(pattern -> input.matches(".*" + pattern + ".*"));
    }


    private Optional<String> handleStatsQueries(String question) {
        if (question.contains("duration analysis") || question.contains("analyse de durée")) {
            return handleDurationAnalysis();
        }
        return Optional.empty();
    }



    private Optional<String> handleFrequencyQueries() {
        Map<String, Long> frequencies = meetingRepository.countByFrequency();
        if (frequencies.isEmpty()) {
            return Optional.of("No frequency data available.");
        }

        StringBuilder response = new StringBuilder("Meeting frequency distribution:\n");
        frequencies.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .forEach(entry -> response.append(String.format(
                        "- %s: %d meetings\n",
                        entry.getKey(),
                        entry.getValue()
                )));

        return Optional.of(response.toString());
    }

    // Enhanced meeting queries with better pattern matching
    private Optional<String> handleMeetingQueries(String question) {
        if (containsAnyPattern(question, "location", "lieu", "where")) {
            return handleLocationQueries(question);
        }
        if (matchesAnyPattern(question, "meeting about", "réunion sur")) {
            return handleMeetingSearchByTitle(question);
        }
        if (containsAnyPattern(question, "frequency", "fréquence")) {
            return handleFrequencyQueries();
        }
        return Optional.empty();
    }

    // Enhanced location queries with better extraction
    private Optional<String> handleLocationQueries(String question) {
        return extractLocation(question)
                .flatMap(location -> {
                    List<Meeting> meetings = meetingRepository.findByLocationContainingIgnoreCase(location);
                    if (meetings.isEmpty()) {
                        return Optional.of("No meetings found at " + location);
                    }

                    String response = meetings.stream()
                            .map(m -> String.format("- %s on %s (%s)",
                                    m.getTitle(),
                                    m.getDate().format(DateTimeFormatter.ISO_LOCAL_DATE),
                                    m.getType().getDisplayName()))
                            .collect(Collectors.joining("\n"));

                    return Optional.of(String.format("Meetings at %s:\n%s", location, response));
                });
    }

    private Optional<String> handleDurationAnalysis() {
        try {
            MeetingRepository.DurationStats stats = meetingRepository.getDurationStatistics();
            if (stats == null || stats.getAverage() == null) {
                return Optional.of("No duration statistics available.");
            }

            return Optional.of(String.format(
                    "Meeting duration statistics:\n" +
                            "- Average: %.1f minutes\n" +
                            "- Longest: %d minutes\n" +
                            "- Shortest: %d minutes\n" +
                            "- Total meeting time: %d hours",
                    stats.getAverage(),
                    stats.getMax() != null ? stats.getMax() : 0,
                    stats.getMin() != null ? stats.getMin() : 0,
                    stats.getTotal() != null ? stats.getTotal() / 60 : 0
            ));
        } catch (Exception e) {
            log.error("Failed to get duration statistics", e);
            return Optional.of("Could not retrieve duration statistics.");
        }
    }

    // Helper methods
    private String cleanResponse(String response) {
        return Optional.ofNullable(response)
                .map(r -> r.replaceAll("(?m)^\\s*$", ""))
                .map(r -> r.replaceAll("\"\"\"", ""))
                .map(String::trim)
                .orElse("");
    }

    private String extractResponse(Map<String, Object> response) {
        return Optional.ofNullable(response)
                .map(r -> r.get("response"))
                .map(Object::toString)
                .orElseThrow(() -> new OllamaApiException("Invalid response format from API"));
    }

    private Optional<String> extractLocation(String question) {
        return Stream.of("at ", "à ")
                .filter(question::contains)
                .findFirst()
                .map(prefix -> question.substring(question.indexOf(prefix) + prefix.length()))
                .map(location -> location.split(" ")[0])
                .filter(loc -> !loc.isBlank());
    }

    // Enhanced exception handling
    public static class OllamaApiException extends RuntimeException {
        public OllamaApiException(String message) {
            super(message);
        }

        public OllamaApiException(String message, Throwable cause) {
            super(message, cause);
        }
    }

    private Optional<String> handleMeetingSearchByTitle(String question) {
        String searchTerm = extractSearchTerm(question, List.of("meeting about", "réunion sur"));
        if (searchTerm == null || searchTerm.isBlank()) {
            return Optional.empty();
        }

        List<Meeting> meetings = meetingRepository.findByTitleContainingIgnoreCase(searchTerm);
        if (meetings.isEmpty()) {
            return Optional.of("No meetings found about '" + searchTerm + "'");
        }

        StringBuilder response = new StringBuilder("Meetings about '" + searchTerm + "':\n");
        meetings.forEach(m -> response.append(String.format(
                "- %s (Date: %s, Location: %s)\n",
                m.getTitle(),
                m.getDate().format(DateTimeFormatter.ISO_LOCAL_DATE),
                m.getLocation()
        )));

        return Optional.of(response.toString());
    }
    // Enhanced query handling with better language support
    public Optional<String> handleQuery(String question) {
        if (StringUtils.isBlank(question)) {
            return Optional.empty();
        }

        String normalizedQuestion = normalizeQuestion(question);

        return Stream.of(
                        handleMeetingQueries(normalizedQuestion),
                        handleAttendeeQueries(normalizedQuestion),
                        handleStatsQueries(normalizedQuestion)
                )
                .filter(Optional::isPresent)
                .findFirst()
                .orElseGet(() -> Optional.of("I couldn't find information about that. Could you rephrase your question?"));
    }
    private String extractSearchTerm(String question, List<String> prefixes) {
        for (String prefix : prefixes) {
            if (question.contains(prefix)) {
                String term = question.substring(question.indexOf(prefix) + prefix.length()).trim();
                // Remove any trailing question marks or spaces
                return term.replaceAll("[?\\s]+$", "");
            }
        }
        return null;

    }

    // Implement the missing handleAttendeeQueries method
    private Optional<String> handleAttendeeQueries(String question) {
        if (question.contains("count by location") || question.contains("nombre par lieu")) {
            Map<String, Long> counts = meetingRepository.countByLocation();
            if (counts.isEmpty()) {
                return Optional.of("No location data available for attendees.");
            }

            StringBuilder response = new StringBuilder("Attendee count by location:\n");
            counts.forEach((location, count) ->
                    response.append("- ").append(location).append(": ").append(count).append("\n"));
            return Optional.of(response.toString());
        }
        else if (question.contains("frequency") || question.contains("fréquence")) {
            return handleFrequencyQueries();
        }

        return Optional.empty();
    }

}