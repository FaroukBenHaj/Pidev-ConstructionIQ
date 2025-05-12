package tn.esprit.project_domain.RestApis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.project_domain.Services.WeatherService;

@RestController
@RequestMapping("/api/meteo")
public class WeatherRestApi {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{ville}")
    public String previsions(@PathVariable String ville) {
        return weatherService.getPrevisions(ville);
    }
}