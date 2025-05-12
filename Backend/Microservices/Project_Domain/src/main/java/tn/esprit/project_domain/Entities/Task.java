package tn.esprit.project_domain.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.Date;


@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Task name is required")
    @Size(min = 3, max = 50, message = "Task name must be between 3 and 50 characters")
    private String name;

    @NotNull(message = "Start date is required")
    @Temporal(TemporalType.DATE)
    private Date startDate;

    @NotNull(message = "End date is required")
    @Temporal(TemporalType.DATE)
    private Date endDate;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be at least 1 day")
    private Long duration;

    @NotBlank(message = "Priority is required")
    @Pattern(regexp = "^(LOW|MEDIUM|HIGH)$", message = "Priority must be LOW, MEDIUM, or HIGH")
    private String priority;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 500, message = "Description must be between 10 and 500 characters")
    private String description;

    private Integer progress = 0;
    // Add to your Task class
    @DecimalMin(value = "0.0", message = "Budget allocation must be positive")
    private Double budgetAllocation;

    @NotBlank(message = "Task type is required")
    @Pattern(regexp = "^(bétonnage|extérieur|intérieur|gros œuvre|second œuvre)$", message = "Invalid task type")
    private String type;
    private String niveauRisque = "faible";




    @ManyToOne
    @JoinColumn(name = "project_name", referencedColumnName = "name")
    @JsonBackReference
    private Project project;

   /* @ManyToMany
    @JoinTable(
            name = "task_dependencies",
            joinColumns = @JoinColumn(name = "dependent_task_id"),
            inverseJoinColumns = @JoinColumn(name = "prerequisite_task_id")
    )
    @JsonBackReference(value = "prerequisiteTasks")
    private Set<Task> prerequisiteTasks = new HashSet<>();

    @ManyToMany(mappedBy = "prerequisiteTasks")
    @JsonManagedReference(value = "prerequisiteTasks")
    private Set<Task> dependentTasks = new HashSet<>();*/



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }
    public Project getProject() {
        return project;
    }

   /* public Set<Task> getPrerequisiteTasks() {
        return prerequisiteTasks;
    }

    public void setPrerequisiteTasks(Set<Task> prerequisiteTasks) {
        this.prerequisiteTasks = prerequisiteTasks;
    }

    public Set<Task> getDependentTasks() {
        return dependentTasks;
    }

    public void setDependentTasks(Set<Task> dependentTasks) {
        this.dependentTasks = dependentTasks;
    }
*/
    // Add getters and setters
    public Double getBudgetAllocation() {
        return budgetAllocation;
    }

    public void setBudgetAllocation(Double budgetAllocation) {
        this.budgetAllocation = budgetAllocation;
    }
    public void setProject(Project project) {
        this.project = project;
    }

   /* public void addPrerequisiteTask(Task task) {
        this.prerequisiteTasks.add(task);
        task.getDependentTasks().add(this);
    }

    public void removePrerequisiteTask(Task task) {
        this.prerequisiteTasks.remove(task);
        task.getDependentTasks().remove(this);
    }
*/
   public String getType() {
       return type;
   }

    public void setType(String type) {
        this.type = type;
    }
    public String getNiveauRisque() {
        return niveauRisque;
    }

    public void setNiveauRisque(String niveauRisque) {
        this.niveauRisque = niveauRisque;
    }

    public static TaskDTO toDTO(Task task) {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setId(task.getId());
        taskDTO.setName(task.getName());
        taskDTO.setStartDate(task.getStartDate());
        taskDTO.setEndDate(task.getEndDate());
        taskDTO.setStatus(task.getStatus().toString());
        taskDTO.setDuration(task.getDuration());
        taskDTO.setPriority(task.getPriority());
        taskDTO.setDescription(task.getDescription());
        taskDTO.setProjectName(task.getProject() != null ? task.getProject().getName() : null);
        taskDTO.setProgress(task.getProgress());

      /*  Set<Long> prerequisiteTaskIds = new HashSet<>();
        for (Task prerequisiteTask : task.getPrerequisiteTasks()) {
            prerequisiteTaskIds.add(prerequisiteTask.getId());
        }
        taskDTO.setPrerequisiteTaskIds(prerequisiteTaskIds);*/


        return taskDTO;
    }

    public static Task fromDTO(TaskDTO dto) {
        Task task = new Task();
        task.setName(dto.getName());
        task.setDescription(dto.getDescription());
        task.setStartDate(dto.getStartDate());
        task.setEndDate(dto.getEndDate());
        task.setStatus(TaskStatus.valueOf(dto.getStatus()));
        task.setPriority(dto.getPriority());
        task.setDuration(dto.getDuration());
        task.setProgress(dto.getProgress() != null ? dto.getProgress() : 0);
        return task;
    }


}
