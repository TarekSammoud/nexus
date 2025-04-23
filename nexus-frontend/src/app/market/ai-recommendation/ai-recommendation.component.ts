import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';


interface MarketItem {
  listing_id: number;
  game: string;
  genre: string;
  item_type: string;
  rarity: string;
  tags: string[];
}

@Component({
  selector: 'app-ai-recommendation',
  templateUrl: './ai-recommendation.component.html',
  styleUrls: ['./ai-recommendation.component.css']
})
export class AiRecommendationComponent {
  public recommendedItems: MarketItem[] = [];
  public inputListing: MarketItem = {
    listing_id: 0, // Placeholder
    game: '',
    genre: '',
    item_type: '',
    rarity: '',
    tags: []
  };

  recommendationForm: FormGroup;

  marketListings: MarketItem[] = [
    { listing_id: 100, game: "God of War", genre: "Action", item_type: "Sword", rarity: "Epic", tags: ["defense", "starter", "powerful", "arcane"] },
    { listing_id: 101, game: "God of War", genre: "Action", item_type: "Wand", rarity: "Rare", tags: ["starter", "arcane", "powerful"] },
    { listing_id: 102, game: "Overwatch", genre: "Shooter", item_type: "Sword", rarity: "Legendary", tags: ["ranged", "powerful"] },
    { listing_id: 103, game: "Fortnite", genre: "Battle Royale", item_type: "Bow", rarity: "Rare", tags: ["starter", "arcane", "melee", "light"] },
    // Add all your market listings here...
  ];

  svmPrediction: any;

  // Inject HttpClient and FormBuilder
  constructor(private http: HttpClient, private fb: FormBuilder) {
    // Initialize form
    this.recommendationForm = this.fb.group({
      game: [''],
      genre: [''],
      item_type: [''],
      rarity: [''],
      tags: ['']
    });
  }

  // Fetch recommendations from Flask API
  getRecommendations(): void {
    const apiUrl = 'http://localhost:5000/recommend'; // Adjust with your actual Flask API URL
    const inputData = {
      game: this.inputListing.game,
      genre: this.inputListing.genre,
      item_type: this.inputListing.item_type,
      rarity: this.inputListing.rarity,
      tags: this.inputListing.tags,
      user_id: 2  // You can dynamically get the user ID as required
    };

    this.http.post<any>(apiUrl, inputData).subscribe(
      response => {
        console.log(response);
        const recommendedIds: number[] = response.recommendations; // Explicitly type it as number[]

        // Map the returned listing ids to full MarketItem details
        this.recommendedItems = recommendedIds.map((id: number): MarketItem | undefined => {
          return this.marketListings.find(item => item.listing_id === id);
        }).filter((item: MarketItem | undefined): item is MarketItem => item !== undefined); // Type guard to filter out undefined items

        this.svmPrediction = response.svm_prediction; // Get the SVM prediction
      },
      error => {
        console.error('Error fetching recommendations', error);
      }
    );
  }
}
