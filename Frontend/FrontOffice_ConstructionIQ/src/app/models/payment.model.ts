import { Budget } from './budget.model';
import { Invoice } from './invoice.model';

export interface Payment {
  id: number;
  montant: number;
  datePaiement: Date;
  type: TypePaiement;
  budget: Budget;
  invoice: Invoice;
}

export enum TypePaiement {
  CHEQUE = 'CHEQUE',
  CARTE_BANCAIRE = 'CARTE_BANQUAIRE', // Notez la faute de frappe ici pour correspondre au backend
  ESPECE = 'ESPECE'
}

export interface PaymentCreateDTO {
  montant: number;
  type: TypePaiement;
  invoiceId: number;
  budgetId: number;
}

export interface PaymentUpdateDTO {
  id: number;
  montant?: number;
  type?: TypePaiement;
  invoiceId?: number;
  budgetId?: number;
}