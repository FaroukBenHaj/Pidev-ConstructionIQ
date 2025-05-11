export interface Commande {
  id: number;
  fournisseur: string;
  montant: number;
  status: CommandeStatus;
  matiere: Matiere;
  quantiteDemandee: number;
  dateCommande: Date;
}

export enum CommandeStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  DELIVERED = 'DELIVERED'
}

export enum Matiere {
  BETON = 'BETON',
  BRIQUES = 'BRIQUES',
  PARPAINGS = 'PARPAINGS',
  ACIER = 'ACIER',
  AGREGATS = 'AGRÉGATS',
  COFFRAGE = 'COFFRAGE',
  PLATRES = 'PLATRES'
}

export interface CommandeCreateDTO {
  fournisseur: string;
  montant: number;
  status: CommandeStatus;
  matiere: Matiere;
  quantiteDemandee: number;
}

export interface CommandeUpdateDTO {
  id: number;
  fournisseur?: string;
  montant?: number;
  status?: CommandeStatus;
  matiere?: Matiere;
  quantiteDemandee?: number;
}