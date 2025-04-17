package tn.esprit.project_domain.RestApis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.project_domain.Entities.Project;
import tn.esprit.project_domain.Entities.ProjectStatisticsDTO;
import tn.esprit.project_domain.Repositories.ProjectRepository;
import tn.esprit.project_domain.Services.NotificationService;
import tn.esprit.project_domain.Services.ProjectService;
import tn.esprit.project_domain.Services.WeatherService;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/projects")

public class ProjectRestApi {
    @Autowired
    private ProjectService projectService;
    @Autowired
    private WeatherService weatherService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/upload-pdf")
    public ResponseEntity<?> uploadProjectPdf(@RequestParam("file") MultipartFile file) {
        try {
            Project savedProject = projectService.uploadProjectPdf(file);
            return ResponseEntity.ok(savedProject);
        } catch (IOException | ParseException e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Error processing PDF\n.\"}");
        }
    }
    @GetMapping("/list_projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectService.getProjectById(id);
        return ResponseEntity.ok(project);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        try {
            Project updatedProject = projectService.updateProject(id, projectDetails);
            return ResponseEntity.ok(updatedProject);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Error updating project\n.\"}");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable Long id) {
        try {
            projectService.deleteProject(id);
            return ResponseEntity.ok().body("{\"message\": \"Project deleted successfully !\"}");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("{\"message\": \"Error deleting project\n.\"}");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Project>> searchProjectsByName(@RequestParam String name) {
        List<Project> projects = projectService.searchProjectsByName(name);
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/name/{projectName}")
    public ResponseEntity<Project> getProjectByName(@PathVariable String projectName) {
        try {
            Project project = projectService.findByName(projectName);
            return ResponseEntity.ok(project);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<Project>> getProjectswithpaginator(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Project> projects = projectService.getProjectswithpaginator(page, size);
        return ResponseEntity.ok(projects);
    }


    @GetMapping("/{id}/statistics")
    public ResponseEntity<ProjectStatisticsDTO> getProjectStatistics(@PathVariable Long id) {
        ProjectStatisticsDTO stats = projectService.getProjectStatistics(id);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<Long, ProjectStatisticsDTO>> getAllProjectsStatistics() {
        Map<Long, ProjectStatisticsDTO> stats = projectService.getAllProjectsStatistics();
        return ResponseEntity.ok(stats);
    }
    @GetMapping("/{id}/weather")
    public ResponseEntity<String> getProjectWeather(@PathVariable Long id) {
        try {
            Project project = projectService.getProjectById(id);
            if (project.getVille() == null || project.getVille().isEmpty()) {
                return ResponseEntity.badRequest().body("Le projet n'a pas de ville spécifiée");
            }

            String weatherData = weatherService.getPrevisions(project.getVille());
            return ResponseEntity.ok(weatherData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la récupération des données météo: " + e.getMessage());
        }
    }



    @PostMapping("/{id}/notify")
    public ResponseEntity<String> sendProjectNotification(
            @PathVariable Long id,
            @RequestParam String email,
            @RequestParam String subject,
            @RequestParam String message) {
        try {
            Project project = projectService.getProjectById(id);

            boolean sent = notificationService.envoyerMail(
                    email,
                    subject + " - Projet: " + project.getName(),
                    message + "\n\nDétails du projet:\n" +
                            "Nom: " + project.getName() + "\n" +
                            "Description: " + project.getDescription() + "\n" +
                            "Date de début: " + project.getStartDate() + "\n" +
                            "Date de fin: " + project.getEndDate()
            );

            if (sent) {
                return ResponseEntity.ok("Notification envoyée avec succès à " + email);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Échec de l'envoi de la notification");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de l'envoi de la notification: " + e.getMessage());
        }
    }

    @GetMapping("/test/weather-notification")
    public ResponseEntity<String> testWeatherAndNotification(
            @RequestParam Long projectId,
            @RequestParam String email) {

        try {
            Project projet = projectRepository.findById(projectId)
                    .orElseThrow(() -> new RuntimeException("Projet non trouvé"));

            String weatherData = weatherService.getPrevisions(projet.getVille());
            boolean hasRain = weatherData != null && weatherData.toLowerCase().contains("rain");

            String messageContent = hasRain
                    ? "Des précipitations sont prévues à " + projet.getVille()
                    : "Pas de précipitations prévues à " + projet.getVille();

            boolean sent = notificationService.envoyerMail(
                    email,
                    "Test météo pour projet " + projet.getName(),
                    messageContent + "\n\nDétails météo:\n" + weatherData
            );

            if (!sent) {
                throw new RuntimeException("Email sending failed silently");
            }

            return ResponseEntity.ok("Notification envoyée avec succès. Vérifiez votre boîte mail.");

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Erreur: " + e.getMessage());
        }
    }

}



