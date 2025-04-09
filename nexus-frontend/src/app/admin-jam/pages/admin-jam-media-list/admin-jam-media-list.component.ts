import { Component, OnInit } from '@angular/core';
import { EntryMedia } from 'src/app/core/entities/Jam/entry-media';
import { EntryMediaService } from 'src/app/core/services/jam/entry-media.service';

@Component({
  selector: 'app-admin-jam-media-list',
  templateUrl: './admin-jam-media-list.component.html',
  styleUrls: ['./admin-jam-media-list.component.css']
})
export class AdminJamMediaListComponent implements OnInit {
  mediaList: EntryMedia[] = [];

  constructor(private mediaService: EntryMediaService) {}

  ngOnInit(): void {
    this.loadMedia();
  }

  loadMedia(): void {
    this.mediaService.getAllMedia().subscribe({
      next: (data) => (this.mediaList = data)
    });
  }

  deleteMedia(id: number): void {
    if (confirm('Are you sure you want to delete this media item?')) {
      this.mediaService.deleteMedia(id).subscribe(() => {
        this.mediaList = this.mediaList.filter(media => media.id !== id);
      });
    }
  }
}
