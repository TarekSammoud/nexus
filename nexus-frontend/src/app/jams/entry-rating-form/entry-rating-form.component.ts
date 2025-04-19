import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entry } from 'src/app/core/entities/Jam/entry';
import { EntryRating } from 'src/app/core/entities/Jam/entry-rating';
import { EntryRatingService } from 'src/app/core/services/jam/entry-rating.service';

@Component({
  selector: 'app-entry-rating-form',
  templateUrl: './entry-rating-form.component.html',
  styleUrls: ['./entry-rating-form.component.css']
})
export class EntryRatingFormComponent {
  @Input() entry!: Entry;
  @Output() ratingSubmitted = new EventEmitter<void>();

  rating: EntryRating = {
    graphicsScore: 5,
    gameplayScore: 5,
    musicScore: 5,
    entry: { id: 0 },
    user: { id: 1 } // 🔐 Replace with the actual connected user's ID dynamically later
  };

  constructor(private ratingService: EntryRatingService) { }

  submitRating(): void {
    if (!this.entry || !this.entry.id) return;

    this.rating.entry = { id: this.entry.id };

    this.ratingService.createRating(this.rating).subscribe({
      next: () => {
        this.ratingSubmitted.emit();
        this.resetForm();
      },
      error: (err) => console.error('Rating error', err)
    });
  }

  resetForm(): void {
    this.rating = {
      graphicsScore: 5,
      gameplayScore: 5,
      musicScore: 5,
      entry: { id: this.entry.id },
      user: { id: 1 } // reinitialize user id
    };
  }


}
