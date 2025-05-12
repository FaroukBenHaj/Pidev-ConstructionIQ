package tn.esprit.finance.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Commande commande;


    @Enumerated(EnumType.STRING)
    private StatutInvoice statut;



    public enum StatutInvoice {
        EN_ATTENTE, PAYE, ANNULE
    }
}