import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/Material/stock.service';
import { MaterialService } from 'src/app/services/Material/material.service';
import { Stock } from 'src/app/models/stock.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Material } from 'src/app/material.model';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  stock: Stock = {
    availableQuantity: 0,
    dateReceived: '',
    stockID: undefined,
    projetID: 0,
    materialIDs: [],
    materials: [],
  };

  materials: Material[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isSubmitting: boolean = false;
  totalCost: number | null = null;
  isEditMode: boolean = false;

  constructor(
    private stockService: StockService,
    private materialService: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMaterials();
    this.checkEditMode();
  }

  private loadMaterials(): void {
    this.materialService.getAllMaterials().subscribe({
      next: (data) => this.materials = data,
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des matériaux.';
        console.error(error);
      }
    });
  }

  private checkEditMode(): void {
    const stockId = this.route.snapshot.paramMap.get('id');
    if (stockId) {
      this.isEditMode = true;
      this.loadStockForEdit(+stockId);
    }
  }

  private loadStockForEdit(stockId: number): void {
    this.stockService.getStockById(stockId).subscribe({
      next: (stock) => {
        this.stock = stock;
        this.stock.materialIDs = stock.materials?.map(m => m.materialID) || [];
        this.loadTotalCost(stockId);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement du stock.';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.isSubmitting) return;

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.isValidForm()) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    this.isSubmitting = true;
    this.prepareMaterials();

    const operation = this.isEditMode
      ? this.stockService.updateStock(this.stock)
      : this.stockService.createStock(this.stock);

    operation.subscribe({
      next: (data) => this.handleSuccess(data),
      error: (error) => this.handleError(error)
    });
  }

  private prepareMaterials(): void {
    this.stock.materials = this.materials
      .filter(m => this.stock.materialIDs.includes(m.materialID))
      .map(m => ({ ...m }));
  }

  private handleSuccess(data: Stock): void {
    this.successMessage = this.isEditMode
      ? 'Stock mis à jour avec succès.'
      : 'Stock créé avec succès.';

    if (data.stockID) {
      this.loadTotalCost(data.stockID);
    }

    setTimeout(() => this.router.navigate(['/stock']), 1500);
  }

  private handleError(error: any): void {
    this.isSubmitting = false;

    if (error.status === 500) {
      this.errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
    } else if (error.status === 400) {
      this.errorMessage = 'Données invalides. Veuillez vérifier.';
    } else {
      this.errorMessage = 'Une erreur inconnue est survenue.';
    }

    console.error(error);
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
    return this.stock.availableQuantity > 0 &&
           this.stock.dateReceived !== '' &&
           this.stock.materialIDs.length > 0;
  }

  onMaterialSelect(): void {
    const selectedMaterials = this.materials
      .filter(m => this.stock.materialIDs.includes(m.materialID));

    this.stock.availableQuantity = selectedMaterials.length === 1
      ? selectedMaterials[0]?.selectedQuantity || 0
      : selectedMaterials.reduce((total, m) => total + (m.selectedQuantity || 0), 0);
  }

  cancel(): void {
    this.router.navigate(['/stock']);
  }
}
