package tn.esprit.project_domain.RestApis;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import tn.esprit.project_domain.Entities.ProjectFeaturesDTO;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class PythonAPI {

    @PostMapping("/predict")
    public ResponseEntity<?> predict(@RequestBody ProjectFeaturesDTO features) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String pythonUrl = "http://localhost:5000/predict";
            ResponseEntity<Map> response = restTemplate.postForEntity(pythonUrl, features, Map.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur: " + e.getMessage());
        }
    }
}
