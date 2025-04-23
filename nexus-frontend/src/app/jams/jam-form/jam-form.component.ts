import { Component, EventEmitter, Output } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { TokenService } from 'src/app/core/services/user-management/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-jam-form',
  templateUrl: './jam-form.component.html',
  styleUrls: ['./jam-form.component.css']
})
export class JamFormComponent {
  @Output() jamCreated = new EventEmitter<any>();
  imagePreview: string = '';
  isLoadingImage: boolean = false;

  jam = {
    imageUrl: '',
    name: '',
    description: '',
    devStartDate: '',
    devEndDate: '',
    voteStartDate: '',
    voteEndDate: '',
    reward: ''
  };

  constructor(private jamService: JamService, private http: HttpClient) {}

  createJam(): void {
    const formattedJam = {
      ...this.jam,
      devStartDate: this.formatDate(this.jam.devStartDate),
      devEndDate: this.formatDate(this.jam.devEndDate),
      voteStartDate: this.formatDate(this.jam.voteStartDate),
      voteEndDate: this.formatDate(this.jam.voteEndDate),
    };
  
    this.jamService.addJam(formattedJam).subscribe({
      next: (createdJam) => {
        this.jamCreated.emit(createdJam);
        this.resetForm();
      }
    });
  }
  
  private formatDate(date: any): string {
    if (!(date instanceof Date)) return date;
  
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  
  fetchUnsplashImage(): void {
    if (!this.jam.name) return;
  
    const keyword = this.jam.name.trim().split(' ')[0].toLowerCase();
    const cleanKeyword = keyword.substring(0, 20);
    const clientId = ''; 
    this.isLoadingImage = true;
  
    this.http.get(`https://api.unsplash.com/search/photos?query=${cleanKeyword}&per_page=1&client_id=${clientId}`)
      .subscribe({
        next: (res: any) => {
          this.isLoadingImage = false;
          if (res.results && res.results.length > 0) {
            this.imagePreview = res.results[0]?.urls?.small || 'assets/img/default.jpg';
            this.jam.imageUrl = this.imagePreview!;
          } else {
            this.imagePreview = 'assets/img/default.jpg';
            this.jam.imageUrl = this.imagePreview;
          }
        },
        error: (err) => {
          console.error('Unsplash API Error:', err);
          this.isLoadingImage = false;
          this.imagePreview = 'assets/img/default.jpg';
          this.jam.imageUrl = this.imagePreview;
        }
      });
  }
  
  private resetForm(): void {
    this.jam = {
      imageUrl: '',
      name: '',
      description: '',
      devStartDate: '',
      devEndDate: '',
      voteStartDate: '',
      voteEndDate: '',
      reward: ''
    };
  }
}
