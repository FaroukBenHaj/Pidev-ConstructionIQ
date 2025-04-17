package tn.esprit.hseservice.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.hseservice.dto.ComplianceChecklistResponse;
import tn.esprit.hseservice.dto.InspectionResponse;
import tn.esprit.hseservice.entity.ComplianceChecklist;
import tn.esprit.hseservice.entity.Inspection;
import tn.esprit.hseservice.repository.InspectionRepository;
import tn.esprit.hseservice.service.ComplianceChecklistService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/compliance-checklists")
@CrossOrigin("*")
public class ComplianceChecklistController {

    @Autowired
    private ComplianceChecklistService complianceChecklistService;
    @Autowired
    private InspectionRepository inspectionRepository;
    @PostMapping("/inspection/{inspectionId}")
    public ComplianceChecklist createComplianceChecklist(
            @PathVariable Long inspectionId,
           @Valid @RequestBody ComplianceChecklist checklist) {

        Optional<Inspection> inspectionOpt = inspectionRepository.findById(inspectionId);
        if (!inspectionOpt.isPresent()) {
            throw new RuntimeException("Inspection not found with id " + inspectionId);
        }
        checklist.setInspection(inspectionOpt.get());
        return complianceChecklistService.createComplianceChecklist(checklist);
    }


    @PutMapping("/{id}/inspection/{inspectionId}")
    public ComplianceChecklist updateComplianceChecklist(
            @PathVariable Long id,
            @PathVariable Long inspectionId,
            @RequestBody ComplianceChecklist checklist) {

        Optional<Inspection> inspectionOpt = inspectionRepository.findById(inspectionId);
        if (!inspectionOpt.isPresent()) {
            throw new RuntimeException("Inspection not found with id " + inspectionId);
        }
        checklist.setInspection(inspectionOpt.get());
        return complianceChecklistService.updateComplianceChecklist(id, checklist);
    }

    @DeleteMapping("/{id}")
    public void deleteComplianceChecklist(@PathVariable Long id) {
        complianceChecklistService.deleteComplianceChecklist(id);
    }

    @GetMapping("/{id}")
    public ComplianceChecklist getComplianceChecklistById(@PathVariable Long id) {
        return complianceChecklistService.getComplianceChecklistById(id);
    }

    @GetMapping
    public List<ComplianceChecklistResponse> getAllComplianceChecklists() {
        List<ComplianceChecklist> checklists = complianceChecklistService.getAllComplianceChecklists();
        return checklists.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private ComplianceChecklistResponse convertToDto(ComplianceChecklist checklist) {
        ComplianceChecklistResponse dto = new ComplianceChecklistResponse();
        dto.setChecklistID(checklist.getChecklistID());
        dto.setRequirement(checklist.getRequirement());
        dto.setStatus(checklist.getStatus());
        dto.setComments(checklist.getComments());

        Inspection inspection = checklist.getInspection();
        InspectionResponse inspDto = new InspectionResponse();
        inspDto.setInspectionID(inspection.getInspectionID());
        inspDto.setProject_id(inspection.getProject_id());
        inspDto.setInspector(inspection.getInspector());
        inspDto.setDate(inspection.getDate());
        inspDto.setFindings(inspection.getFindings());
        inspDto.setRecommendations(inspection.getRecommendations());
        inspDto.setStatus(inspection.getStatus());
        inspDto.setInspectionType(inspection.getInspectionType());
        dto.setInspection(inspDto);

        return dto;
    }

}
