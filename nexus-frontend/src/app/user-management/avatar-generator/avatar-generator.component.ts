import { Component } from '@angular/core';
import { AvatarService } from '../../core/services/user-management/Avatar.service';

@Component({
  selector: 'app-avatar-generator',
  templateUrl: './avatar-generator.component.html',
  styleUrls: ['./avatar-generator.component.css']
})
export class AvatarGeneratorComponent {

  artStyles = [
    { value: 'digital art', display: 'Digital Art' },
    { value: 'anime', display: 'Anime' },
    { value: 'realistic', display: 'Realistic' },
    { value: 'fantasy', display: 'Fantasy' },
    { value: 'cyberpunk', display: 'Cyberpunk' }
  ];

  facialFeatures = [
    { value: 'symmetrical face', display: 'Symétrique' },
    { value: 'high cheekbones', display: 'Pommettes hautes' },
    { value: 'freckles', display: 'Taches de rousseur' }
  ];

  model = {
    description: '',
    artStyle: this.artStyles[0].value,
    facialFeatures: [],
    negativePrompt: 'ugly, deformed, blurry, extra limbs'
  };

  imageData: string | null = null;
  isLoading = false;

  constructor(private avatarService: AvatarService) { }

  avatarData: any = {
    description: '',
    artStyle: 'digital art', // Valeur par défaut
    facialFeatures: [],
    negativePrompt: 'ugly, deformed, blurry, extra limbs'
  };
  generatedImageUrl: string | null = null;

  generateAvatar(): void {
    this.isLoading = true;
    this.generatedImageUrl = null;

    this.avatarService.generateAvatar(this.model).subscribe({
      next: () => {
        // L'image est maintenant dans les assets, on la charge directement
        this.generatedImageUrl = '/assets/avatar-generated.png?t=' + new Date().getTime(); // Cache-busting
        this.isLoading = false;
      },
      error: (err) => {
        this.generatedImageUrl = '/assets/avatar-generated.png?t=' + new Date().getTime();
        //console.error("Erreur lors de la génération :", err);
        this.isLoading = false;
      }
    });
  }






}
