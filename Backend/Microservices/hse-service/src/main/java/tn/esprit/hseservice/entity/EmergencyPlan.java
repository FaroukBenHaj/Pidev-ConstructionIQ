package tn.esprit.hseservice.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmergencyPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planID;
    @NotNull(message = "Project ID is required")
    private Long project_id;
    @NotBlank(message = "Risk assessment is required")
    @Size(min=10, max=500,message="Risk assessment must be between 10 and 500 characters")
    private String riskAssessment;
    @NotBlank(message = "Evacuation procedure is required")
    private String evacuationProcedure;
    @NotBlank(message = "Evacuation procedure is required")
    private String responsiblePerson;

    // Champs avancés
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastReviewedDate;

    private String version;
}