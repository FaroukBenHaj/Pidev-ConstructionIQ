package tn.esprit.hseservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.hseservice.entity.EmergencyPlan;
@Repository
public interface EmergencyPlanRepository extends JpaRepository<EmergencyPlan, Long> {
}
