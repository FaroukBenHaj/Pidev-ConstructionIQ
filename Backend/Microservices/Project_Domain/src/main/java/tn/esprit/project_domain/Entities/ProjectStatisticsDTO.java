package tn.esprit.project_domain.Entities;

import java.util.Map;

public class ProjectStatisticsDTO {
    private int totalTasks;
    private int completedTasks;
    private int inProgressTasks;
    private int notStartedTasks;
    private double overallProgress;
    private Map<String, Long> tasksByPriority;
    private Map<String, Long> tasksByStatus;
    private double budgetUtilization;
    private int overdueTasks;
    private int tasksDueSoon;
    private double budgetAllocationRate;
    private Double budgetEfficiency;
    private double projectHealthScore;
    private String projectName;
    private Double progressConfidence;



    // Getters and Setters

    public Double getProgressConfidence() {
        return progressConfidence;
    }

    public void setProgressConfidence(Double progressConfidence) {
        this.progressConfidence = progressConfidence;
    }

    public int getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(int totalTasks) {
        this.totalTasks = totalTasks;
    }


    public Double getBudgetEfficiency() {
        return budgetEfficiency;
    }

    public void setBudgetEfficiency(Double budgetEfficiency) {
        this.budgetEfficiency = budgetEfficiency;
    }

    public double getProjectHealthScore() {
        return projectHealthScore;
    }

    public void setProjectHealthScore(double projectHealthScore) {
        this.projectHealthScore = projectHealthScore;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public double getBudgetAllocationRate() {
        return budgetAllocationRate;
    }

    public void setBudgetAllocationRate(double budgetAllocationRate) {
        this.budgetAllocationRate = budgetAllocationRate;
    }

    public int getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(int completedTasks) {
        this.completedTasks = completedTasks;
    }

    public int getInProgressTasks() {
        return inProgressTasks;
    }

    public void setInProgressTasks(int inProgressTasks) {
        this.inProgressTasks = inProgressTasks;
    }

    public int getNotStartedTasks() {
        return notStartedTasks;
    }

    public void setNotStartedTasks(int notStartedTasks) {
        this.notStartedTasks = notStartedTasks;
    }

    public double getOverallProgress() {
        return overallProgress;
    }

    public void setOverallProgress(double overallProgress) {
        this.overallProgress = overallProgress;
    }

    public Map<String, Long> getTasksByPriority() {
        return tasksByPriority;
    }

    public void setTasksByPriority(Map<String, Long> tasksByPriority) {
        this.tasksByPriority = tasksByPriority;
    }

    public Map<String, Long> getTasksByStatus() {
        return tasksByStatus;
    }

    public void setTasksByStatus(Map<String, Long> tasksByStatus) {
        this.tasksByStatus = tasksByStatus;
    }

    public double getBudgetUtilization() {
        return budgetUtilization;
    }

    public void setBudgetUtilization(double budgetUtilization) {
        this.budgetUtilization = budgetUtilization;
    }

    public int getOverdueTasks() {
        return overdueTasks;
    }

    public void setOverdueTasks(int overdueTasks) {
        this.overdueTasks = overdueTasks;
    }

    public int getTasksDueSoon() {
        return tasksDueSoon;
    }

    public void setTasksDueSoon(int tasksDueSoon) {
        this.tasksDueSoon = tasksDueSoon;
    }
}