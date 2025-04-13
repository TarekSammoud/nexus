import { Component, OnInit } from '@angular/core';
import { SondageService } from 'src/app/core/services/community/sondage.service';
import { Sondage } from 'src/app/core/entities/community/sondage';

@Component({
  selector: 'app-sondage-admin',
  templateUrl: './sondage-admin.component.html',
  styleUrls: ['./sondage-admin.component.css']
})
export class SondageAdminComponent implements OnInit {
  sondages: Sondage[] = [];

  constructor(private sondageService: SondageService) {}

  ngOnInit(): void {
    this.loadSondages();
  }

  loadSondages(): void {
    this.sondageService.getAllSondages().subscribe({
      next: data => this.sondages = data,
      error: err => console.error('❌ Erreur chargement sondages', err)
    });
  }

  approuverSondage(id: number): void {
    this.sondageService.approveSondage(id).subscribe({
      next: () => {
        const sondage = this.sondages.find(s => s.id === id);
        if (sondage) sondage.approved = true;
        alert('✅ Sondage approuvé avec succès !');
      },
      error: err => console.error('❌ Erreur approbation', err)
    });
  }

  supprimerSondage(id: number): void {
    if (!confirm('❌ Êtes-vous sûr de vouloir supprimer ce sondage ?')) return;

    this.sondageService.deleteSondage(id).subscribe({
      next: () => {
        this.sondages = this.sondages.filter(s => s.id !== id);
        alert('🗑️ Sondage supprimé avec succès.');
      },
      error: err => console.error('❌ Erreur suppression sondage', err)
    });
  }
}
