import { Material } from "../material.model";

export class Stock {
  stockID?: number;
  projetID: number;
  materialIDs: number[];  // Liste des IDs des matériaux sélectionnés
  availableQuantity: number;
  dateReceived: string;
  materials: Material[] = [];  // Liste des objets Material associés (peut être utilisée dans le frontend)

  constructor(stockID: number, projetID: number, materialIDs: number[], availableQuantity: number, dateReceived: string) {
    this.stockID = stockID;
    this.projetID = projetID;
    this.materialIDs = materialIDs;
    this.availableQuantity = availableQuantity;
    this.dateReceived = dateReceived;
  }
}
