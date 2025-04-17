import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../../../services/budget.service';
import { Projet } from '../../../models/projet.model';
import { Budget, BudgetUpdateDTO } from '../../../models/budget.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-budget-edit',
  templateUrl: './budget-edit.component.html',
  styleUrls: ['./budget-edit.component.css']
})
export class BudgetEditComponent implements OnInit {
  id: number;
  budget: Budget | null = null;
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
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.budgetForm = this.formBuilder.group({
      montantTotal: ['', [Validators.required, Validators.min(0)]],
      montantRestant: ['', [Validators.required, Validators.min(0)]],
      projetId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.budgetService.getBudgetById(this.id)
      .pipe(first())
      .subscribe({
        next: budget => {
          this.budget = budget;
          this.budgetForm.patchValue({
            montantTotal: budget.montantTotal,
            montantRestant: budget.montantRestant,
            projetId: budget.projet.id
          });
        },
        error: error => {
          this.error = error;
        }
      });
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
    const budgetData: BudgetUpdateDTO = {
      id: this.id,
      montantTotal: this.f['montantTotal'].value,
      montantRestant: this.f['montantRestant'].value,
      projetId: this.f['projetId'].value
    };

    this.budgetService.updateBudget(this.id, budgetData)
      .pipe(first())
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