import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from '../../core/services/community/community.service';
import { CategoryService } from '../../core/services/community/category.service';
import { Publication } from '../../core/entities/community/publication';
import { TokenService } from 'src/app/core/services/user-management/token.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {

  publicationForm!: FormGroup;
  isEditMode: boolean = false;
  publicationId!: number;
  selectedImage: File | null = null; // Champ pour l'image
  categories: any[] = []; // Liste dynamique des catégories
  userId: number | null = null;  // Déclarer userId comme null

  constructor(
    private fb: FormBuilder,
    private communityService: CommunityService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();  // 🔹 Chargement dynamique des catégories

    // Vérifie si on est en mode édition
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.publicationId = +params['id'];
        this.loadPublication();
      }
    });

    // Récupérer l'`userId` à partir du token (authentification)
    this.userId = TokenService.getUserId();  // Appel correct de la méthode statique
    if (!this.userId) {
      this.toastr.error('Utilisateur non authentifié.');
      this.router.navigate(['/login']);  // Si pas d'userId, rediriger vers la page de login
    }
  }

  // Initialisation du formulaire
  initForm(): void {
    this.publicationForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required], // Catégorie sélectionnée via ComboBox
      imageUrl: [''] // Champ pour l'URL de l'image
    });
  }

  // Charger les catégories depuis le backend
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        //console.log('✅ Catégories récupérées :', this.categories);
      },
      error: (error) => {
        this.toastr.error('❌ Erreur lors du chargement des catégories : ' + error.message);
      }
        });
  }

  // Charger les données pour édition
  loadPublication(): void {
    this.communityService.getPublication(this.publicationId).subscribe((publication) => {
      this.publicationForm.patchValue({
        title: publication.title,
        content: publication.content,
        category: publication.category.id,
        imageUrl: publication.imageUrl || '' // Ajouter l'URL de l'image si elle existe
      });
    });
  }

  // Gestion de l'envoi du formulaire
  onSubmit(): void {
    if (this.publicationForm.invalid) {
      this.toastr.warning('❌ Le formulaire est invalide. Vérifiez bien tous les champs.');
      return;
    }

    // Si une image est sélectionnée, l'ajouter à la publication
    const publicationData: Publication = {
      ...this.publicationForm.value,
      category: { id: this.publicationForm.value.category }, // 🔹 Format correct pour la catégorie
      user: { id: this.userId },  // 🔹 Utilisateur statique pour le test
      pinned: false,    // 🔹 Non épinglé par défaut
      locked: false,    // 🔹 Non verrouillé par défaut
    };

    // Si une image a été sélectionnée, elle est envoyée dans le formulaire
    if (this.selectedImage) {
      this.uploadImage().then(imageUrl => {
        publicationData.imageUrl = imageUrl;
        this.savePublication(publicationData);
      });
    } else {
      this.savePublication(publicationData);
    }
  }

  // Sauvegarder la publication
  savePublication(publication: Publication): void {
    if (this.isEditMode) {
      this.communityService.updatePublication(this.publicationId, this.userId!, publication).subscribe({
        next: () => {
          this.toastr.success('✅ Publication mise à jour avec succès');
          this.router.navigate(['/community']);
        },
        error: (error) => this.handleError(error)
      });
    } else {
      this.communityService.createPublication(publication).subscribe({
        next: () => {
          this.toastr.success('✅ Publication ajoutée avec succès');
          this.router.navigate(['/community']);
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  // Gestion centralisée des erreurs
  handleError(error: any): void {
    console.error('❌ Erreur détectée :', error);

    if (error.status === 400) {
      this.toastr.warning('⚠️ Données invalides. Vérifiez les champs.');
    } else if (error.status === 500) {
      this.toastr.error('❌ Erreur serveur. Contactez l\'administrateur.');
    } else {
      this.toastr.error('❗️ Une erreur inattendue est survenue.');
    }
  }

  // Annuler et revenir à la liste
  cancel(): void {
    this.router.navigate(['/community']);
  }

  // Gérer la sélection de l'image
  onFileChange(event: any): void {
    this.selectedImage = event.target.files[0]; // Récupère l'image sélectionnée
  }

  // Télécharger l'image vers le serveur
  async uploadImage(): Promise<string> {
    const formData = new FormData();
    formData.append('file', this.selectedImage!, this.selectedImage?.name);
    return new Promise((resolve, reject) => {
      this.communityService.uploadImage(formData).subscribe({
        next: (response: any) => {
          resolve(response.fileUrl);
        },
        error: (error) => {
          reject('Erreur lors du téléchargement de l\'image');
        }
      });
    });
  }
}
