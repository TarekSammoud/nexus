import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../core/services/community/community.service';
import { CommentaireService } from '../../core/services/community/commentaire.service';
import { LikeService } from '../../core/services/community/like.service';
import { Publication } from '../../core/entities/community/publication';
import { Commentaire } from '../../core/entities/community/commentaire';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css']
})
export class PublicationListComponent implements OnInit {

  publications: Publication[] = [];
  showCommentForm: { [key: number]: boolean } = {};
  newCommentContent: { [key: number]: string } = {};
  commentsByPublication: { [key: number]: Commentaire[] } = {};
  likeCounts: { [key: number]: number } = {};
  userLiked: { [key: number]: boolean } = {};
  userId: number = 1; // À remplacer plus tard par l'utilisateur connecté

  constructor(
    private communityService: CommunityService,
    private commentaireService: CommentaireService,
    private likeService: LikeService
  ) {}

  ngOnInit(): void {
    this.loadPublications();
  }

  loadPublications(): void {
    this.communityService.getPublications().subscribe({
      next: (data: Publication[]) => {
        this.publications = data;
        this.publications.forEach(pub => {
          this.showCommentForm[pub.id] = false;
          this.newCommentContent[pub.id] = '';
          this.loadCommentaires(pub.id);
          this.loadLikes(pub.id);
        });
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des publications :', error);
      }
    });
  }

  loadCommentaires(pubId: number): void {
    this.commentaireService.getCommentairesByPublicationId(pubId).subscribe({
      next: (comments: Commentaire[]) => {
        this.commentsByPublication[pubId] = comments || [];
      },
      error: (err: any) => {
        console.error(`❌ Erreur chargement commentaires pour la publication ${pubId} :`, err);
      }
    });
  }

  loadLikes(pubId: number): void {
    this.likeService.countLikes(pubId).subscribe({
      next: (count) => this.likeCounts[pubId] = count,
      error: () => this.likeCounts[pubId] = 0
    });

    this.likeService.checkIfUserLiked(this.userId, pubId).subscribe({
      next: (liked) => this.userLiked[pubId] = liked,
      error: () => this.userLiked[pubId] = false
    });
  }

  toggleLike(pubId: number): void {
    if (this.userLiked[pubId]) return;

    const likeData = {
      user: { id: this.userId },
      publication: { id: pubId }
    };

    this.likeService.addLike(likeData).subscribe({
      next: () => {
        this.userLiked[pubId] = true;
        this.likeCounts[pubId] = (this.likeCounts[pubId] || 0) + 1;
      },
      error: (err) => console.error('Erreur ajout like :', err)
    });
  }

  toggleCommentForm(pubId: number): void {
    this.showCommentForm[pubId] = !this.showCommentForm[pubId];
  }

  addComment(pubId: number): void {
    const content = this.newCommentContent[pubId]?.trim();
    if (!content) {
      alert('⚠️ Le commentaire est vide.');
      return;
    }

    const commentaire: Partial<Commentaire> = {
      content,
      publication: { id: pubId } as any,
      user: { id: this.userId } as any
    };

    this.commentaireService.createCommentaire(commentaire as Commentaire).subscribe({
      next: (createdComment: Commentaire) => {
        this.commentsByPublication[pubId] = [
          ...(this.commentsByPublication[pubId] || []),
          createdComment
        ];
        this.newCommentContent[pubId] = '';
        this.showCommentForm[pubId] = false;
        alert('✅ Commentaire ajouté avec succès.');
      },
      error: (err: any) => {
        console.error('❌ Erreur backend :', err);
        alert('Erreur lors de l’ajout du commentaire.');
      }
    });
  }

  deletePublication(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
      this.communityService.deletePublication(id).subscribe({
        next: () => {
          this.publications = this.publications.filter(pub => pub.id !== id);
          delete this.commentsByPublication[id];
        },
        error: (error: any) => {
          console.error('Erreur lors de la suppression :', error);
        }
      });
    }
  }

  deleteComment(pubId: number | undefined, commentId: number): void {
    if (!pubId) return;

    if (confirm('❌ Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this.commentaireService.deleteCommentaire(commentId).subscribe({
        next: () => {
          this.commentsByPublication[pubId] = this.commentsByPublication[pubId]
            .filter(comment => comment.id !== commentId);
          alert('✅ Commentaire supprimé avec succès.');
        },
        error: (err) => {
          console.error('Erreur suppression commentaire :', err);
          alert('Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }

  hasComments(pubId: number): boolean {
    return !!this.commentsByPublication[pubId]?.length;
  }
}
