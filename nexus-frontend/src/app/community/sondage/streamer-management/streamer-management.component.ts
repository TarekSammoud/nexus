import { Component, OnInit } from '@angular/core';
import { Streamer } from 'src/app/core/entities/community/streamer';
import { StreamerService } from 'src/app/core/services/community/streamer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-streamer-management',
  templateUrl: './streamer-management.component.html',
  styleUrls: ['./streamer-management.component.css']
})
export class StreamerManagementComponent implements OnInit {
  streamers: Streamer[] = [];
  streamerForm!: FormGroup;
  editingStreamerId: number | null = null;

  constructor(
    private streamerService: StreamerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadStreamers();
    this.initForm();
  }

  initForm(): void {
    this.streamerForm = this.fb.group({
      name: ['', Validators.required],
      platform: ['', Validators.required],
      streamUrl: ['', [Validators.required, Validators.pattern('https?://.+')]]
    });
  }

  loadStreamers(): void {
    this.streamerService.getAllStreamers().subscribe({
      next: data => this.streamers = data,
      error: err => console.error('Erreur chargement streamers', err)
    });
  }

  onSubmit(): void {
    if (this.streamerForm.invalid) return;
    const streamer = this.streamerForm.value;

    if (this.editingStreamerId) {
      this.streamerService.updateStreamer(this.editingStreamerId, streamer).subscribe({
        next: () => {
          this.loadStreamers();
          this.streamerForm.reset();
          this.editingStreamerId = null;
        },
        error: err => console.error('Erreur maj streamer', err)
      });
    } else {
      this.streamerService.createStreamer(streamer).subscribe({
        next: () => {
          this.loadStreamers();
          this.streamerForm.reset();
        },
        error: err => console.error('Erreur ajout streamer', err)
      });
    }
  }

  onEdit(streamer: Streamer): void {
    this.streamerForm.patchValue(streamer);
    this.editingStreamerId = streamer.id!;
  }

  onDelete(id: number): void {
    if (confirm('❌ Supprimer ce streamer ?')) {
      this.streamerService.deleteStreamer(id).subscribe({
        next: () => this.loadStreamers(),
        error: err => console.error('Erreur suppression streamer', err)
      });
    }
  }

  cancelEdit(): void {
    this.streamerForm.reset();
    this.editingStreamerId = null;
  }
}
