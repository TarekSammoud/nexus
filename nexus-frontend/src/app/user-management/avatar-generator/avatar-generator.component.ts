
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

  isLoading = false;
  generatedImageUrl: string | null = null;
  countdown: number = 900; // 900 secondes = 15 minutes
  timerInterval: any;

  constructor(private avatarService: AvatarService) { }

  generateAvatar(): void {
    this.isLoading = true;
    this.generatedImageUrl = null;
    this.startCountdown();

    this.avatarService.generateAvatar(this.model).subscribe({
      next: () => {
        this.generatedImageUrl = '/assets/avatar-generated.png?t=' + new Date().getTime();
        this.isLoading = false;
        this.stopCountdown();
      },
      error: (err) => {
        this.generatedImageUrl = '/assets/avatar-generated.png?t=' + new Date().getTime();
        this.isLoading = false;
        this.stopCountdown();
      }
    });
  }

  startCountdown() {
    this.countdown = 900;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  stopCountdown() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  formatCountdown(): string {
    const minutes = Math.floor(this.countdown / 60);
    const seconds = this.countdown % 60;
    return `${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  printAvatar() {
    if (this.generatedImageUrl) {
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Impression Avatar</title></head>
            <body style="text-align: center;">
              <img src="${this.generatedImageUrl}" style="max-width: 100%;">
              <script>window.onload = function() { window.print(); }</script>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  }
}
