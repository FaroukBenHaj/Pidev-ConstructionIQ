import {Component, OnInit} from '@angular/core';
import {Claim} from "../../Modules/claim.model";
import {ActivatedRoute} from "@angular/router";
import {ClaimServiceService} from "../../services/Claim/claim-service.service";

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {
  claim: Claim | undefined;

  constructor(
    private route: ActivatedRoute,
    private claimService: ClaimServiceService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.claimService.getClaim(id).subscribe(
      (data) => {
        this.claim = data;
      },
      (error) => {
        console.error('Error fetching claim details:', error);
      }
    );
  }
}
