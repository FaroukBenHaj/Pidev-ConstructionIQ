import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../services/invoice.service';
import { CommandeService } from '../../../services/commande.service';
import { InvoiceCreateDTO, StatutInvoice } from '../../../models/invoice.model';
import { Commande } from '../../../models/commande.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {
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
    private invoiceService: InvoiceService,
    private commandeService: CommandeService,
    private router: Router
  ) {
    this.invoiceForm = this.formBuilder.group({
      montant: ['', [Validators.required, Validators.min(0)]],
      statut: [StatutInvoice.EN_ATTENTE, Validators.required],
      commandeId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCommandes();
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

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.invoiceForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop si le formulaire est invalide
    if (this.invoiceForm.invalid) {
      return;
    }

    this.loading = true;
    const invoiceData: InvoiceCreateDTO = {
      montant: this.f['montant'].value,
      statut: this.f['statut'].value,
      commandeId: this.f['commandeId'].value
    };

    this.invoiceService.createInvoice(invoiceData)
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