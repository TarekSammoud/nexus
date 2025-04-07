import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityService } from '../../core/services/community/community.service';
import { CategoryService } from '../../core/services/community/category.service';
import { Publication } from '../../core/entities/community/publication';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {

  publicationForm!: FormGroup;
  isEditMode: boolean = false;
  publicationId!: number;

  // Liste dynamique des catégories
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private communityService: CommunityService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
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
  }

  // Initialisation du formulaire
  initForm(): void {
    this.publicationForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required] // Catégorie sélectionnée via ComboBox
    });
  }

  // Charger les catégories depuis le backend
  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('✅ Catégories récupérées :', this.categories);
      },
      error: (error) => console.error('❌ Erreur lors du chargement des catégories :', error)
    });
  }

  // Charger les données pour édition
  loadPublication(): void {
    this.communityService.getPublication(this.publicationId).subscribe((publication) => {
      this.publicationForm.patchValue({
        title: publication.title,
        content: publication.content,
        category: publication.category.id
      });
    });
  }

  // Gestion de l'envoi du formulaire
  onSubmit(): void {
    if (this.publicationForm.invalid) {
      alert('❌ Le formulaire est invalide. Vérifiez bien tous les champs.');
      return;
    }

    const publication: Publication = {
      ...this.publicationForm.value,
      category: { id: this.publicationForm.value.category },  // 🔹 Format correct pour la catégorie
     user: { id: 5 },     // 🔹 Utilisateur ajouté automatiquement
      pinned: false,       // 🔹 Non épinglé par défaut
      locked: false        // 🔹 Non verrouillé par défaut
    };

    console.log('🟢 Données envoyées au backend :', publication);

    if (this.isEditMode) {
      this.communityService.updatePublication(this.publicationId, publication).subscribe({
        next: () => {
          alert('✅ Publication mise à jour avec succès');
          this.router.navigate(['/community']);
        },
        error: (error) => this.handleError(error)
      });
    } else {
      this.communityService.createPublication(publication).subscribe({
        next: () => {
          alert('✅ Publication ajoutée avec succès');
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
      alert('⚠️ Données invalides. Vérifiez les champs.');
    } else if (error.status === 500) {
      alert('❌ Erreur serveur. Contactez l\'administrateur.');
    } else {
      alert('❗️ Une erreur inattendue est survenue.');
    }
  }

  // Annuler et revenir à la liste
  cancel(): void {
    this.router.navigate(['/community']);
  }
}
