package tn.esprit.hseservice.dto;

import lombok.Data;
import tn.esprit.hseservice.entity.InspectionStatus;

import java.util.Date;
@Data
public class InspectionResponse {
    private Long inspectionID;
    private Long project_id;
    private String inspector;
    private Date date;
    private String findings;
    private String recommendations;
    private InspectionStatus status;
    private String inspectionType;
}
