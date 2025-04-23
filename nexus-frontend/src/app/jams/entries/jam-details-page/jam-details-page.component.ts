import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { EntryService } from 'src/app/core/services/jam/entry.service';
import { Jam } from 'src/app/core/entities/Jam/jam';
import { Entry } from 'src/app/core/entities/Jam/entry';
import { EntryRating } from 'src/app/core/entities/Jam/entry-rating';

@Component({
  selector: 'app-jam-details-page',
  templateUrl: './jam-details-page.component.html',
  styleUrls: ['./jam-details-page.component.css']
})
export class JamDetailsPageComponent implements OnInit {
  jamId!: number;
  jam!: Jam;
  entries: Entry[] = [];

  activeTab: 'overview' | 'submissions' | 'media' | 'leaderboard' = 'overview';

  selectedEntryToEdit: Entry | null = null;
  selectedEntryToRate: Entry | null = null;
  selectedEntryForModal: Entry | null = null;

  constructor(
    private route: ActivatedRoute,
    private jamService: JamService,
    private entryService: EntryService
  ) {}

  ngOnInit(): void {
    this.jamId = +this.route.snapshot.paramMap.get('id')!;
    this.loadJamDetails();
    this.loadEntries();
  }

  setTab(tab: 'overview' | 'submissions' | 'media' | 'leaderboard'): void {
    this.activeTab = tab;
  }
  

  loadJamDetails(): void {
    this.jamService.getJamById(this.jamId).subscribe(jam => {
      this.jam = jam;
    });
  }

  loadEntries(): void {
    this.entryService.getEntriesByJam(this.jamId).subscribe(entries => {
      this.entries = entries;
    });
  }

  onEntryCreated(newEntry: Entry): void {
    this.entries.push(newEntry);
  }

  deleteEntry(id: number): void {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    this.entryService.deleteEntry(id).subscribe({
      next: () => this.loadEntries()
    });
  }

  startEdit(entry: Entry): void {
    this.selectedEntryToEdit = { ...entry }; 
  }

  cancelEdit(): void {
    this.selectedEntryToEdit = null;
  }

  updateEntry(): void {
    if (!this.selectedEntryToEdit) return;

    this.selectedEntryToEdit.jam = { id: this.jamId };
    this.entryService.updateEntry(this.selectedEntryToEdit).subscribe({
      next: () => {
        this.selectedEntryToEdit = null;
        this.loadEntries();
      }
    });
  }

  openMediaModal(entry: Entry): void {
    this.selectedEntryForModal = entry;
  }

  closeMediaModal(): void {
    this.selectedEntryForModal = null;
  }

  openRatingModal(entry: Entry): void {
    this.selectedEntryToRate = entry;
  }

  closeRatingModal(): void {
    this.selectedEntryToRate = null;
  }


  isSubmissionOpen(): boolean {
    const now = new Date();
    return this.jam && new Date(this.jam.devStartDate) <= now && now <= new Date(this.jam.devEndDate);
  }
  isVotingOpen(): boolean {
  const now = new Date();
  return this.jam && new Date(this.jam.voteStartDate) <= now && now <= new Date(this.jam.voteEndDate);
}


getTotalScore(entry: Entry): number {
  if (!entry.ratings || entry.ratings.length === 0) return 0;
  const sum = entry.ratings.reduce((acc: number, r: EntryRating) =>
    acc + r.graphicsScore + r.gameplayScore + r.musicScore, 0);
  return Math.round(sum / entry.ratings.length);
}

getAverageScores(entry: Entry): { graphics: number, gameplay: number, music: number } {
  if (!entry.ratings || entry.ratings.length === 0) return { graphics: 0, gameplay: 0, music: 0 };

  const count = entry.ratings.length;
  const graphics = entry.ratings.reduce((acc, r) => acc + r.graphicsScore, 0) / count;
  const gameplay = entry.ratings.reduce((acc, r) => acc + r.gameplayScore, 0) / count;
  const music = entry.ratings.reduce((acc, r) => acc + r.musicScore, 0) / count;

  return {
    graphics: Math.round(graphics),
    gameplay: Math.round(gameplay),
    music: Math.round(music)
  };
}

getStars(score: number): string {
  const rounded = Math.round(score / 2);
  return '⭐'.repeat(rounded).padEnd(5, '☆');
}

getBadges(entry: Entry): string[] {
  const { graphics, gameplay, music } = this.getAverageScores(entry);
  const badges: string[] = [];

  if (graphics >= 8) badges.push('🎨 Visual Delight');
  if (gameplay >= 8) badges.push('🕹️ Clever Mechanics');
  if (music >= 8) badges.push('🎵 Audio Excellence');
  if ((graphics + gameplay + music) / 3 >= 9) badges.push('🌟 Masterpiece');

  return badges;
}

getRankEmoji(index: number): string {
  return ['🥇', '🥈', '🥉'][index] || `#${index + 1}`;
}

getSortedEntries(): Entry[] {
  return [...this.entries]
    .filter(e => e.ratings && e.ratings.length)
    .sort((a, b) => this.getTotalScore(b) - this.getTotalScore(a))
    .slice(0, 10);
}
  
}
