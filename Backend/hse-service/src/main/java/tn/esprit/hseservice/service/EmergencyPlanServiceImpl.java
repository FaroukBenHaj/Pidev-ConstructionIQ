package tn.esprit.hseservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.hseservice.entity.EmergencyPlan;
import tn.esprit.hseservice.repository.EmergencyPlanRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EmergencyPlanServiceImpl implements EmergencyPlanService {

    @Autowired
    private EmergencyPlanRepository emergencyPlanRepository;

    @Override
    public EmergencyPlan createEmergencyPlan(EmergencyPlan plan) {
        return emergencyPlanRepository.save(plan);
    }

    @Override
    public EmergencyPlan updateEmergencyPlan(Long id, EmergencyPlan plan) {
        Optional<EmergencyPlan> optionalPlan = emergencyPlanRepository.findById(id);
        if(optionalPlan.isPresent()){
            plan.setPlanID(id);
            return emergencyPlanRepository.save(plan);
        } else {
            throw new RuntimeException("Emergency Plan non trouvé avec l'id " + id);
        }
    }

    @Override
    public void deleteEmergencyPlan(Long id) {
        emergencyPlanRepository.deleteById(id);
    }

    @Override
    public EmergencyPlan getEmergencyPlanById(Long id) {
        return emergencyPlanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Emergency Plan non trouvé avec l'id " + id));
    }

    @Override
    public List<EmergencyPlan> getAllEmergencyPlans() {
        return emergencyPlanRepository.findAll();
    }
}
