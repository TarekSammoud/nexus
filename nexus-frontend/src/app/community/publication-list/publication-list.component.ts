import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../core/services/community/community.service';
import { Publication } from '../../core/entities/community/publication';
import { User } from 'src/app/core/entities/user/user.model';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {

  publications: Publication[] = [];
  user!: any; 

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.communityService.getPublications().subscribe({
      next: (data) => {
        this.publications = data;
        console.log('Publications récupérées :', data);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des publications :', error);
      }
    });
  }

  deletePublication(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
      this.communityService.deletePublication(id).subscribe({
        next: () => {
          console.log('Publication supprimée avec succès.');
          this.loadPublications();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
        }
      });
    }
  }
}
