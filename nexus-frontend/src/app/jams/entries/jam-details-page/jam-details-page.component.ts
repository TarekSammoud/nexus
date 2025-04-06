import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { EntryService } from 'src/app/core/services/jam/entry.service';
import { Jam } from 'src/app/core/entities/Jam/jam';
import { Entry } from 'src/app/core/entities/Jam/entry';

@Component({
  selector: 'app-jam-details-page',
  templateUrl: './jam-details-page.component.html',
  styleUrls: ['./jam-details-page.component.css']
})
export class JamDetailsPageComponent implements OnInit {
  jamId!: number;
  jam!: Jam;
  entries: Entry[] = [];

  activeTab: 'overview' | 'submissions' | 'media' = 'overview';

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

  setTab(tab: 'overview' | 'submissions' | 'media'): void {
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

  
}
