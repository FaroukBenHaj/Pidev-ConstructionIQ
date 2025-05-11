package tn.esprit.hseservice.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long incidentID;
    @NotNull(message="Project ID is required")
    private Long project_id;

    @Temporal(TemporalType.TIMESTAMP)
    @NotNull(message="Date is required")
    private Date date;
    @NotBlank(message="Description is required")

    private String description;

    @Enumerated(EnumType.STRING)
    private IncidentSeverity severity;
    @NotNull(message="Status is required")
    @Enumerated(EnumType.STRING)
    private IncidentStatus status;
    @NotNull(message="Location is required")
    private String location;
    private String actionsTaken;

    @Temporal(TemporalType.TIMESTAMP)
    private Date resolutionDate;
}
