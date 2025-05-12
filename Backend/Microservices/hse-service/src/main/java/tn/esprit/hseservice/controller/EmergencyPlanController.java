package tn.esprit.hseservice.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.hseservice.entity.EmergencyPlan;
import tn.esprit.hseservice.service.EmergencyPlanService;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-plans")
@CrossOrigin("*")
public class EmergencyPlanController {

    @Autowired
    private EmergencyPlanService emergencyPlanService;

    @PostMapping
    public EmergencyPlan createEmergencyPlan( @Valid @RequestBody EmergencyPlan plan) {
        return emergencyPlanService.createEmergencyPlan(plan);
    }

    @PutMapping("/{id}")
    public EmergencyPlan updateEmergencyPlan(@PathVariable Long id, @RequestBody EmergencyPlan plan) {
        return emergencyPlanService.updateEmergencyPlan(id, plan);
    }

    @DeleteMapping("/{id}")
    public void deleteEmergencyPlan(@PathVariable Long id) {
        emergencyPlanService.deleteEmergencyPlan(id);
    }

    @GetMapping("/{id}")
    public EmergencyPlan getEmergencyPlanById(@PathVariable Long id) {
        return emergencyPlanService.getEmergencyPlanById(id);
    }

    @GetMapping
    public List<EmergencyPlan> getAllEmergencyPlans() {
        return emergencyPlanService.getAllEmergencyPlans();
    }
}
