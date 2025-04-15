package tn.esprit.project_domain.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.project_domain.Entities.Project;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p WHERE p.name = :name")
    Project findByName(@Param("name") String name);

    List<Project> findByNameContainingIgnoreCase(String name);

}