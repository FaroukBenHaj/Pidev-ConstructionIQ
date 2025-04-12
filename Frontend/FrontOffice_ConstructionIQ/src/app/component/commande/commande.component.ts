import { Component, OnInit } from '@angular/core';
import { Commande, CommandeStatus } from 'src/app/models/commande';
import { CommandeService } from 'src/app/services/commande.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html'
})
export class CommandeComponent implements OnInit {
  commandes: Commande[] = [];
  commandeForm: FormGroup;
  statuses = Object.values(CommandeStatus);

  constructor(
    private commandeService: CommandeService,
    private fb: FormBuilder
  ) {
    this.commandeForm = this.fb.group({
      fournisseur: ['', Validators.required],
      montant: [0, [Validators.required, Validators.min(0.01)]],
      status: [CommandeStatus.PENDING, Validators.required],
      budgetId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCommandes();
  }

  getCommandes(): void {
    this.commandeService.getAllCommandes().subscribe(data => this.commandes = data);
  }

  createCommande(): void {
    if (this.commandeForm.valid) {
      this.commandeService.createCommande(this.commandeForm.value).subscribe(() => {
        this.getCommandes();
        this.commandeForm.reset();
      });
    }
  }

  deleteCommande(id: number): void {
    this.commandeService.deleteCommande(id).subscribe(() => this.getCommandes());
  }
}
