import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { CommandeService } from '../../../services/commande.service';
import { Invoice, InvoiceUpdateDTO, StatutInvoice } from '../../../models/invoice.model';
import { Commande } from '../../../models/commande.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  id: number;
  invoice: Invoice | null = null;
  invoiceForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  commandes: Commande[] = [];
  loadingCommandes = false;
  
  // Expose enums for the template
  statutsInvoice = Object.values(StatutInvoice);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService,
    private commandeService: CommandeService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.invoiceForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      statut: ['', Validators.required],
      commandeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCommandes();
    this.getInvoice();
  }

  loadCommandes() {
    this.loadingCommandes = true;
    this.commandeService.getAllCommandes()
      .pipe(first())
      .subscribe({
        next: commandes => {
          this.commandes = commandes;
          this.loadingCommandes = false;
        },
        error: error => {
          this.error = error;
          this.loadingCommandes = false;
        }
      });
  }

  getInvoice() {
    this.invoiceService.getInvoiceById(this.id)
      .pipe(first())
      .subscribe({
        next: invoice => {
          this.invoice = invoice;
          this.invoiceForm.patchValue({
            montant: invoice.montant,
            statut: invoice.statut,
            commandeId: invoice.commande.id
          });
        },
        error: error => {
          this.error = error;
        }
      });
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.invoiceForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop si le formulaire est invalide
    if (this.invoiceForm.invalid) {
      return;
    }

    this.loading = true;
    const invoiceData: InvoiceUpdateDTO = {
      id: this.id,
      montant: this.f['montant'].value,
      statut: this.f['statut'].value,
      commandeId: this.f['commandeId'].value
    };

    this.invoiceService.updateInvoice(this.id, invoiceData)
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