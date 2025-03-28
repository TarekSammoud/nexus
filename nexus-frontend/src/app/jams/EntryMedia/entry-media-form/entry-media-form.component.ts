import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntryMediaService } from 'src/app/core/services/jam/entry-media.service';
import { Entry } from 'src/app/core/entities/Jam/entry';
import { EntryMedia } from 'src/app/core/entities/Jam/entry-media';
import { EntryMediaType } from 'src/app/core/entities/Jam/entry-media';

@Component({
  selector: 'app-entry-media-form',
  templateUrl: './entry-media-form.component.html',
  styleUrls: ['./entry-media-form.component.css']
})
export class EntryMediaFormComponent {
  @Input() entries: Entry[] = [];
  @Output() mediaCreated = new EventEmitter<void>();

  media: EntryMedia = {
    id: 0,
    url: '',
    type: EntryMediaType.SCREENSHOT,
    createdAt: new Date(),
    updatedAt: new Date(),
    entry: { id: 0 }
  };

  mediaTypes = Object.values(EntryMediaType);

  constructor(private mediaService: EntryMediaService) {}

  onSubmit() {
    const selectedEntry = this.entries.find(e => e.id === +this.media.entry.id);
    if (!selectedEntry) return;
  
    this.media.entry = selectedEntry;
  
    this.mediaService.createMedia(this.media).subscribe({
      next: () => {
        this.mediaCreated.emit();
        this.resetForm();
      },
      error: (err) => {
        console.error('Failed to create media:', err);
      }
    });
  }
  

  resetForm() {
    this.media.url = '';
    this.media.type = EntryMediaType.SCREENSHOT;
    this.media.entry = { id: 0 };
  }
}
