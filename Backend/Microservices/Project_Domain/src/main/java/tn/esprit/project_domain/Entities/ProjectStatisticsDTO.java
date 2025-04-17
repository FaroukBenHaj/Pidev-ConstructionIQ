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

    // Getters and Setters
    public int getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(int totalTasks) {
        this.totalTasks = totalTasks;
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