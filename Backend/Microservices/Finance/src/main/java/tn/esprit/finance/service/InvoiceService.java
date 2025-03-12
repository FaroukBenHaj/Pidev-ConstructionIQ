package tn.esprit.finance.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.finance.entity.Invoice;
import tn.esprit.finance.repository.InvoiceRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice updateInvoice(Long id, Invoice updatedInvoice) {
        return invoiceRepository.findById(id).map(existingInvoice -> {
            existingInvoice.setMontant(updatedInvoice.getMontant());
            existingInvoice.setStatut(updatedInvoice.getStatut());
            existingInvoice.setDateEmission(updatedInvoice.getDateEmission());
            return invoiceRepository.save(existingInvoice);
        }).orElseThrow(() -> new IllegalArgumentException("Facture non trouvée !"));
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}
