export class Commande {
    id: number;
    fournisseur: string;
    montant: number;
    status: CommandeStatus;
    budgetId: number;
    dateCommande: string;
  
    constructor(
      id: number = 0,
      fournisseur: string = '',
      montant: number = 0,
      status: CommandeStatus = CommandeStatus.PENDING,
      budgetId: number = 0,
      dateCommande: string = ''
    ) {
      this.id = id;
      this.fournisseur = fournisseur;
      this.montant = montant;
      this.status = status;
      this.budgetId = budgetId;
      this.dateCommande = dateCommande;
    }
  }
  
  export enum CommandeStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    DELIVERED = 'DELIVERED'
  }
  