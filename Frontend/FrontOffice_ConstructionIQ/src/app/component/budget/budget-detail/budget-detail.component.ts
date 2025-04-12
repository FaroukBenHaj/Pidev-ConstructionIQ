import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget } from 'src/app/models/budget';
import { BudgetService } from 'src/app/services/budget.service';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.css']
})
export class BudgetDetailComponent implements OnInit {
  budget: Budget | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadBudget(id);
    } else {
      this.error = 'ID de budget non fourni';
      this.loading = false;
    }
  }

  loadBudget(id: string): void {
    this.budgetService.getBudgetById(id).subscribe({
      next: (data) => {
        this.budget = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du budget: ' + err.message;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/budget-list']);
  }

  editBudget(): void {
    if (this.budget) {
      this.router.navigate(['/budget-edit', this.budget.id]);
    }
  }
} 