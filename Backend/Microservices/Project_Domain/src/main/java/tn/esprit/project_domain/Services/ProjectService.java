package tn.esprit.project_domain.Services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import tn.esprit.project_domain.Entities.Project;
import tn.esprit.project_domain.Repositories.ProjectRepository;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

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

}