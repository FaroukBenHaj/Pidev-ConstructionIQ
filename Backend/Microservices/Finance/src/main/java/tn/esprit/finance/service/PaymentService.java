package tn.esprit.finance.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.finance.dto.PaymentDTO;
import tn.esprit.finance.entity.Budget;
import tn.esprit.finance.entity.Invoice;
import tn.esprit.finance.entity.Payment;
import tn.esprit.finance.repository.BudgetRepository;
import tn.esprit.finance.repository.InvoiceRepository;
import tn.esprit.finance.repository.PaymentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private BudgetRepository budgetRepository;

    @Transactional
    public Payment createPayment(PaymentDTO paymentDTO) {
        Payment payment = new Payment();
        payment.setMontant(paymentDTO.getMontant());
        payment.setType(paymentDTO.getType());

        // Gestion de l'association avec l'Invoice
        if (paymentDTO.getInvoiceId() != null) {
            Invoice invoice = invoiceRepository.findById(paymentDTO.getInvoiceId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found with id " + paymentDTO.getInvoiceId()));
            payment.setInvoice(invoice);
        }

        // Gestion de l'association avec le Budget
        if (paymentDTO.getBudgetId() != null) {
            Budget budget = budgetRepository.findById(paymentDTO.getBudgetId())
                    .orElseThrow(() -> new RuntimeException("Budget not found with id " + paymentDTO.getBudgetId()));
            payment.setBudget(budget);
        }

        return paymentRepository.save(payment);
    }

    public Optional<Payment> getPaymentById(Long id) {
        return paymentRepository.findById(id);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Transactional
    public Payment updatePayment(Long id, PaymentDTO paymentDTO) {
        Payment existingPayment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));

        existingPayment.setMontant(paymentDTO.getMontant());
        existingPayment.setType(paymentDTO.getType());

        // Mise à jour de l'association avec l'Invoice si nécessaire
        if (paymentDTO.getInvoiceId() != null) {
            Invoice invoice = invoiceRepository.findById(paymentDTO.getInvoiceId())
                    .orElseThrow(() -> new RuntimeException("Invoice not found with id " + paymentDTO.getInvoiceId()));
            existingPayment.setInvoice(invoice);
        }

        // Mise à jour de l'association avec le Budget si nécessaire
        if (paymentDTO.getBudgetId() != null) {
            Budget budget = budgetRepository.findById(paymentDTO.getBudgetId())
                    .orElseThrow(() -> new RuntimeException("Budget not found with id " + paymentDTO.getBudgetId()));
            existingPayment.setBudget(budget);
        }

        return paymentRepository.save(existingPayment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
