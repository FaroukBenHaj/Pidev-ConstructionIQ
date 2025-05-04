package tn.esprit.hseservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.hseservice.entity.ComplianceChecklist;
import tn.esprit.hseservice.repository.ComplianceChecklistRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ComplianceChecklistServiceImpl implements ComplianceChecklistService {

    @Autowired
    private ComplianceChecklistRepository checklistRepository;

    @Override
    public ComplianceChecklist createComplianceChecklist(ComplianceChecklist checklist) {
        return checklistRepository.save(checklist);
    }

    @Override
    public ComplianceChecklist updateComplianceChecklist(Long id, ComplianceChecklist checklist) {
        Optional<ComplianceChecklist> optionalChecklist = checklistRepository.findById(id);
        if(optionalChecklist.isPresent()){
            checklist.setChecklistID(id);
            return checklistRepository.save(checklist);
        } else {
            throw new RuntimeException("Checklist non trouvée avec l'id " + id);
        }
    }

    @Override
    public void deleteComplianceChecklist(Long id) {
        checklistRepository.deleteById(id);
    }

    @Override
    public ComplianceChecklist getComplianceChecklistById(Long id) {
        return checklistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Checklist non trouvée avec l'id " + id));
    }

    @Override
    public List<ComplianceChecklist> getAllComplianceChecklists() {
        return checklistRepository.findAll();
    }
}
