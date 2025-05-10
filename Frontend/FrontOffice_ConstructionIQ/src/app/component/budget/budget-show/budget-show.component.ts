import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../../../services/budget.service';
import { Budget } from '../../../models/budget.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-budget-show',
  templateUrl: './budget-show.component.html',
  styleUrls: ['./budget-show.component.css']
})
export class BudgetShowComponent implements OnInit {
  id: number;
  budget: Budget | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getBudget();
  }

  getBudget() {
    this.loading = true;
    this.budgetService.getBudgetById(this.id)
      .pipe(first())
      .subscribe({
        next: budget => {
          this.budget = budget;
          this.loading = false;
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }

  deleteBudget() {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce budget?')) {
      this.loading = true;
      this.budgetService.deleteBudget(this.id)
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
}