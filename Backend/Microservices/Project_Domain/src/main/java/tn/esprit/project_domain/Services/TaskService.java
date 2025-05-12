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

        if (task.getName() == null || task.getName().isEmpty()) {
            task.setName("New Task");
        }
        if (task.getDescription() == null || task.getDescription().isEmpty()) {
            task.setDescription("No description provided");
        }
        if (task.getStartDate() == null) {
            task.setStartDate(new Date());
        }
        if (task.getEndDate() == null) {
            Calendar cal = Calendar.getInstance();
            cal.setTime(task.getStartDate());
            cal.add(Calendar.DAY_OF_MONTH, 1);
            task.setEndDate(cal.getTime());
        }
        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.NOT_STARTED);
        }
        if (task.getDuration() == null || task.getDuration() < 1) {
            task.setDuration(1L);
        }
        if (task.getPriority() == null || task.getPriority().isEmpty()) {
            task.setPriority("LOW");
        }
        if (task.getProgress() == null) {
            task.setProgress(0);
        }
        if (task.getBudgetAllocation() == null) {
            task.setBudgetAllocation(0.0);
        }
        if (task.getType() == null || task.getType().isEmpty()) {
            throw new RuntimeException("Task type is required");
        }
        if (task.getNiveauRisque() == null || task.getNiveauRisque().isEmpty()) {
            task.setNiveauRisque("faible");
        }

        if (task.getEndDate().before(task.getStartDate())) {
            throw new RuntimeException("End date must be after start date");
        }

        if (task.getDuration() == null || task.getDuration() < 1) {
            long diffInMillis = task.getEndDate().getTime() - task.getStartDate().getTime();
            task.setDuration(TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS) + 1);
        }

        task.setProject(project);
        return taskRepository.save(task);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task existingTask = getTaskById(id);

        existingTask.setName(taskDetails.getName());
        existingTask.setDescription(taskDetails.getDescription());
        existingTask.setStartDate(taskDetails.getStartDate());
        existingTask.setEndDate(taskDetails.getEndDate());
        existingTask.setStatus(taskDetails.getStatus());
        existingTask.setPriority(taskDetails.getPriority());
        existingTask.setProgress(taskDetails.getProgress());
        existingTask.setBudgetAllocation(taskDetails.getBudgetAllocation());
        existingTask.setType(taskDetails.getType());
        existingTask.setNiveauRisque(taskDetails.getNiveauRisque());

        if (!existingTask.getStartDate().equals(taskDetails.getStartDate()) ||
                !existingTask.getEndDate().equals(taskDetails.getEndDate())) {
            long diffInMillis = existingTask.getEndDate().getTime() - existingTask.getStartDate().getTime();
            existingTask.setDuration(TimeUnit.DAYS.convert(diffInMillis, TimeUnit.MILLISECONDS) + 1);
        } else {
            existingTask.setDuration(taskDetails.getDuration());
        }

        return taskRepository.save(existingTask);
    }

    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with id: " + id);
        }
        taskRepository.deleteById(id);
    }
}