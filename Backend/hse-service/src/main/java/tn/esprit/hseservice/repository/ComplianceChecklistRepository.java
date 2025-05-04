package tn.esprit.hseservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.hseservice.entity.ComplianceChecklist;
@Repository
public interface ComplianceChecklistRepository extends JpaRepository<ComplianceChecklist, Long> {
}
