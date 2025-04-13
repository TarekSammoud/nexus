import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { PerformanceReview } from 'src/app/core/entities/support/PerformanceReview.model';
import { PerformanceReviewService } from 'src/app/core/services/support/performance-review.service';
import { SupportAgent } from 'src/app/core/entities/support/SupportAgent.model'; 
import { Departement } from 'src/app/core/entities/support/Departement.enum';

@Component({
  selector: 'app-admin-performance-review',
  templateUrl: './admin-performance-review.component.html',
  styleUrls: ['./admin-performance-review.component.css']
})
export class AdminPerformanceReviewComponent {
  reviewForm: FormGroup;
  reviews$ = this.reviewService.getAllReviews();
  currentReview: PerformanceReview | null = null;
  
  staticAgent: SupportAgent = {
    id: 1,
    name: 'Test Agent',
    email: 'test.agent@example.com',
    departement: Departement.PAYMENTS,
    userId: 0,
    ticketsAssignes: [],
    evaluations: [],
    averageRating: 0
  };

  constructor(
    private fb: FormBuilder,
    private reviewService: PerformanceReviewService,
    private router: Router // Inject the Router
  ) {
    // Initializing form with basic validation
    this.reviewForm = this.fb.group({
      rating: ['', Validators.required],   // Added Validators
      feedback: ['', Validators.required]  // Added Validators
    });
  }

  ngOnInit(): void {
    // Fetch initial data
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviews$ = this.reviewService.getAllReviews(); // No need to reassign
  }

  addReview(): void {
    if (this.reviewForm.valid) {
      const review: PerformanceReview = {
        supportAgentId: 11,
        rating: this.reviewForm.value.rating,
        feedback: this.reviewForm.value.feedback,
        agent: this.staticAgent,
        departement: Departement.PAYMENTS
      };

      this.reviewService.addReview(review).subscribe(
        () => {
          this.loadReviews();
          this.resetForm();
          console.log('Navigating to /support-tickets');
          this.router.navigate(['/support-tickets']);
        },
        (error) => console.error('Error adding review:', error)
      );
    }
  }

 

  updateReview(): void {
    if (!this.currentReview || !this.reviewForm.valid) return;

    const updatedReview: PerformanceReview = {
      ...this.currentReview,
      rating: this.reviewForm.value.rating,
      feedback: this.reviewForm.value.feedback
    };

    this.reviewService.updateReview(updatedReview).subscribe(
      (updatedReview) => {
        console.log('Review updated successfully:', updatedReview);
        this.loadReviews();
        this.resetForm();
      },
      (error) => {
        console.error('Error updating review:', error);
      }
    );
  }

  deleteReview(id: number): void {
    this.reviewService.deleteReview(id).subscribe(
      () => this.loadReviews(),
      (error) => console.error('Error deleting review:', error)
    );
  }

  resetForm(): void {
    this.reviewForm.reset();
    this.currentReview = null;
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      if (this.currentReview) {
        this.updateReview();
      } else {
        this.addReview();
      }
    }
  }
}

