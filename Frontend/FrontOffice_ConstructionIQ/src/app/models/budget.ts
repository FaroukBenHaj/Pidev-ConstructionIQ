import { Commande } from './commande'; 
export class Budget {
    id: number;
    montantTotal: number;
    montantRestant: number;
    projetId: number;
    commandes: Commande[];
  
    constructor(
      id: number = 0,
      montantTotal: number = 0,
      montantRestant: number = 0,
      projetId: number = 0,
      commandes: Commande[] = []
    ) {
      this.id = id;
      this.montantTotal = montantTotal;
      this.montantRestant = montantRestant;
      this.projetId = projetId;
      this.commandes = commandes;
    }
  }
  