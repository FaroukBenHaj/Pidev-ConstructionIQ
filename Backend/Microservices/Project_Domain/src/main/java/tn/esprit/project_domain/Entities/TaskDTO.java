package tn.esprit.project_domain.Entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class TaskDTO {
    private Long id;
    private String name;
    private Date startDate;
    private Date endDate;
    private String status;
    private Long duration;
    private String priority;
    private String description;
    private String projectName;
    private Integer progress;
    private Double budgetAllocation;
    private String type;
    private String niveauRisque;
   // private Set<Long> prerequisiteTaskIds = new HashSet<>();

  /*  public Set<Long> getPrerequisiteTaskIds() {
        return prerequisiteTaskIds;
    }

    public void setPrerequisiteTaskIds(Set<Long> prerequisiteTaskIds) {
        this.prerequisiteTaskIds = prerequisiteTaskIds;
    }*/

    public Double getBudgetAllocation() {
        return budgetAllocation;
    }

    public void setBudgetAllocation(Double budgetAllocation) {
        this.budgetAllocation = budgetAllocation;
    }

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

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }


}
