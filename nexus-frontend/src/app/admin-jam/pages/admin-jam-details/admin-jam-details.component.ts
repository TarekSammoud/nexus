import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { EntryService } from 'src/app/core/services/jam/entry.service';
import { EntryMediaService } from 'src/app/core/services/jam/entry-media.service';
import { EntryRatingService } from 'src/app/core/services/jam/entry-rating.service';
import { Jam } from 'src/app/core/entities/Jam/jam';
import { Entry } from 'src/app/core/entities/Jam/entry';
import { EntryMedia } from 'src/app/core/entities/Jam/entry-media';
import { EntryRating } from 'src/app/core/entities/Jam/entry-rating';

type JamDetailTab = 'overview' | 'entries' | 'media' | 'ratings';

@Component({
  selector: 'app-admin-jam-details',
  templateUrl: './admin-jam-details.component.html',
  styleUrls: ['./admin-jam-details.component.css']
})
export class AdminJamDetailsComponent implements OnInit {
  jam!: Jam;
  entries: Entry[] = [];
  mediaList: EntryMedia[] = [];
  ratings: EntryRating[] = [];

  tab: JamDetailTab = 'overview';
  tabOptions: JamDetailTab[] = ['overview', 'entries', 'media', 'ratings'];

  constructor(
    private route: ActivatedRoute,
    private jamService: JamService,
    private entryService: EntryService,
    private mediaService: EntryMediaService,
    private ratingService: EntryRatingService
  ) {}

  ngOnInit(): void {
    const jamId = Number(this.route.snapshot.paramMap.get('id'));
    if (!jamId) return;

    this.jamService.getJamById(jamId).subscribe(jam => this.jam = jam);

    this.entryService.getEntriesByJam(jamId).subscribe(entries => {
      this.entries = entries;

      entries.forEach(entry => {
        this.mediaService.getMediaByEntry(entry.id).subscribe((media: EntryMedia[]) => {
          this.mediaList.push(...media);
        });

        this.ratingService.getRatingsByEntry(entry.id).subscribe((ratings: EntryRating[]) => {
          this.ratings.push(...ratings);
        });
      });
    });
  }

  average(entry: Entry, scoreKey: 'graphicsScore' | 'gameplayScore' | 'musicScore'): string {
    if (!entry.ratings || entry.ratings.length === 0) return 'N/A';
    const scores = entry.ratings.map(r => r[scoreKey]);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return avg.toFixed(1);
  }
  overallAverage(entry: Entry): string {
    const allScores = ['graphicsScore', 'gameplayScore', 'musicScore']
      .flatMap(key => entry.ratings?.map(r => r[key as keyof EntryRating]) || []);
      
    if (allScores.length === 0) return 'N/A';
    const total = allScores.reduce((a, b) => a + b, 0);
    return (total / allScores.length).toFixed(1);
  }
  
}
