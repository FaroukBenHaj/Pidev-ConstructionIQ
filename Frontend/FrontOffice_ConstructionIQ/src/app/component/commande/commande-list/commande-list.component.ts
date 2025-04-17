import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../../services/commande.service';
import { Commande, CommandeStatus } from '../../../models/commande.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit {
  commandes: Commande[] = [];
  filteredCommandes: Commande[] = [];
  loading = false;
  error = '';

  // Critères de recherche
  searchText = '';
  searchStatus = '';
  dateFrom: string | null = null;
  dateTo: string | null = null;
  statusList = Object.values(CommandeStatus);

  CommandeStatus = CommandeStatus; // Pour utiliser l'enum dans le template

  constructor(private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.loadCommandes();
  }

  loadCommandes() {
    this.loading = true;
    this.commandeService.getAllCommandes()
      .pipe(first())
      .subscribe({
        next: commandes => {
          this.commandes = commandes;
          this.filteredCommandes = commandes;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  filterCommandes() {
    this.filteredCommandes = this.commandes.filter(cmd => {
      const text = this.searchText.trim().toLowerCase();
      const matchesText =
        !text ||
        cmd.fournisseur.toLowerCase().includes(text) ||
        cmd.matiere.toLowerCase().includes(text);

      const matchesStatus =
        !this.searchStatus || cmd.status === this.searchStatus;

      const date = new Date(cmd.dateCommande);
      const fromOk = !this.dateFrom || date >= new Date(this.dateFrom);
      const toOk = !this.dateTo || date <= new Date(this.dateTo);

      return matchesText && matchesStatus && fromOk && toOk;
    });
  }

  deleteCommande(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande?')) {
      this.commandeService.deleteCommande(id)
        .pipe(first())
        .subscribe({
          next: () => {
            this.commandes = this.commandes.filter(c => c.id !== id);
            this.filterCommandes();
          },
          error: error => {
            this.error = error;
          }
        });
    }
  }

  getStatusClass(status: CommandeStatus): string {
    switch (status) {
      case CommandeStatus.APPROVED:
        return 'status-approved';
      case CommandeStatus.REJECTED:
        return 'status-rejected';
      case CommandeStatus.DELIVERED:
        return 'status-delivered';
      default:
        return 'status-pending';
    }
  }
}