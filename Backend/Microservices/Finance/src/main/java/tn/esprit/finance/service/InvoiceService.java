package tn.esprit.finance.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.finance.dto.InvoiceDTO;
import tn.esprit.finance.entity.Commande;
import tn.esprit.finance.entity.Invoice;
import tn.esprit.finance.repository.CommandeRepository;
import tn.esprit.finance.repository.InvoiceRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CommandeRepository commandeRepository;

    @Transactional
    public Invoice createInvoice(InvoiceDTO invoiceDTO) {
        Invoice invoice = new Invoice();
        invoice.setMontant(invoiceDTO.getMontant());
        invoice.setStatut(invoiceDTO.getStatut());

        // Vérifier si l'identifiant de la commande est présent
        if (invoiceDTO.getCommandeId() != null) {
            Commande commande = commandeRepository.findById(invoiceDTO.getCommandeId())
                    .orElseThrow(() -> new RuntimeException("Commande not found with id " + invoiceDTO.getCommandeId()));
            invoice.setCommande(commande);
        }

        return invoiceRepository.save(invoice);
    }

    public Optional<Invoice> getInvoiceById(Long id) {
        return invoiceRepository.findById(id);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @Transactional
    public Invoice updateInvoice(Long id, InvoiceDTO invoiceDTO) {
        Invoice existingInvoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id " + id));

        existingInvoice.setMontant(invoiceDTO.getMontant());
        existingInvoice.setStatut(invoiceDTO.getStatut());

        // Mettre à jour l'association avec la commande si nécessaire
        if (invoiceDTO.getCommandeId() != null) {
            Commande commande = commandeRepository.findById(invoiceDTO.getCommandeId())
                    .orElseThrow(() -> new RuntimeException("Commande not found with id " + invoiceDTO.getCommandeId()));
            existingInvoice.setCommande(commande);
        }

        return invoiceRepository.save(existingInvoice);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
}
