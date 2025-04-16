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
      next: (data: Sondage[]) => {
        this.sondages = data.map(sondage => ({
          ...sondage,
          approved: sondage.approved ?? false, // Définir une valeur par défaut
          endDate: sondage.endDate ? new Date(sondage.endDate).toISOString().slice(0, 16) : undefined // Convertir en format datetime-local
        }));
      },
      error: err => console.error('❌ Erreur chargement sondages', err)
    });
  }

  approuverSondage(id: number, endDate: string | null): void {
    if (!endDate) {
      alert("❗ Veuillez saisir une date de fin.");
      return;
    }

    // Vérifier que la date est valide
    const parsedDate = new Date(endDate);
    if (isNaN(parsedDate.getTime())) {
      alert("❗ Date de fin invalide.");
      return;
    }

    this.sondageService.approveSondage(id, endDate).subscribe({
      next: () => {
        const sondage = this.sondages.find(s => s.id === id);
        if (sondage) {
          sondage.approved = true;
          sondage.endDate = endDate; // Mettre à jour localement
        }
        alert("✅ Sondage approuvé !");
      },
      error: err => {
        console.error("❌ Erreur :", err);
        alert("🚫 Erreur lors de l'approbation : " + (err.error?.message || err.message));
      }
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