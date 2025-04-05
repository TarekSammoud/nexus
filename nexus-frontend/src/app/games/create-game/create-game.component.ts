import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { GameCategory } from 'src/app/core/entities/game/game-category';
import { GamePlatform } from 'src/app/core/entities/game/game-platform.enum';
import { GameMediaService } from 'src/app/core/services/gameMedia/game-media.service';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameCategoryService } from 'src/app/core/services/gameCategory/game-category.service';
import { GameMedia } from 'src/app/core/entities/game/game-media';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  
  gameForm!: FormGroup;
  editorContent: string = '';  
  
  availablePlatforms = Object.values(GamePlatform);
  selectedPlatforms: Set<string> = new Set();
  selectedUpdatePlatforms: Set<string> = new Set();
  selectedUpdateCategories: Set<number> = new Set();
  availableCategories!: GameCategory[];
  selectedCategories: Set<GameCategory> = new Set();
  numberOfGames!: number; 


  constructor(private _gameMediaService: GameMediaService,private _route: ActivatedRoute
    ,private _gameService : GameService,private fb: FormBuilder,private _gameCategoryService: GameCategoryService) {
    this._gameCategoryService.getGameCategories().subscribe((data) => {
      this.availableCategories = data.map((category) => {
        return {
          id: category.id,
          name: category.name,
          description: category.description
        };
      });
    });

    console.log(this.availableCategories);
      this._gameService.getNumberOfGames().subscribe((data) => {
      this.numberOfGames = data;
      console.log(this.numberOfGames);
      });

  }

  step = 1;
  progress = 15;

nextStep() {
  this.step++;
  this.progress += 15;
}

prevStep() {
  this.step--;
  this.progress -= 15;

}

url = '';
images: any[] = [];


filesToUpload: FormGroup[] = [];
ftpFiles: FormData[] = [];

isPlatformSelected(platform: string): boolean {
  return this.selectedPlatforms.has(platform);
}

onSelectFile(event: any): void {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];

    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); 

    reader.onload = () => {
      this.images.push(reader.result); 
    };

    const mediaUrl = file.name;

    const fileType = file.type;
    const fileSize = file.size;

     var gameId = this.numberOfGames +1 ; 

     const newForm = this.fb.group({
      mediaUrl: [mediaUrl, Validators.required],
      fileType: [fileType, Validators.required],
      fileSize: [fileSize, Validators.required],
      gameMediaType: ['SCREENSHOT', Validators.required],
      game: this.fb.group({
        id: [this.numberOfGames + 1, Validators.required]
      })
    });

    const formData = new FormData();
    formData.append('file', event.target.files[0], event.target.files[0].name);

    this.filesToUpload.push(newForm);
    this.ftpFiles.push(formData);

  }
}




removeImage(index: number) {
  this.filesToUpload.splice(index, 1);
  this.ftpFiles.splice(index, 1);
  this.images.splice(index, 1);
  console.log(this.filesToUpload.length); 
}

gameId? : number; 
isEditMode: boolean = false;
title: string = 'Create Game';


  ngOnInit(): void {

    this.gameId= 0 ;
    if (this._route.snapshot.paramMap.get('id'))
    this.gameId = Number(this._route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.gameId;  // If ID exists, it's edit mode

    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      platforms: [this.selectedPlatforms],
      categories: [this.selectedCategories] 
    });

    if (this.isEditMode) {
      this.title = 'Update Game';
      this._gameService.getGame(this.gameId).subscribe((game) => {
        this.gameForm.patchValue({
          name: game.name,
          description: game.description,
          price: game.price,
        });
        this.selectedUpdatePlatforms = new Set(game.platforms);
        for (let i = 0; i < game.categories.length; i++) {
          this.selectedUpdateCategories.add(game.categories[i].id);
        }
        console.log("update cat : ", this.selectedUpdateCategories);
        console.log("update plat : ", this.selectedUpdatePlatforms);
        console.log('Game:', game);
      });
    }
  }

  get platforms(): FormArray {
    return this.gameForm?.get('platforms') as FormArray;
  }

  isSelected(platform: string): boolean {
    return this.selectedPlatforms.has(platform);
  }

  togglePlatformSelection(event: any): void {
    const platform = event.source.value; 
  
    console.log('Platform:', platform);
    
    if (this.selectedPlatforms.has(platform)) {
      this.selectedPlatforms.delete(platform);
      console.log('Removed Platform:', platform);
    } else {
      this.selectedPlatforms.add(platform);
      console.log('Added Platform:', platform);
    }
    
    console.log('Selected Platforms:', this.selectedPlatforms);
  }
  

  toggleCategorySelection(event: any): void {
    const category = event.source.value; 
  
    console.log('Category:', category);
    
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
      console.log('Removed category:', category);
    } else {
      this.selectedCategories.add(category);
      console.log('Added category:', category);
    }
    
    console.log('Selected categories:', this.selectedCategories);
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
    this.gameForm.value.categories = Array.from(this.selectedCategories);
    this.gameForm.value.platforms = Array.from(this.selectedPlatforms);
    console.log('Form Data:', JSON.stringify(this.gameForm?.value));
    if (this.isEditMode) {
      this.gameForm.value.id = this.gameId;
      this._gameService.updateGame( this.gameForm.value).subscribe((data) => {
        console.log('Game updated:', data);
      });
    }
    else {
    this._gameService.addGame(this.gameForm.value).subscribe((data) => {
      console.log('Game added:', data);
    });
  }
    for (let i = 0; i < this.images.length; i++) {
      console.log(this.filesToUpload[i].value); 
      this._gameMediaService.uploadFileToFtp(this.ftpFiles[i]).subscribe((data) => {
        console.log('File uploaded:', data);
      });
      this._gameMediaService.addGameMedia(this.filesToUpload[i].value).subscribe((data) => {
        console.log('Game Media added:', data);
      }
      );   
     }

  }
}
