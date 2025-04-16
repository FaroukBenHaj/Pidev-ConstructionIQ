import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/app/service/material.service';
import { Material } from 'src/app/material.model';
import { Router } from '@angular/router';
import { Table } from 'primeng/table'; // Assurez-vous que Table est importé

@Component({
  selector: 'app-liste-material',
  templateUrl: './liste-material.component.html',
  styleUrls: ['./liste-material.component.css']
})
export class ListeMaterialComponent implements OnInit {
  navigateToAddMaterial(): void {
    this.router.navigate(['/material']);
  }
  
  loading: boolean = true;
  materials: Material[] = []; // Tableau des matériaux
  searchName: string = ''; // Variable pour la recherche globale

  // Options de filtre pour 'Unit' - menu déroulant
  unitOptions: any[] = [
    { label: 'KG', value: 'KG' },
    { label: 'LITRE', value: 'LITRE' },
    { label: 'UNITE', value: 'UNITE' },
    { label: 'METRE', value: 'METRE' }
  ];

  // Valeur sélectionnée pour l'unité
  selectedUnit: string | null = null;

  constructor(
    private materialService: MaterialService,
    private router: Router // Ajout de Router dans le constructeur
  ) { }

  ngOnInit(): void {
    this.loadMaterials(); // Charger les matériaux lors de l'initialisation du composant
  }

  // Charger les matériaux depuis le service
  loadMaterials(): void {
    this.materialService.getAllMaterials().subscribe(
      (data: Material[]) => {
        this.materials = data;
        console.log('✅ Matériaux chargés pour le graphique:', data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des matériaux', error);
      }
    );
  }
  
  // Fonction pour rediriger vers le formulaire de modification
  editMaterial(material: Material): void {
    this.router.navigate(['/material', material.materialID]);
  }

  // Fonction pour supprimer un matériau
  deleteMaterial(materialID: number): void {
    if (materialID) {
      this.materialService.deleteMaterial(materialID).subscribe(() => {
        this.loadMaterials();  // Recharger les matériaux après la suppression
      });
    }
  }

  // Fonction pour filtrer la table par l'unité
  filterByUnit(table: Table): void {
    if (this.selectedUnit) {
      table.filter(this.selectedUnit, 'materialUnit', 'equals');
    } else {
      table.clear();
    }
  }

  // Fonction pour filtrer la table globalement
  onGlobalFilter(table: Table, event: any): void {
    table.filterGlobal(event.target.value, 'contains');
  }
  
}
