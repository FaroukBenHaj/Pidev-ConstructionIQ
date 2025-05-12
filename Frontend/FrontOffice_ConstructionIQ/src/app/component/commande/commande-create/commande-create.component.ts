import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandeService } from '../../../services/commande.service';
import { CommandeCreateDTO, CommandeStatus, Matiere } from '../../../models/commande.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-commande-create',
  templateUrl: './commande-create.component.html',
  styleUrls: ['./commande-create.component.css']
})
export class CommandeCreateComponent implements OnInit {
  commandeForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  
  // Expose enums for the template
  commandeStatuses = Object.values(CommandeStatus);
  matieres = Object.values(Matiere);

  constructor(
    private formBuilder: FormBuilder,
    private commandeService: CommandeService,
    private router: Router
  ) {
    this.commandeForm = this.formBuilder.group({
      fournisseur: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]],
      status: [CommandeStatus.PENDING, Validators.required],
      matiere: ['', Validators.required],
      quantiteDemandee: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Initialisation
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
    const commandeData: CommandeCreateDTO = {
      fournisseur: this.f['fournisseur'].value,
      montant: this.f['montant'].value,
      status: this.f['status'].value,
      matiere: this.f['matiere'].value,
      quantiteDemandee: this.f['quantiteDemandee'].value
    };

    this.commandeService.createCommande(commandeData)
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