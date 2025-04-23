import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../core/services/community/community.service';
import { CommentaireService } from '../../core/services/community/commentaire.service';
import { LikeService } from '../../core/services/community/like.service';
import { Publication } from '../../core/entities/community/publication';
import { Commentaire } from '../../core/entities/community/commentaire';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from 'src/app/core/services/user-management/token.service';  
import {  HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.css'],
})
export class PublicationListComponent implements OnInit {

  publications: Publication[] = [];
  showCommentForm: { [key: number]: boolean } = {};
  newCommentContent: { [key: number]: string } = {};
  commentsByPublication: { [key: number]: Commentaire[] } = {};
  likeCounts: { [key: number]: number } = {};
  userLiked: { [key: number]: boolean } = {};
  searchTerm: string = '';
  userId: number | null = null;

  constructor(
    private communityService: CommunityService,
    private commentaireService: CommentaireService,
    private likeService: LikeService,
    private toastr: ToastrService,
    private tokenService: TokenService  

  ) {}

  ngOnInit(): void {
    // Récupérer le userId depuis le token JWT
    this.userId = TokenService.getUserId();  
    if (!this.userId) {
      this.toastr.error('Utilisateur non authentifié.');
      return;  
    }

    this.loadPublications();
  }

  loadPublications(): void {
    const token = localStorage.getItem('auth_token');  // Récupérer le token
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  // Ajouter le token dans les en-têtes
    }
  
    this.communityService.getPublicationsVisibles(headers).subscribe({
      next: (data: Publication[]) => {
        this.publications = data;
        this.publications.forEach(pub => {
          this.showCommentForm[pub.id] = false;
          this.newCommentContent[pub.id] = '';
          this.loadCommentaires(pub.id);
          this.loadLikes(pub.id);
        });
      },
      error: () => {
        this.toastr.error('Erreur lors du chargement des publications.');
      }
    });
  }
  
  
  // Chargement des commentaires pour chaque publication
  loadCommentaires(pubId: number): void {
    this.commentaireService.getCommentairesByPublicationId(pubId).subscribe({
      next: (comments: Commentaire[]) => {
        this.commentsByPublication[pubId] = comments || [];
      },
      error: () => {
        this.toastr.error('Erreur lors du chargement des commentaires.');
      }
    });
  }

  // Chargement des likes pour chaque publication
  loadLikes(pubId: number): void {
    if (this.userId === null) {
      this.toastr.error('Utilisateur non authentifié.');
      return; // Arrêter si l'utilisateur n'est pas authentifié
    }
  
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
    if (this.userId === null) {
      this.toastr.error('Utilisateur non authentifié.');
      return; 
    }
  
    if (this.userLiked[pubId]) return;
  
    const likeData = {
      user: { id: this.userId }, 
      publication: { id: pubId }
    };
  
    this.likeService.addLike(likeData).subscribe({
      next: () => {
        this.userLiked[pubId] = true;
        this.likeCounts[pubId] = (this.likeCounts[pubId] || 0) + 1;
        this.toastr.success('❤️ Like ajouté avec succès !');
      },
      error: () => {
        this.toastr.error('Erreur lors du like 😢');
      }
    });
  }
  // Toggle visibility du formulaire de commentaire
  toggleCommentForm(pubId: number): void {
    this.showCommentForm[pubId] = !this.showCommentForm[pubId];
  }

  // Ajouter un commentaire
  addComment(pubId: number): void {
    const content = this.newCommentContent[pubId]?.trim();
    if (!content) {
      this.toastr.warning('Le commentaire est vide.');
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
        this.toastr.success('✅ Commentaire ajouté avec succès.');
      },
      error: () => {
        this.toastr.error('Erreur lors de l’ajout du commentaire.');
      }
    });
  }

  // Supprimer une publication
  deletePublication(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
      this.communityService.deletePublication(id).subscribe({
        next: () => {
          this.publications = this.publications.filter(pub => pub.id !== id);
          delete this.commentsByPublication[id];
          this.toastr.success('🗑️ Publication supprimée avec succès.');
        },
        error: () => {
          this.toastr.error('Erreur lors de la suppression de la publication.');
        }
      });
    }
  }

  // Supprimer un commentaire
  deleteComment(pubId: number | undefined, commentId: number): void {
    if (!pubId) return;

    if (confirm('❌ Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this.commentaireService.deleteCommentaire(commentId).subscribe({
        next: () => {
          this.commentsByPublication[pubId] = this.commentsByPublication[pubId]
            .filter(comment => comment.id !== commentId);
          this.toastr.success('✅ Commentaire supprimé avec succès.');
        },
        error: () => {
          this.toastr.error('❌ Une erreur est survenue lors de la suppression.');
        }
      });
    }
  }

  // Vérifier si une publication a des commentaires
  hasComments(pubId: number): boolean {
    return !!this.commentsByPublication[pubId]?.length;
  }

  // Epingler ou désépingler une publication
  togglePin(pub: Publication): void {
    const updated = { ...pub, pinned: !pub.pinned };

    this.communityService.updatePublication(pub.id, updated).subscribe({
      next: () => {
        pub.pinned = !pub.pinned;
        this.publications = this.publications.sort((a, b) => Number(b.pinned) - Number(a.pinned));
        this.toastr.info(pub.pinned ? '📌 Publication épinglée.' : '📍 Publication désépinglée.');
      },
      error: () => {
        this.toastr.error('Erreur lors de l’action épingler/désépingler.');
      }
    });
  }

  // Filtrer les publications en fonction du terme de recherche
  get filteredPublications(): Publication[] {
    if (!this.searchTerm.trim()) return this.publications;

    const term = this.searchTerm.toLowerCase();
    return this.publications.filter(pub =>
      pub.title?.toLowerCase().includes(term) ||
      pub.content?.toLowerCase().includes(term) ||
      pub.category?.name?.toLowerCase().includes(term) ||
      pub.user?.firstName?.toLowerCase().includes(term) ||
      pub.user?.lastName?.toLowerCase().includes(term)
    );
  }
}
