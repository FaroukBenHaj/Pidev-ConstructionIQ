package tn.esprit.hseservice.entity;


import jakarta.persistence.*;
import lombok.*;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inspection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long inspectionID;

    private Long project_id;

    private String inspector;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private String findings;
    private String recommendations;

    @Enumerated(EnumType.STRING)
    private InspectionStatus status;

    // Champ avancé
    private String inspectionType;

    // Relation avec les contrôles de conformité
    @OneToMany(mappedBy = "inspection", cascade = CascadeType.ALL, orphanRemoval = true)

    private List<ComplianceChecklist> complianceChecklists = new ArrayList<>();
}

