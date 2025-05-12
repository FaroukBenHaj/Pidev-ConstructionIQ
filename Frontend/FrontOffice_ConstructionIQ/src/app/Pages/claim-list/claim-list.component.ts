import { Component, OnInit } from '@angular/core';
import { Claim } from "../../Modules/claim.model";
import { ClaimServiceService } from '../../services/Claim/claim-service.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  claims: Claim[] = [];
  filteredClaims: Claim[] = [];
  loading = false;
  error: string | null = null;

  // Filter properties
  searchText = '';
  claimTypeFilter = '';
  priorityFilter = '';
  dateFrom: string | null = null;
  dateTo: string | null = null;

  // Available options for filters
  claimTypes: string[] = ['Quality', 'Delivery', 'Payment', 'Service'];
  priorities: string[] = ['High', 'Medium', 'Low'];

  constructor(private claimService: ClaimServiceService) { }

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.loading = true;
    this.error = null;
    
    this.claimService.getClaims().subscribe({
      next: (data) => {
        this.claims = data;
        this.filteredClaims = [...data];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching claims:', error);
        this.error = 'Failed to load claims. Please try again later.';
        this.loading = false;
      }
    });
  }

  deleteClaim(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réclamation?')) {
      this.loading = true;
      this.claimService.deleteClaim(id).subscribe({
        next: () => {
          this.loadClaims();
        },
        error: (error) => {
          console.error('Error deleting claim:', error);
          this.error = 'Failed to delete claim. Please try again.';
          this.loading = false;
        }
      });
    }
  }

  filterClaims(): void {
    this.filteredClaims = this.claims.filter(claim => {
      // Text search filter
      const matchesSearch = !this.searchText || 
        claim.id.toString().includes(this.searchText) ||
        claim.sender.toLowerCase().includes(this.searchText.toLowerCase()) ||
        claim.receiver.toLowerCase().includes(this.searchText.toLowerCase());

      // Type filter
      const matchesType = !this.claimTypeFilter || 
        claim.claimType === this.claimTypeFilter;

      // Priority filter
      const matchesPriority = !this.priorityFilter || 
        claim.initialPriority === this.priorityFilter;

      // Date range filter
      let matchesDate = true;
      if (this.dateFrom || this.dateTo) {
        const claimDate = new Date(claim.sendDate);
        const fromDate = this.dateFrom ? new Date(this.dateFrom) : null;
        const toDate = this.dateTo ? new Date(this.dateTo) : null;

        if (fromDate && claimDate < fromDate) matchesDate = false;
        if (toDate && claimDate > toDate) matchesDate = false;
      }

      return matchesSearch && matchesType && matchesPriority && matchesDate;
    });
  }

  getStatusCount(status: string): number {
    return this.filteredClaims.filter(c => c.urgencyClassification === status).length;
  }

  getPriorityCount(priority: string): number {
    return this.filteredClaims.filter(c => c.initialPriority === priority).length;
  }

  resetFilters(): void {
    this.searchText = '';
    this.claimTypeFilter = '';
    this.priorityFilter = '';
    this.dateFrom = null;
    this.dateTo = null;
    this.filterClaims();
  }
}