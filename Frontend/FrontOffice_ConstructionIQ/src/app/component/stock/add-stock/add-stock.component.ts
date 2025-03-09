import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/service/stock.service';
import { MaterialService } from 'src/app/service/material.service';
import { Stock } from 'src/app/models/stock.model';
import { Router } from '@angular/router';
import { Material } from 'src/app/material.model';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  newStock: Stock = {
    availableQuantity: 0,
    dateReceived: '',
    stockID: undefined,  // Ne pas envoyer stockID lors de la création
    projetID: 0,
    materialIDs: [],  // Liste des IDs des matériaux
    materials: [] // Liste des objets Material
  };

  materials: Material[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;

  constructor(private stockService: StockService, 
              private materialService: MaterialService, 
              private router: Router) {}

  ngOnInit(): void {
    // Récupérer la liste des matériaux
    this.materialService.getAllMaterials().subscribe(
      (data) => {
        this.materials = data;
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la récupération des matériaux.';
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.isValidForm()) {
      this.isSubmitting = true;

      // Récupérer les objets Material complets à partir des IDs sélectionnés
      this.newStock.materials = this.materials.filter(material => this.newStock.materialIDs.includes(material.materialID));

      // Appel du service pour ajouter le stock
      this.stockService.createStock(this.newStock).subscribe(
        (data) => {
          this.successMessage = 'Le stock a été ajouté avec succès.';
          this.router.navigate(['/stock']); // Redirection après ajout
        },
        (error) => {
          this.isSubmitting = false;
          this.handleError(error);
        }
      );
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
    }
  }

  isValidForm(): boolean {
    return (
      this.newStock.availableQuantity > 0 &&
      this.newStock.dateReceived !== '' &&
      this.newStock.materialIDs.length > 0
    );
  }

  handleError(error: any): void {
    this.errorMessage = '';
    if (error.status === 500) {
      this.errorMessage = 'Une erreur interne est survenue. Veuillez réessayer plus tard.';
    } else if (error.status === 400) {
      this.errorMessage = 'Erreur dans les données envoyées. Veuillez vérifier.';
    } else {
      this.errorMessage = 'Une erreur inconnue est survenue.';
    }
    console.error(this.errorMessage);
  }
}
