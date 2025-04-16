import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from 'src/app/service/material.service';
import { Material } from 'src/app/material.model';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materialForm: FormGroup;
  materialID: number | undefined;

  constructor(
    private materialService: MaterialService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.materialForm = this.fb.group({
      materialName: ['', [Validators.required]],
      cost: ['', [Validators.required, Validators.min(0)]],
      materialUnit: ['', [Validators.required]],
      selectedQuantity: ['', [Validators.required, Validators.min(0)]]  // Ajout de selectedQuantity dans le formulaire
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.materialID = +params['id'];  // L'ID du matériau à modifier
      if (isNaN(this.materialID)) {
        console.error('L\'ID est invalide:', this.materialID);
        return;  // Arrêter l'exécution si l'ID n'est pas valide
      }
      this.loadMaterial(this.materialID);  // Charger les données du matériau à modifier
    });
  }

  loadMaterial(id: number): void {
    this.materialService.getMaterialById(id).subscribe(material => {
      this.materialForm.patchValue({
        materialName: material.materialName,
        cost: material.cost,
        materialUnit: material.materialUnit,
        selectedQuantity: material.selectedQuantity || 0  // Charger la quantité sélectionnée si disponible
      });
    }, error => {
      console.error('Erreur lors de la récupération du matériau:', error);
    });
  }

  onSubmit(): void {
    if (this.materialForm.valid) {
      const material: Material = {
        materialID: this.materialID,  // ID du matériau (présent ou pas selon l'existence)
        ...this.materialForm.value
      };

      if (this.materialID) {
        // Si un ID existe, c'est une mise à jour
        this.materialService.updateMaterial(material).subscribe(
          (response) => {
            console.log('Material updated successfully:', response);
            this.router.navigate(['/ListeMaterial']);
          },
          (error) => {
            console.error('Error updating material:', error);
          }
        );
      } else {
        // Sinon, c'est un ajout de nouveau matériau
        this.materialService.createMaterial(material).subscribe(
          (response) => {
            console.log('Material added successfully:', response);
            this.router.navigate(['/ListeMaterial']);
          },
          (error) => {
            console.error('Error adding material:', error);
          }
        );
      }
    }
  }
}
