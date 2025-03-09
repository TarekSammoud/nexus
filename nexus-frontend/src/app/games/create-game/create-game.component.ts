import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { GamePlatform } from 'src/app/core/entities/game/game-platform.enum';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  gameForm?: FormGroup;
  
  availablePlatforms = Object.values(GamePlatform);
  // Set to track selected platforms
  selectedPlatforms: Set<string> = new Set();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      platforms: this.fb.array([]) // FormArray for platforms
    });
  }

  // Getter for platforms FormArray
  get platforms(): FormArray {
    return this.gameForm?.get('platforms') as FormArray;
  }

  // Check if a platform is selected
  isSelected(platform: string): boolean {
    return this.selectedPlatforms.has(platform);
  }

  // Toggle platform selection
  togglePlatformSelection(platform: string): void {
    if (this.selectedPlatforms.has(platform)) {
      // If platform is already selected, remove it from the Set
      this.selectedPlatforms.delete(platform);
      this.removePlatform(platform);
    } else {
      // If platform is not selected, add it to the Set
      this.selectedPlatforms.add(platform);
      this.addPlatform(platform);
    }
  }

  // Add platform to FormArray
  addPlatform(platform: string): void {
    this.platforms.push(new FormControl(platform));
  }

  // Remove platform from FormArray
  removePlatform(platform: string): void {
    const index = this.platforms.value.indexOf(platform);
    if (index >= 0) {
      this.platforms.removeAt(index);
    }
  }

  // Submit the form
  onSubmit(): void {
    console.log('Form Data:', this.gameForm?.value);
  }
}
