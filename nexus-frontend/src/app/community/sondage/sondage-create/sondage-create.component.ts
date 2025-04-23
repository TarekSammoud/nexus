import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SondageService } from 'src/app/core/services/community/sondage.service';
import { StreamerService } from 'src/app/core/services/community/streamer.service';
import { Streamer } from 'src/app/core/entities/community/streamer';
import { Sondage } from 'src/app/core/entities/community/sondage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-sondage-create',
  templateUrl: './sondage-create.component.html',
  styleUrls: ['./sondage-create.component.css']
})
export class SondageCreateComponent implements OnInit {

  sondageForm!: FormGroup;
  streamers: Streamer[] = [];

  constructor(
    private fb: FormBuilder,
    private sondageService: SondageService,
    private streamerService: StreamerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sondageForm = this.fb.group({
      question: ['', Validators.required],
      streamerId: ['', Validators.required] // ID du streamer
    });

    this.streamerService.getAllStreamers().subscribe({
      next: (data) => {
        this.streamers = data;
        console.log("✅ Streamers chargés :", data);
      },
      error: (err) => {
        console.error('❌ Erreur chargement streamers :', err);
        this.toastr.error('Erreur lors du chargement des streamers.'); // Utiliser Toastr pour l'erreur
      }
    });
  }

  onSubmit(): void {
    if (this.sondageForm.invalid) return;

    const formValue = this.sondageForm.value;

    const newSondage: Partial<Sondage> = {
      question: formValue.question,
      streamer: {
        id: formValue.streamerId
      } as Streamer
    };

    this.sondageService.createSondage(newSondage).subscribe({
      next: () => {
        this.toastr.success('✅ Sondage créé avec succès !'); 
        this.router.navigate(['/sondages/list']);
      },
      error: (err) => {
        console.error('❌ Erreur création sondage :', err);
        this.toastr.error('Une erreur est survenue lors de la création du sondage.'); // Remplacer alert() par toastr.error
      }
    });
  }
}
