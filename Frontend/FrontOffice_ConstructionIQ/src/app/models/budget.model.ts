import { Projet } from './projet.model';

export interface Budget {
  id: number;
  montantTotal: number;
  montantRestant: number;
  projet: Projet;
}

export interface BudgetCreateDTO {
  montantTotal: number;
  montantRestant?: number;
  projetId: number;
}

export interface BudgetUpdateDTO {
  id: number;
  montantTotal?: number;
  montantRestant?: number;
  projetId?: number;
}