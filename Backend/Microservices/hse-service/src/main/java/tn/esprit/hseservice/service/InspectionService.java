package tn.esprit.hseservice.service;

import tn.esprit.hseservice.entity.Inspection;
import java.util.List;

public interface InspectionService {
    Inspection createInspection(Inspection inspection);
    Inspection updateInspection(Long id, Inspection inspection);
    void deleteInspection(Long id);
    Inspection getInspectionById(Long id);
    List<Inspection> getAllInspections();
}
