package tn.esprit.hseservice.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplianceChecklist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checklistID;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inspection_id", nullable = false)
    @JsonIgnore
    private Inspection inspection;

    @NotBlank(message = "Requirement is required")
    private String requirement;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Status is required")
    private ChecklistStatus status;

    @Size(max=500, message="Comments must be at most 500 characters")
    private String comments;
}
