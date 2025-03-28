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
  showEntryForm: boolean = false;

  selectedEntryToEdit: Entry | null = null;
  showEditForm: boolean = false;

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

  setTab(tab: 'overview' | 'submissions' | 'media') {
    this.activeTab = tab;
    this.showEntryForm = tab === 'submissions';
  }
  

  loadJamDetails(): void {
    this.jamService.getJamById(this.jamId).subscribe((data) => {
      this.jam = data;
    });
  }

  loadEntries(): void {
    this.entryService.getEntriesByJam(this.jamId).subscribe(data => {
      this.entries = data;
      console.log("Updated entries:", this.entries);
    });
  }

  onEntryCreated(newEntry: Entry) {
    this.entries.push(newEntry); 
  }
  
  deleteEntry(id: number): void {
    if (confirm("Are you sure you want to delete this entry?")) {
      this.entryService.deleteEntry(id).subscribe({
        next: () => {
          console.log("Entry deleted ✅");
          this.loadEntries();
        },
        error: err => {
          console.error("Failed to delete entry:", err);
        }
      });
    }
  }

  startEdit(entry: Entry) {
    this.selectedEntryToEdit = { ...entry }; // Clone
    this.showEditForm = true;
  }

  cancelEdit() {
    this.selectedEntryToEdit = null;
    this.showEditForm = false;
  }

  updateEntry(): void {
    if (!this.selectedEntryToEdit) return;

    this.selectedEntryToEdit.jam = { id: this.jamId };

    this.entryService.updateEntry(this.selectedEntryToEdit).subscribe({
      next: () => {
        console.log("Entry updated ✅");
        this.selectedEntryToEdit = null;
        this.loadEntries();
      },
      error: (err) => {
        console.error("Failed to update entry:", err);
      }
    });
  }
}
