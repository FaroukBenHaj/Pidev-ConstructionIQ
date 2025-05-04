package tn.esprit.hseservice.dto;

import lombok.Data;
import tn.esprit.hseservice.entity.ChecklistStatus;
@Data
public class ComplianceChecklistResponse {
    private Long checklistID;
    private InspectionResponse inspection;
    private String requirement;
    private ChecklistStatus status;
    private String comments;
}
