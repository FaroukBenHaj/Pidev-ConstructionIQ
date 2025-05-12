import { Commande } from './commande.model';

export interface Invoice {
  id: number;
  montant: number;
  dateEmission: Date;
  statut: StatutInvoice;
  commande: Commande;
}

export enum StatutInvoice {
  EN_ATTENTE = 'EN_ATTENTE',
  PAYE = 'PAYE',
  ANNULE = 'ANNULE'
}

export interface InvoiceCreateDTO {
  montant: number;
  statut?: StatutInvoice;
  commandeId: number;
}

export interface InvoiceUpdateDTO {
  id: number;
  montant?: number;
  statut?: StatutInvoice;
  commandeId?: number;
}