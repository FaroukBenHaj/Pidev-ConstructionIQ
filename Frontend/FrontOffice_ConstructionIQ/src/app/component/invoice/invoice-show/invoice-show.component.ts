import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { PdfService } from '../../../services/pdf.service';
import { InvoicePdfService } from '../../../services/invoicepdf.service';
import { Invoice, StatutInvoice } from '../../../models/invoice.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.component.html',
  styleUrls: ['./invoice-show.component.css']
})
export class InvoiceShowComponent implements OnInit {
  id: number;
  invoice: Invoice | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private pdfService: PdfService,
    private invoicePdfService: InvoicePdfService // Injection du service PDF amélioré
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice() {
    this.loading = true;
    this.invoiceService.getInvoiceById(this.id)
      .pipe(first())
      .subscribe({
        next: invoice => {
          this.invoice = invoice;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  deleteInvoice() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture?')) {
      this.loading = true;
      this.invoiceService.deleteInvoice(this.id)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['/factures']);
          },
          error: error => {
            this.error = error;
            this.loading = false;
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

  // Méthode pour télécharger la facture en PDF
  downloadInvoicePdf() {
    if (this.invoice) {
      try {
        // Utilisation du service de PDF amélioré
        this.invoicePdfService.generateProfessionalInvoice(this.invoice);
        
        // Alternative avec le service de base
        // this.pdfService.generateInvoicePdf(this.invoice);
        
        // Alternative avec génération depuis HTML
        // this.pdfService.generatePdfFromHtml('invoice-content', `facture_${this.invoice.id}.pdf`);
      } catch (error) {
        console.error('Erreur lors de la génération du PDF', error);
        this.error = 'Une erreur est survenue lors de la génération du PDF';
      }
    } else {
      this.error = 'Impossible de générer le PDF: données de facture non disponibles';
    }
  }
}