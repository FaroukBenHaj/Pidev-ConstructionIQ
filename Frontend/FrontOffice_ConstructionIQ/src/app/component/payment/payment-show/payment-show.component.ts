import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { Payment, TypePaiement } from '../../../models/payment.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payment-show',
  templateUrl: './payment-show.component.html',
  styleUrls: ['./payment-show.component.css']
})
export class PaymentShowComponent implements OnInit {
  id: number;
  payment: Payment | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment() {
    this.loading = true;
    this.paymentService.getPaymentById(this.id)
      .pipe(first())
      .subscribe({
        next: payment => {
          this.payment = payment;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  deletePayment() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce paiement?')) {
      this.loading = true;
      this.paymentService.deletePayment(this.id)
        .pipe(first())
        .subscribe({
          next: () => {
            this.router.navigate(['/paiements']);
          },
          error: error => {
            this.error = error;
            this.loading = false;
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