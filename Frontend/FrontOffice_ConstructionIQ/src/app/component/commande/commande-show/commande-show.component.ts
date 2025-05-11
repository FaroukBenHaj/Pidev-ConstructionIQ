import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../../../services/commande.service';
import { Commande, CommandeStatus } from '../../../models/commande.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-commande-show',
  templateUrl: './commande-show.component.html',
  styleUrls: ['./commande-show.component.css']
})
export class CommandeShowComponent implements OnInit {
  id: number;
  commande: Commande | null = null;
  loading = false;
  error = '';
  CommandeStatus = CommandeStatus; // Pour utiliser l'enum dans le template

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getCommande();
  }

  getCommande() {
    this.loading = true;
    this.commandeService.getCommandeById(this.id)
      .pipe(first())
      .subscribe({
        next: commande => {
          this.commande = commande;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  deleteCommande() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande?')) {
      this.loading = true;
      this.commandeService.deleteCommande(this.id)
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