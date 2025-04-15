package tn.esprit.finance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tn.esprit.finance.entity.Payment;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private BigDecimal montant;
    private Payment.TypePiement type;
    private Long invoiceId;
    private Long budgetId;

}