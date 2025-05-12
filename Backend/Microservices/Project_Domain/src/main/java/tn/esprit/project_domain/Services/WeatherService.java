package tn.esprit.project_domain.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${openweather.api.key}")
    private String apiKey;

    @Value("${openweather.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getPrevisions(String ville) {
        if (ville == null || ville.trim().isEmpty()) {
            return "Veuillez spécifier une ville valide";
        }

        try {
            String url = apiUrl + "?q=" + ville + "&units=metric&appid=" + apiKey + "&lang=fr";
            return restTemplate.getForObject(url, String.class);
        } catch (Exception ex) {
            return "Erreur lors de la récupération des données météo : " + ex.getMessage();
        }
    }
}