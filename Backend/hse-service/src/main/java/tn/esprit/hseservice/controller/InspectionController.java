package tn.esprit.hseservice.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.hseservice.entity.Inspection;
import tn.esprit.hseservice.service.InspectionService;

import java.util.List;

@RestController
@RequestMapping("/api/inspections")
@CrossOrigin("*")
public class InspectionController {

    @Autowired
    private InspectionService inspectionService;

    @PostMapping
    public Inspection createInspection( @Valid @RequestBody Inspection inspection) {
        return inspectionService.createInspection(inspection);
    }

    @PutMapping("/{id}")
    public Inspection updateInspection(@PathVariable Long id, @RequestBody Inspection inspection) {
        return inspectionService.updateInspection(id, inspection);
    }

    @DeleteMapping("/{id}")
    public void deleteInspection(@PathVariable Long id) {
        inspectionService.deleteInspection(id);
    }

    @GetMapping("/{id}")
    public Inspection getInspectionById(@PathVariable Long id) {
        return inspectionService.getInspectionById(id);
    }

    @GetMapping
    public List<Inspection> getAllInspections() {
        return inspectionService.getAllInspections();
    }
}
