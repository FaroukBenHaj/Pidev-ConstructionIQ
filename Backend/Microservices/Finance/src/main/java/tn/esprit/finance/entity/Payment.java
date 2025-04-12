package tn.esprit.finance.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    @JsonIgnoreProperties("payments")
    private Invoice invoice;

    @Column(nullable = false)
    private BigDecimal montant;

    private LocalDateTime datePaiement;

    @PrePersist
    protected void onCreate() {
        this.datePaiement = LocalDateTime.now();
    }

    @Enumerated(EnumType.STRING)
    private TypePiement type;

    public enum TypePiement {
        CHEQUE, CATE_BANQUAIRE, ESPECE
    }
}