package tn.esprit.project_domain.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.project_domain.Entities.Task;


public interface TaskRepository extends JpaRepository<Task, Long> {
}
