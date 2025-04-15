import { Component, OnInit } from '@angular/core';
import { Budget } from 'src/app/models/budget';
import { BudgetService } from 'src/app/services/budget.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(-10px)' })),
      transition(':enter', [
        animate('400ms ease-out')
      ])
    ])
  ]
})
export class BudgetComponent implements OnInit {
  budgets: Budget[] = [];
  budgetForm: FormGroup;
  showSuccess: boolean = false;

  constructor(
    private budgetService: BudgetService,
    private fb: FormBuilder
  ) {
    this.budgetForm = this.fb.group({
      projetId: [0, Validators.required],
      montantTotal: [0, [Validators.required, Validators.min(0.01)]],
      montantRestant: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.getBudgets();
  }

  getBudgets(): void {
    this.budgetService.getAllBudgets().subscribe(data => this.budgets = data);
  }

  onSubmit(): void {
    if (this.budgetForm.valid) {
      this.budgetService.createBudget(this.budgetForm.value).subscribe(() => {
        this.getBudgets();
        this.budgetForm.reset();

        // ✅ Affiche le message de succès pendant 3 secondes
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
      });
    }
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => this.getBudgets());
  }
}
