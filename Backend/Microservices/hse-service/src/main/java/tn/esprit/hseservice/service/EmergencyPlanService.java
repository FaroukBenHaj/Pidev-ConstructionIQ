package tn.esprit.hseservice.service;

import tn.esprit.hseservice.entity.EmergencyPlan;
import java.util.List;

public interface EmergencyPlanService {
    EmergencyPlan createEmergencyPlan(EmergencyPlan plan);
    EmergencyPlan updateEmergencyPlan(Long id, EmergencyPlan plan);
    void deleteEmergencyPlan(Long id);
    EmergencyPlan getEmergencyPlanById(Long id);
    List<EmergencyPlan> getAllEmergencyPlans();
}
