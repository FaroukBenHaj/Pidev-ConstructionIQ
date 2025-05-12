package tn.esprit.hseservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.hseservice.entity.Incident;
@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
}
