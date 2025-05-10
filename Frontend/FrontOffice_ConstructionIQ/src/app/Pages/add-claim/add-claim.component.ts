import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ClaimServiceService } from "../../services/Claim/claim-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.css']
})
export class AddClaimComponent implements OnInit {
  claimForm: FormGroup;
  isEditMode = false;
  claimId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private claimService: ClaimServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.claimForm = this.fb.group({
      sender: ['', Validators.required],
      receiver: ['', Validators.required],
      numberOfCharacters: [0, [Validators.required, Validators.min(0)]],
      containsUrgent: [false],
      containsImportant: [false],
      urgencyClassification: ['', Validators.required],
      sendDate: ['', Validators.required],
      sendTime: ['', Validators.required],
      claimType: ['', Validators.required],
      initialPriority: ['', Validators.required],
      numberOfAttachments: [0, [Validators.required, Validators.min(0)]],
      messageLanguage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.claimId = +params['id'];
        this.claimService.getClaim(this.claimId).subscribe(
          (claim) => {
            // Convert ISO date to local date format for the form
            const date = new Date(claim.sendDate);
            this.claimForm.patchValue({
              ...claim,
              sendDate: date.toISOString().split('T')[0],
              sendTime: date.toTimeString().substring(0, 5)
            });
          },
          (error) => {
            console.error('Error fetching claim:', error);
            this.errorMessage = 'Failed to load claim data';
          }
        );
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.claimForm.valid) {
      const formData = this.claimForm.value;
      console.log('Raw Form Data:', JSON.stringify(formData, null, 2));

      try {
        const claimData = this.prepareClaimData(formData);
        console.log('Processed Claim Data:', JSON.stringify(claimData, null, 2));

        const observable = this.isEditMode && this.claimId
          ? this.claimService.updateClaim(this.claimId, claimData)
          : this.claimService.createClaim(claimData);

        observable.subscribe({
          next: () => this.router.navigate(['/claims']),
          error: (error) => this.handleError(error)
        });
      } catch (e) {
        console.error('Data preparation error:', e);
        this.errorMessage = 'Failed to prepare claim data';
      }
    }
  }

  private prepareClaimData(formData: any): any {
    // Combine date and time
    const sendDateTime = new Date(`${formData.sendDate}T${formData.sendTime}`);
    if (isNaN(sendDateTime.getTime())) {
      throw new Error('Invalid date/time combination');
    }

    return {
      ...formData,
      sendDate: sendDateTime.toISOString(), // or other format
      sendTime: undefined, // Remove if not needed by backend
      numberOfCharacters: this.toNumber(formData.numberOfCharacters),
      numberOfAttachments: this.toNumber(formData.numberOfAttachments),
      // Add any other transformations here
    };
  }

  private toNumber(value: any): number {
    const num = Number(value);
    if (isNaN(num)) {
      console.warn('Invalid number conversion for value:', value);
      return 0; // or throw error
    }
    return num;
  }

  private handleError(error: HttpErrorResponse): void {
    console.error('API Error:', error);

    if (error.status === 400) {
      if (error.error) {
        console.error('Validation Errors:', error.error);

        // Display server validation messages
        if (error.error.errors) {
          this.errorMessage = Object.values(error.error.errors).join('\n');
        } else {
          this.errorMessage = error.error.message || 'Invalid data submitted';
        }
      } else {
        this.errorMessage = 'Bad request - please check your inputs';
      }
    } else {
      this.errorMessage = 'An unexpected error occurred';
    }
  }
}
