package tn.esprit.project_domain.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.project_domain.Entities.Project;
import tn.esprit.project_domain.Entities.Task;
import tn.esprit.project_domain.Entities.TaskStatus;
import tn.esprit.project_domain.Repositories.TaskRepository;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectService projectService;

    public Task createTask(Task task, String projectName) {
        Project project = projectService.findByName(projectName);
        if (project == null) {
            throw new RuntimeException("Project not found with name: " + projectName);
        }

        // Set default values for missing fields
        if (task.getName() == null || task.getName().isEmpty()) {
            task.setName("New Task");
        }
        if (task.getDescription() == null || task.getDescription().isEmpty()) {
            task.setDescription("No description provided");
        }
        if (task.getStartDate() == null) {
            task.setStartDate(new Date()); // Default to current date
        }
        if (task.getEndDate() == null) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(task.getStartDate());
            cal.add(Calendar.DAY_OF_MONTH, 1); // Default to 1 day after start date
            task.setEndDate(cal.getTime());
        }
        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.NOT_STARTED); // Default status
        }
        if (task.getDuration() == null || task.getDuration() < 1) {
            task.setDuration(1L); // Default duration
        }
        if (task.getPriority() == null || task.getPriority().isEmpty()) {
            task.setPriority("LOW"); // Default priority
        }
        if (task.getProgress() == null) {
            task.setProgress(0);
        }
// Validation des dates
        if (task.getStartDate() == null) {
            task.setStartDate(new Date());
        }
        if (task.getEndDate() == null) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(task.getStartDate());
            cal.add(Calendar.DAY_OF_MONTH, 1);
            task.setEndDate(cal.getTime());
        }
        if (task.getEndDate().before(task.getStartDate())) {
            throw new RuntimeException("End date must be after start date");
        }
        // Calcul de la durée
        long diffInMillis = task.getEndDate().getTime() - task.getStartDate().getTime();
        task.setDuration(TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS) + 1);
        // Set project
        task.setProject(project);

        // Save task
        return taskRepository.save(task);
    }
    public Task getTaskById(Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = getTaskById(id);
        task.setName(taskDetails.getName());
        task.setStartDate(taskDetails.getStartDate());
        task.setEndDate(taskDetails.getEndDate());
        task.setStatus(taskDetails.getStatus());
        task.setDuration(taskDetails.getDuration());
        task.setPriority(taskDetails.getPriority());
        task.setDescription(taskDetails.getDescription());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }
}



