import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialService } from 'src/app/service/material.service';
import { Material } from 'src/app/material.model';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { utils, writeFileXLSX } from 'xlsx';

@Component({
  selector: 'app-liste-material',
  templateUrl: './liste-material.component.html',
  styleUrls: ['./liste-material.component.css']
})
export class ListeMaterialComponent implements OnInit {
  @ViewChild('dt1') dt1!: Table; // Ajout du ! pour indiquer qu'elle sera initialisée
  
  loading: boolean = true;
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  searchName: string = '';

  unitOptions: any[] = [
    { label: 'KG', value: 'KG' },
    { label: 'LITRE', value: 'LITRE' },
    { label: 'UNITE', value: 'UNITE' },
    { label: 'METRE', value: 'METRE' }
  ];

  selectedUnit: string | null = null;

  constructor(
    private materialService: MaterialService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMaterials();
  }
  exportToExcel(): void {
    // Préparer les données
    const excelData = this.materials.map(material => ({
      'Nom': material.materialName,
      'Coût (€)': material.cost,
      'Unité': material.materialUnit,
      'Quantité': material.selectedQuantity || 0
    }));
  
    // Créer et télécharger le fichier
    const worksheet = utils.json_to_sheet(excelData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Matériaux");
    writeFileXLSX(workbook, "export_materiaux.xlsx");
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = URL.createObjectURL(data);
    a.download = `${fileName}_${new Date().getTime()}.xlsx`;
    a.click();
    document.body.removeChild(a);
  }


  loadMaterials(): void {
    this.loading = true;
    this.materialService.getAllMaterials().subscribe({
      next: (data: Material[]) => {
        this.materials = data;
        this.filteredMaterials = [...data];
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des matériaux', error);
        this.loading = false;
      }
    });
  }

  updateFilteredMaterials(): void {
    this.filteredMaterials = this.dt1?.filteredValue || this.materials;
  }

  onGlobalFilter(table: Table, event: any): void {
    table.filterGlobal(event.target.value, 'contains');
    this.updateFilteredMaterials();
  }

  filterByUnit(table: Table): void {
    if (this.selectedUnit) {
      table.filter(this.selectedUnit, 'materialUnit', 'equals');
    } else {
      table.filter(null, 'materialUnit', 'equals');
    }
    this.updateFilteredMaterials();
  }

  editMaterial(material: Material): void {
    this.router.navigate(['/material', material.materialID]);
  }

  deleteMaterial(materialID: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce matériau ?')) {
      this.materialService.deleteMaterial(materialID).subscribe({
        next: () => this.loadMaterials(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  navigateToAddMaterial(): void {
    this.router.navigate(['/material']);
  }
}