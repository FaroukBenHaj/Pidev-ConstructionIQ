import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { Invoice, StatutInvoice } from '../../../models/invoice.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  loading = false;
  error = '';

  // Critères de recherche
  invoiceSearchText = '';
  invoiceStatus = '';
  invoiceDateFrom: string | null = null;
  invoiceDateTo: string | null = null;
  invoiceStatusList = Object.values(StatutInvoice);

  StatutInvoice = StatutInvoice; // Pour utiliser l'enum dans le template

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.loading = true;
    this.invoiceService.getAllInvoices()
      .pipe(first())
      .subscribe({
        next: invoices => {
          this.invoices = invoices;
          this.filteredInvoices = invoices;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  filterInvoices() {
    this.filteredInvoices = this.invoices.filter(inv => {
      const text = this.invoiceSearchText.trim().toLowerCase();
      const matchesText =
        !text ||
        inv.id.toString().includes(text) ||
        inv.montant.toString().includes(text);

      const matchesStatus =
        !this.invoiceStatus || inv.statut === this.invoiceStatus;

      const date = new Date(inv.dateEmission);
      const fromOk = !this.invoiceDateFrom || date >= new Date(this.invoiceDateFrom);
      const toOk = !this.invoiceDateTo || date <= new Date(this.invoiceDateTo);

      return matchesText && matchesStatus && fromOk && toOk;
    });
  }

  deleteInvoice(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture?')) {
      this.invoiceService.deleteInvoice(id)
        .pipe(first())
        .subscribe({
          next: () => {
            this.invoices = this.invoices.filter(i => i.id !== id);
            this.filterInvoices();
          },
          error: error => {
            this.error = error;
          }
        });
    }
  }

  getStatusClass(statut: StatutInvoice): string {
    switch (statut) {
      case StatutInvoice.PAYE:
        return 'status-paid';
      case StatutInvoice.ANNULE:
        return 'status-canceled';
      default:
        return 'status-pending';
    }
  }
}
