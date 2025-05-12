package tn.esprit.project_domain.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import tn.esprit.project_domain.Entities.Project;
import tn.esprit.project_domain.Repositories.ProjectRepository;

import java.util.List;

@Service
public class WeatherAlertService {

    @Autowired
    private WeatherService weatherService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private ProjectRepository projectRepository;

    private static final String RECIPIENT_EMAIL = "daghfous.zeineb@esprit.tn";

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Scheduled(cron = "0 0 7 * * ?")
    public void checkWeatherAndNotify() {
        System.out.println("Starting daily weather check for all projects");

        List<Project> projects = projectRepository.findAll();

        for (Project project : projects) {
            if (project.getVille() == null || project.getVille().isEmpty()) {
                System.out.println("Skipping project " + project.getId() + " - no city specified");
                continue;
            }

            try {
                String weatherData = weatherService.getPrevisions(project.getVille());
                WeatherAlert alert = analyzeWeatherData(weatherData, project);

                if (alert.shouldSendAlert()) {
                    sendWeatherAlert(project, alert);
                }

            } catch (Exception e) {
                System.err.println("Error checking weather for project " + project.getId());
                e.printStackTrace();
            }
        }
    }

    private WeatherAlert analyzeWeatherData(String weatherData, Project project) throws Exception {
        if (weatherData == null || weatherData.contains("Erreur")) {
            throw new Exception("Invalid weather data received: " + weatherData);
        }

        JsonNode root = objectMapper.readTree(weatherData);

        String cityName = root.path("name").asText();
        JsonNode weather = root.path("weather").get(0);
        String mainCondition = weather.path("main").asText();
        String description = weather.path("description").asText();

        JsonNode main = root.path("main");
        double temperature = main.path("temp").asDouble();
        int humidity = main.path("humidity").asInt();

        double windSpeed = root.path("wind").path("speed").asDouble();

        boolean isRaining = mainCondition.equalsIgnoreCase("Rain")
                || mainCondition.equalsIgnoreCase("Drizzle")
                || mainCondition.equalsIgnoreCase("Thunderstorm");

        int riskLevel = calculateRiskLevel(mainCondition, windSpeed, temperature);

        return new WeatherAlert(
                cityName,
                mainCondition,
                description,
                temperature,
                humidity,
                windSpeed,
                isRaining,
                riskLevel
        );
    }

    private int calculateRiskLevel(String condition, double windSpeed, double temperature) {
        int riskLevel = 1;
        if (condition.equalsIgnoreCase("Rain") || condition.equalsIgnoreCase("Drizzle")) {
            riskLevel += 1;
        }

        if (condition.equalsIgnoreCase("Thunderstorm")) {
            riskLevel += 2;
        }

        if (condition.equalsIgnoreCase("Snow")) {
            riskLevel += 1;
        }

        if (windSpeed > 10.0) {
            riskLevel += 1;
        }

        if (windSpeed > 20.0) {
            riskLevel += 1;
        }

        if (temperature > 35.0 || temperature < 0.0) {
            riskLevel += 1;
        }

        return Math.min(riskLevel, 5);
    }

    private void sendWeatherAlert(Project project, WeatherAlert alert) {
        String subject = generateEmailSubject(project, alert);
        String content = generateEmailContent(project, alert);

        try {
            boolean sent = notificationService.envoyerMail(RECIPIENT_EMAIL, subject, content);

            if (sent) {
                System.out.println("Weather alert sent for project " + project.getId());
            } else {
                System.out.println("Failed to send weather alert for project " + project.getId());
            }
        } catch (Exception e) {
            System.err.println("Error sending weather alert for project " + project.getId());
            e.printStackTrace();
        }
    }

    private String generateEmailSubject(Project project, WeatherAlert alert) {
        if (alert.getRiskLevel() >= 4) {
            return "URGENT: High risk weather for " + project.getName() + " at " + alert.getCityName();
        } else if (alert.isRaining()) {
            return "Rain alert: Possible impact on project " + project.getName();
        } else {
            return "Weather alert: Conditions to monitor for " + project.getName();
        }
    }

    private String generateEmailContent(Project project, WeatherAlert alert) {
        StringBuilder content = new StringBuilder();

        content.append("Hello,\n\n");

        if (alert.isRaining()) {
            content.append("We inform you that precipitation is currently forecast at ")
                    .append(alert.getCityName())
                    .append(" where project '")
                    .append(project.getName())
                    .append("' is taking place.\n\n");

            content.append("\u001B[31m")
                    .append("WARNING: Due to the rain conditions, the project schedule might be delayed.")
                    .append("\u001B[0m")
                    .append("\n\n");
        } else {
            content.append("We inform you that there is no rain forecast at ")
                    .append(alert.getCityName())
                    .append(" where project '")
                    .append(project.getName())
                    .append("' is taking place.\n\n");

            content.append("Good news: There should be no weather-related delays to the project schedule.\n\n");
        }

        if (alert.getRiskLevel() >= 3) {
            content.append("WARNING: The weather risk level is high (")
                    .append(alert.getRiskLevel())
                    .append("/5). Precautionary measures may be required.\n\n");
        }

        content.append("Weather details for ")
                .append(alert.getCityName())
                .append(":\n")
                .append("• Condition: ")
                .append(alert.getDescription())
                .append("\n")
                .append("• Temperature: ")
                .append(alert.getTemperature())
                .append("°C\n")
                .append("• Humidity: ")
                .append(alert.getHumidity())
                .append("%\n")
                .append("• Wind speed: ")
                .append(alert.getWindSpeed())
                .append(" m/s\n\n");

        content.append("Recommendations:\n");

        if (alert.isRaining()) {
            content.append("• Provide adequate protection for water-sensitive equipment\n");
            content.append("• Check the waterproofing of temporary installations\n");
            content.append("• Consider rescheduling outdoor activities if possible\n");
        }

        if (alert.getWindSpeed() > 10.0) {
            content.append("• Secure any material that could be blown away by wind\n");
        }

        if (alert.getRiskLevel() >= 4) {
            content.append("• Consider postponing non-essential activities\n");
            content.append("• Ensure all team members are aware of the risks\n");
        }

        content.append("\nProject information:\n")
                .append("• Name: ")
                .append(project.getName())
                .append("\n")
                .append("• Description: ")
                .append(project.getDescription())
                .append("\n")
                .append("• Start date: ")
                .append(project.getStartDate())
                .append("\n")
                .append("• Planned end date: ")
                .append(project.getEndDate())
                .append("\n\n");

        content.append("This notification is generated automatically. For more information, please contact the project management team.\n\n");
        content.append("Regards,\nProject Weather Monitoring System");

        return content.toString();
    }

    private static class WeatherAlert {
        private final String cityName;
        private final String mainCondition;
        private final String description;
        private final double temperature;
        private final int humidity;
        private final double windSpeed;
        private final boolean isRaining;
        private final int riskLevel;

        public WeatherAlert(String cityName, String mainCondition, String description,
                            double temperature, int humidity, double windSpeed,
                            boolean isRaining, int riskLevel) {
            this.cityName = cityName;
            this.mainCondition = mainCondition;
            this.description = description;
            this.temperature = temperature;
            this.humidity = humidity;
            this.windSpeed = windSpeed;
            this.isRaining = isRaining;
            this.riskLevel = riskLevel;
        }

        public String getCityName() {
            return cityName;
        }

        public String getMainCondition() {
            return mainCondition;
        }

        public String getDescription() {
            return description;
        }

        public double getTemperature() {
            return temperature;
        }

        public int getHumidity() {
            return humidity;
        }

        public double getWindSpeed() {
            return windSpeed;
        }

        public boolean isRaining() {
            return isRaining;
        }

        public int getRiskLevel() {
            return riskLevel;
        }

        public boolean shouldSendAlert() {
            return isRaining || riskLevel >= 3;
        }
    }

}