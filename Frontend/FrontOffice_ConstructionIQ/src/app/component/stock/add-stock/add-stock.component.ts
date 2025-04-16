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
    stockID: undefined,
    projetID: 0,
    materialIDs: [],
    materials: []
  };

  materials: Material[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  totalCost: number | null = null;  // ➕ Ajout du coût total

  constructor(
    private stockService: StockService,
    private materialService: MaterialService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

      // Récupérer les objets Material à partir des IDs
      this.newStock.materials = this.materials.filter(material =>
        this.newStock.materialIDs.includes(material.materialID)
      );

      this.stockService.createStock(this.newStock).subscribe(
        (data) => {
          this.successMessage = 'Le stock a été ajouté avec succès.';
          this.router.navigate(['/stock']);
          // ➕ Appel pour récupérer le coût total
          if (data.stockID) {
            this.loadTotalCost(data.stockID);
          }
          // Optionnel : Rediriger après quelques secondes
          // this.router.navigate(['/stock']);
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

  loadTotalCost(stockId: number): void {
    this.stockService.getStockTotalCost(stockId).subscribe({
      next: (cost) => this.totalCost = cost,
      error: () => {
        this.totalCost = null;
        console.error('Erreur lors du calcul du coût total.');
      }
    });
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

  onMaterialSelect() {
    if (this.newStock.materialIDs.length === 1) {
      const selectedId = this.newStock.materialIDs[0];
      const selectedMaterial = this.materials.find(mat => mat.materialID === selectedId);
      this.newStock.availableQuantity = selectedMaterial?.selectedQuantity || 0;
    } else {
      this.newStock.availableQuantity = this.materials
        .filter(mat => this.newStock.materialIDs.includes(mat.materialID))
        .reduce((total, mat) => total + (mat.selectedQuantity || 0), 0);
    }
  }
}
