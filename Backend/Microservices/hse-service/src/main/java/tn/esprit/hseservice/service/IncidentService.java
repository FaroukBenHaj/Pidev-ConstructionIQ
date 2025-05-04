package tn.esprit.hseservice.service;

import tn.esprit.hseservice.entity.Incident;
import java.util.List;

public interface IncidentService {
    Incident createIncident(Incident incident);
    Incident updateIncident(Long id, Incident incident);
    void deleteIncident(Long id);
    Incident getIncidentById(Long id);
    List<Incident> getAllIncidents();
}
