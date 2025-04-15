import { Component, OnInit } from '@angular/core';
import { EntryRatingService } from 'src/app/core/services/jam/entry-rating.service';
import { EntryRating } from 'src/app/core/entities/Jam/entry-rating';

@Component({
  selector: 'app-admin-jam-ratings-list',
  templateUrl: './admin-jam-ratings-list.component.html',
  styleUrls: ['./admin-jam-ratings-list.component.css']
})
export class AdminJamRatingsListComponent implements OnInit {
  ratings: EntryRating[] = [];

  constructor(private ratingService: EntryRatingService) {}

  ngOnInit(): void {
    this.loadRatings();
  }

  loadRatings(): void {
    this.ratingService.getAllRatings().subscribe({
      next: data => this.ratings = data
    });
  }

  deleteRating(id: number): void {
    if (!confirm("Are you sure you want to delete this rating?")) return;
    this.ratingService.deleteRating(id).subscribe(() => {
      this.ratings = this.ratings.filter(r => r.id !== id);
    });
  }

  getTotal(rating: EntryRating): number {
    return rating.graphicsScore + rating.gameplayScore + rating.musicScore;
  }

  getStars(score: number): string {
    const safeScore = Math.max(0, Math.min(5, score));
    return '★'.repeat(safeScore) + '☆'.repeat(5 - safeScore);
  }
  
}
