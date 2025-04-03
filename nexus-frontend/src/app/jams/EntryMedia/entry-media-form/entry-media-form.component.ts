import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entry } from 'src/app/core/entities/Jam/entry';
import { EntryMedia, EntryMediaType } from 'src/app/core/entities/Jam/entry-media';
import { EntryMediaService } from 'src/app/core/services/jam/entry-media.service';

@Component({
  selector: 'app-entry-media-form',
  templateUrl: './entry-media-form.component.html',
  styleUrls: ['./entry-media-form.component.css']
})
export class EntryMediaFormComponent {
  @Input() entries: Entry[] = [];
  @Output() mediaCreated = new EventEmitter<void>();

  media: EntryMedia = {
    url: '',
    type: EntryMediaType.SCREENSHOT,
    entry: { id: 0 }
  };

  mediaTypes = Object.values(EntryMediaType);

  constructor(private mediaService: EntryMediaService) {}

  onSubmit() {
    if (!this.media.url || !this.media.entry.id) return;

    this.mediaService.createMedia({
      url: this.media.url,
      type: this.media.type,
      entry: { id: this.media.entry.id }
    }).subscribe({
      next: () => {
        this.mediaCreated.emit();
        this.resetForm();
      },
      error: (err) => console.error('Failed to create media:', err)
    });
  }

  resetForm() {
    this.media = {
      url: '',
      type: EntryMediaType.SCREENSHOT,
      entry: { id: 0 }
    };
  }
}
