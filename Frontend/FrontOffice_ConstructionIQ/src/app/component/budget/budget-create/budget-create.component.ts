import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetService } from '../../../services/budget.service';
import { Projet } from '../../../models/projet.model';
import { BudgetCreateDTO } from '../../../models/budget.model';

@Component({
  selector: 'app-budget-create',
  templateUrl: './budget-create.component.html',
  styleUrls: ['./budget-create.component.css']
})
export class BudgetCreateComponent implements OnInit {
  budgetForm: FormGroup;
  projets: Projet[] = [
    { id: 1, nom: 'Projet A' },
    { id: 2, nom: 'Projet B' },
    { id: 3, nom: 'Projet C' }
  ]; // Statique comme demandé
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private budgetService: BudgetService,
    private router: Router
  ) { 
    this.budgetForm = this.formBuilder.group({
      montantTotal: ['', [Validators.required, Validators.min(0)]],
      montantRestant: ['', [Validators.required, Validators.min(0)]],
      projetId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialisation
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.budgetForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop si le formulaire est invalide
    if (this.budgetForm.invalid) {
      return;
    }

    this.loading = true;
    const budgetData: BudgetCreateDTO = {
      montantTotal: this.f['montantTotal'].value,
      montantRestant: this.f['montantRestant'].value,
      projetId: this.f['projetId'].value
    };

    this.budgetService.createBudget(budgetData)
      .subscribe({
        next: () => {
          this.router.navigate(['/budgets']);
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}