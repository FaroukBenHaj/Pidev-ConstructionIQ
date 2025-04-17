import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../../../services/commande.service';
import { Commande, CommandeStatus, CommandeUpdateDTO, Matiere } from '../../../models/commande.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-commande-edit',
  templateUrl: './commande-edit.component.html',
  styleUrls: ['./commande-edit.component.css']
})
export class CommandeEditComponent implements OnInit {
  id: number;
  commande: Commande | null = null;
  commandeForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  
  // Expose enums for the template
  commandeStatuses = Object.values(CommandeStatus);
  matieres = Object.values(Matiere);

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.commandeForm = this.formBuilder.group({
      fournisseur: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      matiere: ['', Validators.required],
      quantiteDemandee: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.getCommande();
  }

  getCommande() {
    this.commandeService.getCommandeById(this.id)
      .pipe(first())
      .subscribe({
        next: commande => {
          this.commande = commande;
          this.commandeForm.patchValue({
            fournisseur: commande.fournisseur,
            montant: commande.montant,
            status: commande.status,
            matiere: commande.matiere,
            quantiteDemandee: commande.quantiteDemandee
          });
        },
        error: error => {
          this.error = error;
        }
      });
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.commandeForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop si le formulaire est invalide
    if (this.commandeForm.invalid) {
      return;
    }

    this.loading = true;
    const commandeData: CommandeUpdateDTO = {
      id: this.id,
      fournisseur: this.f['fournisseur'].value,
      montant: this.f['montant'].value,
      status: this.f['status'].value,
      matiere: this.f['matiere'].value,
      quantiteDemandee: this.f['quantiteDemandee'].value
    };

    this.commandeService.updateCommande(this.id, commandeData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/commandes']);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}