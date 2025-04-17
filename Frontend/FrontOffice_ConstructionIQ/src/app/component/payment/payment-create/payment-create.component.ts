import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';
import { InvoiceService } from '../../../services/invoice.service';
import { BudgetService } from '../../../services/budget.service';
import { PaymentCreateDTO, TypePaiement } from '../../../models/payment.model';
import { Invoice } from '../../../models/invoice.model';
import { Budget } from '../../../models/budget.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent implements OnInit {
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
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private budgetService: BudgetService,
    private router: Router
  ) {
    this.paymentForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      type: [TypePaiement.CARTE_BANCAIRE, Validators.required],
      invoiceId: ['', Validators.required],
      budgetId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInvoices();
    this.loadBudgets();
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

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.paymentForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop si le formulaire est invalide
    if (this.paymentForm.invalid) {
      return;
    }

    this.loading = true;
    const paymentData: PaymentCreateDTO = {
      montant: this.f['montant'].value,
      type: this.f['type'].value,
      invoiceId: this.f['invoiceId'].value,
      budgetId: this.f['budgetId'].value
    };

    this.paymentService.createPayment(paymentData)
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