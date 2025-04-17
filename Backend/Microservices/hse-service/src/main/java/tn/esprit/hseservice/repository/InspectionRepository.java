package tn.esprit.hseservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.hseservice.entity.Inspection;
@Repository
public interface InspectionRepository extends JpaRepository<Inspection, Long> {
}
