import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../services/payment.service';
import { Payment, TypePaiement } from '../../../models/payment.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  loading = false;
  error = '';

  // Critères de recherche
  paymentSearchText = '';
  paymentType = '';
  paymentDateFrom: string | null = null;
  paymentDateTo: string | null = null;
  paymentTypeList = Object.values(TypePaiement);

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments() {
    this.loading = true;
    this.paymentService.getAllPayments()
      .pipe(first())
      .subscribe({
        next: payments => {
          this.payments = payments;
          this.filteredPayments = payments;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  filterPayments() {
    this.filteredPayments = this.payments.filter(pay => {
      const text = this.paymentSearchText.trim().toLowerCase();
      const matchesText =
        !text ||
        pay.montant.toString().includes(text);

      const matchesType =
        !this.paymentType || pay.type === this.paymentType;

      const date = new Date(pay.datePaiement);
      const fromOk = !this.paymentDateFrom || date >= new Date(this.paymentDateFrom);
      const toOk = !this.paymentDateTo || date <= new Date(this.paymentDateTo);

      return matchesText && matchesType && fromOk && toOk;
    });
  }

  deletePayment(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement?')) {
      this.paymentService.deletePayment(id)
        .pipe(first())
        .subscribe({
          next: () => {
            this.payments = this.payments.filter(p => p.id !== id);
            this.filterPayments();
          },
          error: error => {
            this.error = error;
          }
        });
    }
  }

  getPaymentTypeClass(type: TypePaiement): string {
    switch (type) {
      case TypePaiement.CHEQUE:
        return 'type-cheque';
      case TypePaiement.CARTE_BANCAIRE:
        return 'type-carte';
      case TypePaiement.ESPECE:
        return 'type-espece';
      default:
        return '';
    }
  }
}
