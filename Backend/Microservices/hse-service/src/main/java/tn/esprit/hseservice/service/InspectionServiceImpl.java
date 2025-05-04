package tn.esprit.hseservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.hseservice.entity.Inspection;
import tn.esprit.hseservice.repository.InspectionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InspectionServiceImpl implements InspectionService {

    @Autowired
    private InspectionRepository inspectionRepository;

    @Override
    public Inspection createInspection(Inspection inspection) {
        return inspectionRepository.save(inspection);
    }

    @Override
    public Inspection updateInspection(Long id, Inspection inspection) {
        Optional<Inspection> optionalInspection = inspectionRepository.findById(id);
        if(optionalInspection.isPresent()){
            inspection.setInspectionID(id);
            return inspectionRepository.save(inspection);
        } else {
            throw new RuntimeException("Inspection non trouvée avec l'id " + id);
        }
    }

    @Override
    public void deleteInspection(Long id) {
        inspectionRepository.deleteById(id);
    }

    @Override
    public Inspection getInspectionById(Long id) {
        return inspectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inspection non trouvée avec l'id " + id));
    }

    @Override
    public List<Inspection> getAllInspections() {
        return inspectionRepository.findAll();
    }
}
