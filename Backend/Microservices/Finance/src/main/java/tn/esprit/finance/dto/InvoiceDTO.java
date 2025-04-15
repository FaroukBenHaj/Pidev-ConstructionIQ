package tn.esprit.finance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.esprit.finance.entity.Invoice;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
    private BigDecimal montant;
    private Invoice.StatutInvoice statut;
    private Long commandeId;
}