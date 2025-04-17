package tn.esprit.hseservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.hseservice.entity.Incident;
import tn.esprit.hseservice.entity.IncidentSeverity;
import tn.esprit.hseservice.repository.IncidentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class IncidentServiceImpl implements IncidentService {

    @Autowired
    private IncidentRepository incidentRepository;
    @Autowired
    private IncidentSeverityClassifierService classifierService;
    @Override
    public Incident createIncident(Incident incident) {
        // Automatically assign severity based on the description.
        if (incident.getDescription() != null && !incident.getDescription().isEmpty()) {
            IncidentSeverity severity = classifierService.classify(incident.getDescription());
            incident.setSeverity(severity);
        }
        return incidentRepository.save(incident);
    }

    @Override
    public Incident updateIncident(Long id, Incident incident) {
        Optional<Incident> optionalIncident = incidentRepository.findById(id);
        if (optionalIncident.isPresent()) {
            // Optionally, update the severity if the description is changed.
            if (incident.getDescription() != null && !incident.getDescription().isEmpty()) {
                IncidentSeverity severity = classifierService.classify(incident.getDescription());
                incident.setSeverity(severity);
            }
            incident.setIncidentID(id);
            return incidentRepository.save(incident);
        } else {
            throw new RuntimeException("Incident not found with id " + id);
        }
    }

    @Override
    public void deleteIncident(Long id) {
        incidentRepository.deleteById(id);
    }

    @Override
    public Incident getIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident non trouvé avec l'id " + id));
    }

    @Override
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }
}
