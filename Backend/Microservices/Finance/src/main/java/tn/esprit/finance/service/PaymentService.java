package tn.esprit.finance.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.finance.entity.Payment;
import tn.esprit.finance.repository.PaymentRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
        return paymentRepository.findById(id).map(existingPayment -> {
            existingPayment.setMontant(updatedPayment.getMontant());
            existingPayment.setDatePaiement(updatedPayment.getDatePaiement());

            return paymentRepository.save(existingPayment);
        }).orElseThrow(() -> new IllegalArgumentException("Paiement non trouvé !"));
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
