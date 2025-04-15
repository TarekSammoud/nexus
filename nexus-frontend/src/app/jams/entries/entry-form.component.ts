import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { EntryService } from 'src/app/core/services/jam/entry.service';
import { Entry } from 'src/app/core/entities/Jam/entry';
import { TokenService } from '../../core/services/user-management/token.service';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  @Input() jamId!: number;
  @Output() entryCreated = new EventEmitter<Entry>();

  entry: Partial<Entry> = {
    nameEntry: '',
    descriptionEntry: '',

  };


  constructor(private entryService: EntryService, private tokenService: TokenService) { }

  ngOnInit(): void {

    this.entry.jam = { id: this.jamId };
    const userId = TokenService.getUserId();
  }

  onSubmit(): void {
    this.entryService.createEntry(this.entry as Entry).subscribe({
      next: (createdEntry) => {
        this.entryCreated.emit(createdEntry);
        this.resetForm();
      }
    });
  }

  resetForm(): void {
    this.entry.nameEntry = '';
    this.entry.descriptionEntry = '';
  }
}
