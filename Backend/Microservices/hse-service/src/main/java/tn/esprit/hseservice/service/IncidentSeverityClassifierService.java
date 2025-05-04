package tn.esprit.hseservice.service;

import org.springframework.stereotype.Service;
import tn.esprit.hseservice.entity.IncidentSeverity;

import java.util.Arrays;
import java.util.List;

@Service
public class IncidentSeverityClassifierService {

    // Extended high severity keywords for construction incidents
    private final List<String> highSeverityKeywords = Arrays.asList(
            // Structural and safety failures
            "collapse", "structural failure", "building collapse", "scaffold collapse", "roof collapse",
            "fall from height", "electrocution", "fatal", "fatality", "serious injury", "life-threatening",
            "critical", "severe", "catastrophic", "disaster",
            // Fire and explosions
            "fire", "explosion", "blaze", "inferno",
            // Major accidents with heavy machinery
            "crane accident", "machinery malfunction", "equipment failure", "forklift accident",
            // Hazardous material incidents
            "toxic spill", "chemical leak", "hazardous material spill", "gas leak",
            // Additional high severity construction terms
            "severe burn", "amputation", "serious fracture", "multiple injuries", "trench collapse", "falling debris",
            "structural instability", "reinforcement failure", "silo collapse", "dam failure"
    );

    // Extended medium severity keywords for construction incidents
    private final List<String> mediumSeverityKeywords = Arrays.asList(
            // Moderate injuries and equipment issues
            "injury", "minor injury", "sprain", "cut", "bruise", "laceration",
            "equipment glitch", "equipment delay", "mechanical issue", "partial equipment failure",
            // Worksite issues
            "safety violation", "near miss", "non-fatal accident", "property damage", "minor structural issue",
            "safety breach", "electrical fault", "water leak", "wind damage",
            // Additional medium severity construction terms
            "delayed schedule", "work stoppage", "communication breakdown", "hazard identified", "fall hazard",
            "improper guardrail", "inadequate scaffolding", "light injury"
    );

    // Extended low severity keywords for construction incidents
    private final List<String> lowSeverityKeywords = Arrays.asList(
            // Routine or cosmetic issues
            "cosmetic", "minor scratch", "surface damage", "paint chip", "small dent",
            "inconvenience", "miscommunication", "documentation error", "safety reminder", "minor delay",
            "routine maintenance", "schedule adjustment",
            // Additional low severity construction terms
            "training issue", "safety briefing", "procedural update", "non-critical", "clarification",
            "administrative error", "equipment check", "routine inspection"
    );

    // Modifiers that can change severity
    private final List<String> amplifiers = Arrays.asList(
            "major", "significant", "serious", "extensive", "substantial", "multiple",
            "considerable", "extreme", "profound", "widespread", "critical"
    );

    private final List<String> reducers = Arrays.asList(
            "minor", "small", "insignificant", "limited", "isolated", "single",
            "minimal", "negligible", "small-scale", "superficial"
    );

    // Preprocess the text: lower case and remove punctuation.
    private String preprocessText(String text) {
        return text.toLowerCase().replaceAll("[^\\w\\s]", "");
    }

    // Count occurrences of keywords. For phrases (with spaces), we check if they exist in the text.
    private int countKeywordMatches(String text, List<String> keywords) {
        int count = 0;
        for (String keyword : keywords) {
            if (keyword.contains(" ")) {
                // If the phrase exists in the text, count once.
                if (text.contains(keyword)) {
                    count++;
                }
            } else {
                // For single words, split the text and count each match.
                String[] words = text.split("\\s+");
                for (String word : words) {
                    if (word.equals(keyword)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    // Count how many modifier words appear in the text.
    private int countModifiers(String text, List<String> modifiers) {
        int count = 0;
        String[] words = text.split("\\s+");
        for (String word : words) {
            if (modifiers.contains(word)) {
                count++;
            }
        }
        return count;
    }

    /**
     * Classifies the incident severity based on its description.
     * Returns HIGH, MEDIUM, or LOW.
     */
    public IncidentSeverity classify(String description) {
        String processedText = preprocessText(description);

        int highCount = countKeywordMatches(processedText, highSeverityKeywords);
        int mediumCount = countKeywordMatches(processedText, mediumSeverityKeywords);
        int lowCount = countKeywordMatches(processedText, lowSeverityKeywords);

        int amplifierCount = countModifiers(processedText, amplifiers);
        int reducerCount = countModifiers(processedText, reducers);


        double highScore = highCount * 3 + amplifierCount - reducerCount * 0.5;
        double mediumScore = mediumCount * 2 + amplifierCount * 0.5 - reducerCount * 0.25;
        double lowScore = lowCount + reducerCount - amplifierCount * 0.5;

        // Default to MEDIUM if no keywords are found.
        if (highScore == 0 && mediumScore == 0 && lowScore == 0) {
            return IncidentSeverity.MEDIUM;
        }

        // Determine the highest score.
        if (highScore >= mediumScore && highScore >= lowScore) {
            return IncidentSeverity.HIGH;
        } else if (mediumScore >= highScore && mediumScore >= lowScore) {
            return IncidentSeverity.MEDIUM;
        } else {
            return IncidentSeverity.LOW;
        }
    }
}
