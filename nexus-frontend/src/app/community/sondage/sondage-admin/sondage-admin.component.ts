import { Component, OnInit } from '@angular/core';
import { SondageService } from 'src/app/core/services/community/sondage.service';
import { Sondage } from 'src/app/core/entities/community/sondage';
import { ToastrService } from 'ngx-toastr'; 


@Component({
  selector: 'app-sondage-admin',
  templateUrl: './sondage-admin.component.html',
  styleUrls: ['./sondage-admin.component.css']
})
export class SondageAdminComponent implements OnInit {
  sondages: Sondage[] = [];

  constructor(private sondageService: SondageService,  private toastr: ToastrService) {}

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
      error: err => {
        console.error('❌ Erreur chargement sondages', err);
        this.toastr.error('Erreur lors du chargement des sondages.'); // Remplacer alert() par toastr.error
      }
    });
  }

  approuverSondage(id: number, endDate: string | null): void {
    if (!endDate) {
      this.toastr.warning("❗ Veuillez saisir une date de fin."); 
      return;
    }

    const parsedDate = new Date(endDate);
    if (isNaN(parsedDate.getTime())) {
      this.toastr.warning("❗ Date de fin invalide.");
      return;
    }

    this.sondageService.approveSondage(id, endDate).subscribe({
      next: () => {
        const sondage = this.sondages.find(s => s.id === id);
        if (sondage) {
          sondage.approved = true;
          sondage.endDate = endDate; // Mettre à jour localement
        }
        this.toastr.success("✅ Sondage approuvé !");
      },
      error: err => {
        console.error("❌ Erreur :", err);
        this.toastr.error("🚫 Erreur lors de l'approbation : " + (err.error?.message || err.message)); 
      }
    });
  }

  supprimerSondage(id: number): void {
    if (!confirm('❌ Êtes-vous sûr de vouloir supprimer ce sondage ?')) return;

    this.sondageService.deleteSondage(id).subscribe({
      next: () => {
        this.sondages = this.sondages.filter(s => s.id !== id);
        this.toastr.success('🗑️ Sondage supprimé avec succès.'); 
      },
      error: err => {
        console.error('❌ Erreur suppression sondage', err);
        this.toastr.error('🚫 Erreur lors de la suppression du sondage.'); // Remplacer alert() par toastr.error
      }
        });
  }
}