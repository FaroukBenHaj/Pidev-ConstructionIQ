package tn.esprit.project_domain.Entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.FutureOrPresent;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ValidDateRange
@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    @Column(unique = true)
    private String name;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;

    @NotNull(message = "Start date is required")
    @FutureOrPresent(message = "Start date must be in the present or future")
    private Date startDate;

    @NotNull(message = "End date is required")
    private Date endDate;

    @NotNull(message = "Budget is required")
    @Min(value = 1, message = "Budget must be greater than 0")
    private Double budget;

    @NotBlank(message = "City is required")
    private String ville;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference

    private List<Task> tasks = new ArrayList<>();


    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotBlank(message = "Name is required") @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name is required") @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters") String name) {
        this.name = name;
    }

    public @NotBlank(message = "Description is required") @Size(min = 10, max = 500, message = "Description must be between 10 and 500 characters") String getDescription() {
        return description;
    }

    public void setDescription(@NotBlank(message = "Description is required") @Size(min = 10, max = 500, message = "Description must be between 10 and 500 characters") String description) {
        this.description = description;
    }

    public @NotNull(message = "Start date is required") Date getStartDate() {
        return startDate;
    }

    public void setStartDate(@NotNull(message = "Start date is required") Date startDate) {
        this.startDate = startDate;
    }

    public @NotNull(message = "End date is required") Date getEndDate() {
        return endDate;
    }

    public void setEndDate(@NotNull(message = "End date is required") Date endDate) {
        this.endDate = endDate;
    }

    public @NotNull(message = "Budget is required") @Min(value = 0, message = "Budget must be greater than or equal to 0") Double getBudget() {
        return budget;
    }

    public void setBudget(@NotNull(message = "Budget is required") @Min(value = 0, message = "Budget must be greater than or equal to 0") Double budget) {
        this.budget = budget;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public void addTask(Task task) {
        tasks.add(task);
        task.setProject(this);
    }

    /*public void removeTask(Task task) {
        tasks.remove(task);
        task.setProject(null);
    }*/
}
