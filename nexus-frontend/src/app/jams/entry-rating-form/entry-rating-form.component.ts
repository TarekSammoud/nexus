import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Entry } from 'src/app/core/entities/Jam/entry';
import { EntryRating } from 'src/app/core/entities/Jam/entry-rating';
import { EntryRatingService } from 'src/app/core/services/jam/entry-rating.service';
import { TokenService } from 'src/app/core/services/user-management/token.service';

@Component({
  selector: 'app-entry-rating-form',
  templateUrl: './entry-rating-form.component.html',
  styleUrls: ['./entry-rating-form.component.css']
})
export class EntryRatingFormComponent implements OnInit {
  @Input() entry!: Entry;
  @Output() ratingSubmitted = new EventEmitter<void>();

  rating: EntryRating = {
    graphicsScore: 5,
    gameplayScore: 5,
    musicScore: 5,
    entry: { id: 0 },
    user: { id: 0 }
  };

  hasAlreadyRated = false;
  userId: number | null = null;

  constructor(private ratingService: EntryRatingService) {}

  ngOnInit(): void {
    this.userId = TokenService.getUserId();

    if (this.userId && this.entry?.id) {
      this.rating.user.id = this.userId;
      this.rating.entry.id = this.entry.id;

      this.ratingService.hasUserRated(this.entry.id, this.userId).subscribe({
        next: (hasRated) => this.hasAlreadyRated = hasRated,
        error: (err) => console.error('Error checking rating', err)
      });
    }
  }

  submitRating(): void {
    if (!this.entry || !this.entry.id || !this.userId) return;

    this.rating.entry = { id: this.entry.id };
    this.rating.user = { id: this.userId };

    this.ratingService.createRating(this.rating).subscribe({
      next: () => {
        this.hasAlreadyRated = true;
        this.ratingSubmitted.emit();
      },
      error: (err) => console.error('Rating error', err)
    });
  }
}
