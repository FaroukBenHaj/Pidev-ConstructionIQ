package tn.esprit.finance.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Commande {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fournisseur;

    @Column(nullable = false)
    private BigDecimal montant;

    @Enumerated(EnumType.STRING)
    private CommandeStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Matiere matiere;

    @Column(nullable = false)
    private int quantiteDemandee;

    @Column(nullable = false)
    private LocalDateTime dateCommande;

    @PrePersist
    protected void onCreate() {
        this.dateCommande = LocalDateTime.now();
    }

    public enum CommandeStatus {
        PENDING, APPROVED, REJECTED, DELIVERED
    }

    public enum Matiere {
        BETON,
        BRIQUES,
        PARPAINGS,
        ACIER,
        AGRÉGATS, // sable, gravier, gravillons
        COFFRAGE, // bois, panneaux et carton de coffrage
        PLATRES
    }
}
