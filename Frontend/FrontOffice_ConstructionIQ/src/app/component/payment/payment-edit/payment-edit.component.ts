import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { InvoiceService } from '../../../services/invoice.service';
import { BudgetService } from '../../../services/budget.service';
import { Payment, PaymentUpdateDTO, TypePaiement } from '../../../models/payment.model';
import { Invoice } from '../../../models/invoice.model';
import { Budget } from '../../../models/budget.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.css']
})
export class PaymentEditComponent implements OnInit {
  id: number;
  payment: Payment | null = null;
  paymentForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  invoices: Invoice[] = [];
  budgets: Budget[] = [];
  loadingInvoices = false;
  loadingBudgets = false;
  
  // Expose enums for the template
  typePaiements = Object.values(TypePaiement);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private budgetService: BudgetService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.paymentForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      invoiceId: ['', Validators.required],
      budgetId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInvoices();
    this.loadBudgets();
    this.getPayment();
  }

  loadInvoices() {
    this.loadingInvoices = true;
    this.invoiceService.getAllInvoices()
      .pipe(first())
      .subscribe({
        next: invoices => {
          this.invoices = invoices;
          this.loadingInvoices = false;
        },
        error: error => {
          this.error = error;
          this.loadingInvoices = false;
        }
      });
  }

  loadBudgets() {
    this.loadingBudgets = true;
    this.budgetService.getAllBudgets()
      .pipe(first())
      .subscribe({
        next: budgets => {
          this.budgets = budgets;
          this.loadingBudgets = false;
        },
        error: error => {
          this.error = error;
          this.loadingBudgets = false;
        }
      });
  }

  getPayment() {
    this.paymentService.getPaymentById(this.id)
      .pipe(first())
      .subscribe({
        next: payment => {
          this.payment = payment;
          this.paymentForm.patchValue({
            montant: payment.montant,
            type: payment.type,
            invoiceId: payment.invoice.id,
            budgetId: payment.budget.id
          });
        },
        error: error => {
          this.error = error;
        }
      });
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.paymentForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop si le formulaire est invalide
    if (this.paymentForm.invalid) {
      return;
    }

    this.loading = true;
    const paymentData: PaymentUpdateDTO = {
      id: this.id,
      montant: this.f['montant'].value,
      type: this.f['type'].value,
      invoiceId: this.f['invoiceId'].value,
      budgetId: this.f['budgetId'].value
    };

    this.paymentService.updatePayment(this.id, paymentData)
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