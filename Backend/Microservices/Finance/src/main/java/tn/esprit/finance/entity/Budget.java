package tn.esprit.finance.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Le montant total ne peut pas être nul")
    @DecimalMin(value = "0.0", inclusive = false, message = "Le montant total doit être supérieur à zéro")
    private BigDecimal montantTotal;

    private BigDecimal montantRestant;

    @OneToOne
    @JoinColumn(name = "projet_id", nullable = false)
    private Projet projet; // Projet est une entité statique

    @AssertTrue(message = "Le montant restant doit être inférieur au montant total.")
    public boolean isMontantRestantValide() {
        if (montantTotal == null || montantRestant == null) {
            return true; // Si l'un des montants est nul, la validation sera gérée par @NotNull
        }
        return montantRestant.compareTo(montantTotal) < 0;
    }
}
