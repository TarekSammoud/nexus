import { Component, OnInit } from '@angular/core';
import { Streamer } from 'src/app/core/entities/community/streamer';
import { StreamerService } from 'src/app/core/services/community/streamer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 


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
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadStreamers();
    this.initForm();
  }

  initForm(): void {
    this.streamerForm = this.fb.group({
      name: ['', Validators.required],
      platform: ['', Validators.required],
      streamUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      available: [true, Validators.required] // ✅ Utiliser 'available' ici aussi
    });
  }

  loadStreamers(): void {
    this.streamerService.getAllStreamers().subscribe({
      next: data => this.streamers = data,
      error: err => {
        console.error('Erreur chargement streamers', err);
        this.toastr.error('Erreur lors du chargement des streamers.', 'Erreur'); // Ajoutez un message d'erreur
      }
    });
  }

  onSubmit(): void {
    if (this.streamerForm.invalid) return;
    const streamer = this.streamerForm.value;

    if (this.editingStreamerId) {
      this.streamerService.updateStreamer(this.editingStreamerId, streamer).subscribe({
        next: () => {
          this.loadStreamers();
          this.streamerForm.reset({ available: true });
          this.editingStreamerId = null;
          this.toastr.success('Le streamer a été mis à jour avec succès.', 'Succès'); // Notification de succès

        },
        error: err => {
          console.error('Erreur maj streamer', err);
          this.toastr.error('Une erreur est survenue lors de la mise à jour du streamer.', 'Erreur');
        }
            });
    } else {
      this.streamerService.createStreamer(streamer).subscribe({
        next: () => {
          this.loadStreamers();
          this.streamerForm.reset({ available: true });
          this.toastr.success('Le streamer a été ajouté avec succès.', 'Succès');

        },
        error: err => {
          console.error('Erreur ajout streamer', err);
          this.toastr.error('Une erreur est survenue lors de l\'ajout du streamer.', 'Erreur');
        }
            });
    }
  }

  onEdit(streamer: Streamer): void {
    this.streamerForm.patchValue({
      name: streamer.name,
      platform: streamer.platform,
      streamUrl: streamer.streamUrl,
      available: streamer.available
    });
    this.editingStreamerId = streamer.id!;
  }

  onDelete(id: number): void {
    if (confirm('❌ Supprimer ce streamer ?')) {
      this.streamerService.deleteStreamer(id).subscribe({
        next: () => {
          this.loadStreamers();
          this.toastr.success('Le streamer a été supprimé avec succès.', 'Succès'); // Notification de succès
        },
        error: err => {
          console.error('Erreur suppression streamer', err);
          this.toastr.error('Une erreur est survenue lors de la suppression du streamer.', 'Erreur');
        }
      });
    }
  }

  cancelEdit(): void {
    this.streamerForm.reset({ available: true });
    this.editingStreamerId = null;
  }
}
