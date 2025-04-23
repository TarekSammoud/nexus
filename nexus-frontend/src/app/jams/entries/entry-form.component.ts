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
    zipUrl: '',
    agree: false,
    jam: { id: 0 }
  };

  constructor(private entryService: EntryService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.entry.jam = { id: this.jamId };
    const userId = TokenService.getUserId();
  }

  onSubmit(): void {
    if (!this.entry.agree || !this.entry.zipUrl || !this.isValidZipUrl(this.entry.zipUrl)) {
      alert('🚫 Please enter a valid Google Drive or Dropbox URL and agree to the terms.');
      return;
    }
  
    this.entryService.createEntry(this.entry as Entry).subscribe({
      next: (createdEntry) => {
        this.entryCreated.emit(createdEntry);
        this.resetForm();
        alert('🎉 Entry submitted successfully!');
      }
    });
  }
  
  
  isValidZipUrl(url: string): boolean {
    const googleDrivePattern = /^https?:\/\/(drive\.google\.com\/file\/d\/|drive\.google\.com\/open\?id=|drive\.google\.com\/uc\?id=)[\w-]+/;
    const dropboxPattern = /^https?:\/\/(www\.)?dropbox\.com\/s\/[\w\d]+\/.+/;
    return googleDrivePattern.test(url) || dropboxPattern.test(url);
  }
  
  

  resetForm(): void {
    this.entry = {
      nameEntry: '',
      descriptionEntry: '',
      zipUrl: '',
      agree: false,
      jam: { id: this.jamId }
    };
  }
}
