import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EntryService } from 'src/app/core/services/jam/entry.service';
import { Entry } from 'src/app/core/entities/Jam/entry';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  @Input() jamId!: number;
  @Output() entryCreated = new EventEmitter<Entry>();

  entry: any = {
    nameEntry: '',
    descriptionEntry: '',
    user: { id: 1 },
    jam: { id: 0 }
  };
  

  constructor(private entryService: EntryService) {}

  ngOnInit(): void {
    this.entry.jam.id = this.jamId;
  }
  
  onSubmit() {
    console.log("📤 Entry sent to backend:", this.entry);
  
    this.entryService.createEntry(this.entry).subscribe({
      next: (created) => {
        this.entryCreated.emit(created);
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Failed to submit entry:', err);
      }
    });
  }
  
  
  
  resetForm() {
    this.entry.nameEntry = '';
    this.entry.descriptionEntry = '';
  }
}
