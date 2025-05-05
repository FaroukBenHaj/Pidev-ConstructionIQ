import {Component, OnInit} from '@angular/core';
import {Claim} from "../../Modules/claim.model";
import { ClaimServiceService } from '../../services/Claim/claim-service.service';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  claims: Claim[] = [];

  constructor(private claimService: ClaimServiceService) { }

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimService.getClaims().subscribe(
      (data) => {
        this.claims = data;
      },
      (error) => {
        console.error('Error fetching claims:', error);
      }
    );
  }

  deleteClaim(id: number): void {
    if (confirm('Are you sure you want to delete this claim?')) {
      this.claimService.deleteClaim(id).subscribe(
        () => {
          this.loadClaims();
        },
        (error) => {
          console.error('Error deleting claim:', error);
        }
      );
    }
  }
}
