package tn.esprit.finance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.finance.entity.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}
