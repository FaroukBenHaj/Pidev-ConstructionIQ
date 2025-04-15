package tn.esprit.project_domain.RestApis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.project_domain.Entities.Task;
import tn.esprit.project_domain.Entities.TaskDTO;
import tn.esprit.project_domain.Services.TaskService;

import java.util.List;


@RestController
@RequestMapping("/tasks")
public class TaskRestApi {
    @Autowired
    private TaskService taskService;


    @PostMapping("/{projectName}")
    public TaskDTO createTask(@RequestBody TaskDTO taskDTO, @PathVariable String projectName) {
        System.out.println("Received task: " + taskDTO);
        Task task = Task.fromDTO(taskDTO);
        Task createdTask = taskService.createTask(task, projectName);
        return Task.toDTO(createdTask);
    }

    @GetMapping("/{id}")
    public TaskDTO getTaskById(@PathVariable Long id) {
        Task task = taskService.getTaskById(id);
        return Task.toDTO(task);
    }

    @GetMapping
    public List<TaskDTO> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return tasks.stream().map(Task::toDTO).toList();
    }

    @PutMapping("/{id}")
    public TaskDTO updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = taskService.updateTask(id, task);
        return Task.toDTO(updatedTask);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }




}