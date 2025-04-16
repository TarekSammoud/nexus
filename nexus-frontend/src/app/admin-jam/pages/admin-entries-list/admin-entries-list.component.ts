import { Component, OnInit } from '@angular/core';
import { EntryService } from 'src/app/core/services/jam/entry.service';
import { Entry } from 'src/app/core/entities/Jam/entry';

@Component({
  selector: 'app-admin-entries-list',
  templateUrl: './admin-entries-list.component.html',
  styleUrls: ['./admin-entries-list.component.css']
})
export class AdminEntriesListComponent implements OnInit {
  entries: Entry[] = [];
  selectedEntry: Entry | null = null;
  confirmingDelete = false;

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.entryService.getAllEntries().subscribe({
      next: data => this.entries = data
    });
  }

  viewEntry(entry: Entry): void {
    this.selectedEntry = entry;
    this.confirmingDelete = false;
  }

  closeEntryView(): void {
    this.selectedEntry = null;
    this.confirmingDelete = false;
  }

  confirmDelete(): void {
    this.confirmingDelete = true;
  }

  deleteEntry(id: number): void {
    this.entryService.deleteEntry(id).subscribe(() => {
      this.entries = this.entries.filter(e => e.id !== id);
      this.closeEntryView();
    });
  }

  isNew(entry: Entry): boolean {
    const created = new Date(entry.createdAt).getTime();
    const now = Date.now();
    return now - created <= 86400000; 
  }

 
}
