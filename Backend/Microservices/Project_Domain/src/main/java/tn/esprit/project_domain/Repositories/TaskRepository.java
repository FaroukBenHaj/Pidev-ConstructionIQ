package tn.esprit.project_domain.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.project_domain.Entities.Task;

import java.util.List;


public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId " +
            "AND t.type IN ('bétonnage', 'extérieur') " +
            "AND t.niveauRisque IS NULL OR t.niveauRisque <> 'élevé'")
    List<Task> findWeatherSensitiveTasksByProject(@Param("projectId") Long projectId);
}
