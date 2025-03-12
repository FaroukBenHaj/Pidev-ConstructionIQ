package tn.esprit.finance.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal montant;

    @Column(nullable = false)
    private LocalDateTime dateEmission;
    @PrePersist
    protected void onCreate() {
        this.dateEmission = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "commande_id")
    private Commande commande ;

    @Enumerated(EnumType.STRING)
    private StatutInvoice statut;

    @OneToMany(mappedBy = "invoice")
    @JsonBackReference
    private List<Payment> payments;

    public enum StatutInvoice {
        EN_ATTENTE, PAYE, ANNULE
    }
}