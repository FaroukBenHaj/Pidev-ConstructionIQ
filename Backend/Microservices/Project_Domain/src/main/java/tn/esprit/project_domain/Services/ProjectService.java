package tn.esprit.project_domain.Services;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import tn.esprit.project_domain.Entities.Project;
import tn.esprit.project_domain.Entities.TaskStatus;
import tn.esprit.project_domain.Repositories.ProjectRepository;
import tn.esprit.project_domain.Entities.Task;
import tn.esprit.project_domain.Entities.ProjectStatisticsDTO;


import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.project_domain.Repositories.TaskRepository;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private WeatherService weatherService;

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private TaskRepository taskRepository;

    private final Validator validator;

    public ProjectService() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        this.validator = factory.getValidator();
    }


    public Project uploadProjectPdf(MultipartFile file) throws IOException, ParseException {
        String pdfText = extractTextFromPdf(file);
        Project project = extractProjectInfo(pdfText);

        Set<ConstraintViolation<Project>> violations = validator.validate(project);

        if (!violations.isEmpty()) {
            StringBuilder errorMessage = new StringBuilder("Invalid data in PDF. Errors: ");
            for (ConstraintViolation<Project> violation : violations) {
                errorMessage.append(violation.getMessage()).append("; ");
            }
            throw new RuntimeException(errorMessage.toString());
        }

        return projectRepository.save(project);
    }
    private String extractTextFromPdf(MultipartFile file) throws IOException {
        PDDocument document = PDDocument.load(file.getInputStream());
        PDFTextStripper pdfStripper = new PDFTextStripper();
        return pdfStripper.getText(document);
    }

    private Project extractProjectInfo(String pdfText) throws ParseException {
        Project project = new Project();
        project.setName(extractField(pdfText, "Nom du projet:"));
        project.setDescription(extractField(pdfText, "Description:"));
        project.setStartDate(parseDate(extractField(pdfText, "Date de début:")));
        project.setEndDate(parseDate(extractField(pdfText, "Date de fin:")));
        project.setBudget(Double.parseDouble(extractField(pdfText, "Budget:")));

        return project;
    }

    private String extractField(String text, String fieldName) {
        int startIndex = text.indexOf(fieldName) + fieldName.length();
        int endIndex = text.indexOf("\n", startIndex);
        return text.substring(startIndex, endIndex).trim();
    }

    private Date parseDate(String dateStr) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        return format.parse(dateStr);
    }

    private boolean validateProjectInfo(Project project) {
        return project.getName() != null && project.getDescription() != null &&
                project.getStartDate() != null && project.getEndDate() != null &&
                project.getBudget() > 0;
    }


    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("Project not found"));
        project.setName(projectDetails.getName());
        project.setDescription(projectDetails.getDescription());
        project.setStartDate(projectDetails.getStartDate());
        project.setEndDate(projectDetails.getEndDate());
        project.setBudget(projectDetails.getBudget());

        Set<ConstraintViolation<Project>> violations = validator.validate(project);
        if (!violations.isEmpty()) {
            StringBuilder errorMessage = new StringBuilder("Invalid data. Errors: ");
            for (ConstraintViolation<Project> violation : violations) {
                errorMessage.append(violation.getMessage()).append("; ");
            }
            throw new RuntimeException(errorMessage.toString());
        }
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public Project findByName(String name){
        return  projectRepository.findByName(name);
    }
    public List<Project> searchProjectsByName(String name) {
        return projectRepository.findByNameContainingIgnoreCase(name);
    }

    public Page<Project> getProjectswithpaginator(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return projectRepository.findAll(pageable);
    }

    public ProjectStatisticsDTO getProjectStatistics(Long projectId) {
        Project project = getProjectById(projectId);
        List<Task> tasks = project.getTasks();

        ProjectStatisticsDTO stats = new ProjectStatisticsDTO();

        stats.setTotalTasks(tasks.size());
        stats.setCompletedTasks((int) tasks.stream().filter(t -> t.getStatus() == TaskStatus.COMPLETED).count());
        stats.setInProgressTasks((int) tasks.stream().filter(t -> t.getStatus() == TaskStatus.IN_PROGRESS).count());
        stats.setNotStartedTasks((int) tasks.stream().filter(t -> t.getStatus() == TaskStatus.NOT_STARTED).count());

        if (!tasks.isEmpty()) {
            long completedCount = tasks.stream().filter(t -> t.getStatus() == TaskStatus.COMPLETED).count();
            long inProgressCount = tasks.stream().filter(t -> t.getStatus() == TaskStatus.IN_PROGRESS).count();
            long totalTasks = tasks.size();

            double inProgressContribution = tasks.stream()
                    .filter(t -> t.getStatus() == TaskStatus.IN_PROGRESS)
                    .mapToDouble(t -> t.getProgress() != null ? t.getProgress() : 50) // default to 50% if null
                    .sum();

            double overallProgress = ((completedCount * 100) + inProgressContribution) / totalTasks;

            stats.setOverallProgress(overallProgress);
        } else {
            stats.setOverallProgress(0);
        }

        if (project.getBudget() > 0) {
            double totalBudgetAllocated = tasks.stream()
                    .mapToDouble(t -> t.getBudgetAllocation() != null ? t.getBudgetAllocation() : 0)
                    .sum();

            double budgetUsed = tasks.stream()
                    .mapToDouble(t -> (t.getProgress() != null ? t.getProgress() / 100.0 : 0) *
                            (t.getBudgetAllocation() != null ? t.getBudgetAllocation() : 0))
                    .sum();

            stats.setBudgetUtilization(budgetUsed);
            stats.setBudgetAllocationRate(totalBudgetAllocated / project.getBudget());
        } else {
            stats.setBudgetUtilization(0);
            stats.setBudgetAllocationRate(0);
        }

        stats.setTasksByPriority(tasks.stream()
                .collect(Collectors.groupingBy(Task::getPriority, Collectors.counting())));

        stats.setTasksByStatus(tasks.stream()
                .collect(Collectors.groupingBy(t -> t.getStatus().toString(), Collectors.counting())));

        Date now = new Date();
        stats.setOverdueTasks((int) tasks.stream()
                .filter(t -> t.getEndDate().before(now) && t.getStatus() != TaskStatus.COMPLETED)
                .count());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.DAY_OF_YEAR, 7);
        Date weekFromNow = calendar.getTime();

        stats.setTasksDueSoon((int) tasks.stream()
                .filter(t -> t.getEndDate().after(now) && t.getEndDate().before(weekFromNow))
                .count());

        return stats;
    }
    public Map<Long, ProjectStatisticsDTO> getAllProjectsStatistics() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
                .collect(Collectors.toMap(
                        Project::getId,
                        project -> getProjectStatistics(project.getId())
                ));
    }

    @Transactional
    public void verifierMeteoEtRisquePourProjet(Long projectId) {
        Project projet = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Projet non trouvé"));

        String json = weatherService.getPrevisions(projet.getVille());

        if (json != null && json.contains("rain")) {
            List<Task> tasksAtRisk = taskRepository.findWeatherSensitiveTasksByProject(projectId);

            tasksAtRisk.forEach(task -> {
                task.setNiveauRisque("élevé");
                sendWeatherRiskNotification(projet, task);
            });

            taskRepository.saveAll(tasksAtRisk);
        }
    }
    private void sendWeatherRiskNotification(Project project, Task task) {
        String subject = "⚠️ Risque météo pour la tâche : " + task.getName();
        String message = buildWeatherRiskMessage(project, task);

        notificationService.envoyerMail(
                "chef@exemple.com",
                subject,
                message
        );
    }

    private String buildWeatherRiskMessage(Project project, Task task) {
        return """
        Des précipitations sont prévues à %s.
        La tâche "%s" pourrait être retardée.
        
        Détails:
        - Projet: %s
        - Tâche: %s
        - Type: %s
        - Risque: %s
        """.formatted(
                project.getVille(),
                task.getName(),
                project.getName(),
                task.getName(),
                task.getType(),
                task.getNiveauRisque()
        );
    }

}