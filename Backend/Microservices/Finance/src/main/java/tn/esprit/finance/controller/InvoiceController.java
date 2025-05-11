package tn.esprit.finance.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.finance.dto.InvoiceDTO;
import tn.esprit.finance.entity.Invoice;
import tn.esprit.finance.service.InvoiceService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<?> createInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        try {
            Invoice createdInvoice = invoiceService.createInvoice(invoiceDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdInvoice);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating invoice: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Long id) {
        Optional<Invoice> invoice = invoiceService.getInvoiceById(id);
        return invoice.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceService.getAllInvoices());
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateInvoice(@PathVariable Long id, @RequestBody InvoiceDTO invoiceDTO) {
        try {
            Invoice updatedInvoice = invoiceService.updateInvoice(id, invoiceDTO);
            return ResponseEntity.ok(updatedInvoice);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating invoice: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
        invoiceService.deleteInvoice(id);
        return ResponseEntity.noContent().build();
    }
}