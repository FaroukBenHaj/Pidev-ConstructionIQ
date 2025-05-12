package tn.esprit.hseservice.service;

import tn.esprit.hseservice.entity.ComplianceChecklist;
import java.util.List;

public interface ComplianceChecklistService {
    ComplianceChecklist createComplianceChecklist(ComplianceChecklist checklist);
    ComplianceChecklist updateComplianceChecklist(Long id, ComplianceChecklist checklist);
    void deleteComplianceChecklist(Long id);
    ComplianceChecklist getComplianceChecklistById(Long id);
    List<ComplianceChecklist> getAllComplianceChecklists();
}
