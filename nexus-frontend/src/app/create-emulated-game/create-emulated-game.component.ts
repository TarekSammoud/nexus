import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { GameCategory } from 'src/app/core/entities/game/game-category';
import { GamePlatform } from 'src/app/core/entities/game/game-platform.enum';
import { GameMediaService } from 'src/app/core/services/gameMedia/game-media.service';
import { GameService } from 'src/app/core/services/game/game.service';
import { GameCategoryService } from 'src/app/core/services/gameCategory/game-category.service';
import { GameMedia } from 'src/app/core/entities/game/game-media';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../core/services/user-management/auth.service';
@Component({
  selector: 'app-create-emulated-game',
  templateUrl: './create-emulated-game.component.html',
  styleUrls: ['./create-emulated-game.component.css']
})
export class CreateEmulatedGameComponent implements OnInit {



    gameForm!: FormGroup;
    editorContent: string = '';  
    
    availablePlatforms = ["N64","PSP"];
    selectedPlatforms: Set<string> = new Set();
    selectedUpdatePlatforms: Set<string> = new Set();
    selectedUpdateCategories: Set<number> = new Set();
    availableCategories!: GameCategory[];
    selectedCategories: Set<GameCategory> = new Set();
    numberOfGames!: number; 
  

    




removeImageBanner(index: number) {
  this.filesToUpload.splice(index, 1);
  this.ftpFiles.splice(index, 1);
  this.imagesBanner.splice(index, 1);
  console.log(this.filesToUpload.length); 
}

removeImageScreenshots(index: number) {
  this.filesToUpload.splice(index, 1);
  this.ftpFiles.splice(index, 1);
  this.imagesScreenshots.splice(index, 1);
  console.log(this.filesToUpload.length); 
}

removeImageCover(index: number) {
  this.filesToUpload.splice(index, 1);
  this.ftpFiles.splice(index, 1);
  this.imagesCover.splice(index, 1);
  console.log(this.filesToUpload.length); 
}

  
  
    constructor(private authService: AuthService,public modalService: NgbModal,private _router: Router,private _gameMediaService: GameMediaService,private _route: ActivatedRoute
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
  
  
  
        this._gameService.getLastGameId().subscribe((data) => {
        this.numberOfGames = data;
        });
  
    }
  
    @ViewChild('exampleModal') modal!: ElementRef;
  
  
  
  
    fileName: string = '';
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
  imagesScreenshots: any[] = [];
imagesBanner: any[] = [];
imagesCover: any[] = [];
imagesFile: any[] = [];
userId: number = 0;
  
  
  filesToUpload: FormGroup[] = [];
  ftpFiles: FormData[] = [];
  
  isPlatformSelected(platform: string): boolean {
    return this.selectedPlatforms.has(platform);
  }
  
  
  onSelectFileCover(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
  
      var reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]); 
  
      reader.onload = () => {
        this.images.push(reader.result); 
        this.imagesCover.push(reader.result);
      };
  
      const mediaUrl = file.name;
  
      const fileType = file.type;
      const fileSize = file.size;
  
  
       const newForm = this.fb.group({
        mediaUrl: [mediaUrl, Validators.required],
        fileType: [fileType, Validators.required],
        fileSize: [fileSize, Validators.required],
        gameMediaType: ['COVER', Validators.required],
        gameCover: this.fb.group({
          id: [this.numberOfGames + 1 , Validators.required]
        })
      });
  
  
      const formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
  
      this.filesToUpload.push(newForm);
      this.ftpFiles.push(formData);
      this._gameMediaService.uploadFileToFtp(formData).subscribe((data) => {
        
      })
  
    }
  }
  onSelectFileTar(event: any): void {
    const file = event.target.files?.[0];
    if (!file) return;
  
    // Read for preview (optional)
    const reader = new FileReader();
    reader.onload = () => {
      this.images.push(reader.result);
      this.imagesFile.push(reader.result);
    };
    reader.readAsDataURL(file);
  
    // Create form group
    const newForm = this.fb.group({
      mediaUrl: [file.name, Validators.required],
      fileType: [file.type, Validators.required],
      fileSize: [file.size, Validators.required],
      gameMediaType: ['FILE', Validators.required],
      gameFile: this.fb.group({
        id: [this.numberOfGames + 1, Validators.required]
      })
    });
  
    // Create FormData
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    // Store locally (if needed for batch processing)
    this.filesToUpload.push(newForm);
    this.ftpFiles.push(formData);
  
    // 🔥 Call your service to upload the file
    this._gameMediaService.createZip(formData).subscribe({
      next: (response) => {
        console.log('Upload success:', response);
        // You can store the result or update the form as needed
      },
      error: (err) => {
        console.error('Upload failed:', err);
      }
    });
  }
  onSelectFileBanner(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
  
      var reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]); 
  
      reader.onload = () => {
        this.images.push(reader.result); 
        this.imagesBanner.push(reader.result);
      };
  
      const mediaUrl = file.name;
  
      const fileType = file.type;
      const fileSize = file.size;
  
  
       const newForm = this.fb.group({
        mediaUrl: [mediaUrl, Validators.required],
        fileType: [fileType, Validators.required],
        fileSize: [fileSize, Validators.required],
        gameMediaType: ['BANNER', Validators.required],
        gameBanner: this.fb.group({
          id: [this.numberOfGames + 1 , Validators.required]
        })
      });
  
  
      const formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
  
      this.filesToUpload.push(newForm);
      this.ftpFiles.push(formData);

      this._gameMediaService.uploadFileToFtp(formData).subscribe( {
        next: (response) => {
          console.log('Upload success:', response);
          // You can store the result or update the form as needed
        },
        error: (err) => {
          console.error('Upload failed:', err);
        }
        
      })
  
    }
  }
  

  onSelectFileFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
  
      var reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]); 
  
      reader.onload = () => {
        this.images.push(reader.result); 
        this.imagesFile.push(reader.result); 

      };
  
      const mediaUrl = file.name;
  
      const fileType = file.type;
      const fileSize = file.size;
  
  
       const newForm = this.fb.group({
        mediaUrl: [mediaUrl, Validators.required],
        fileType: [fileType, Validators.required],
        fileSize: [fileSize, Validators.required],
        gameMediaType: ['FILE', Validators.required],
        gameFile: this.fb.group({
          id: [this.numberOfGames + 1 , Validators.required]
        })
      });
  
  
      const formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
  
      this.filesToUpload.push(newForm);
      this.ftpFiles.push(formData);

      if (this.selectedPlatforms.has('PSP')) {
        this._gameMediaService.uploadPSPFileToFtp(formData).subscribe( {
          next: (response) => {
            console.log('Upload success:', response);
            // You can store the result or update the form as needed
          },
          error: (err) => {
            console.error('Upload failed:', err);
          }
          
        })
      }

      if (this.selectedPlatforms.has('N64')) {
        this._gameMediaService.uploadN64FileToFtp(formData).subscribe( {
          next: (response) => {
            console.log('Upload success:', response);
            // You can store the result or update the form as needed
          },
          error: (err) => {
            console.error('Upload failed:', err);
          }
          
        })
      }


  
    }
  }
  onSelectFileScreenShots(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
  
      var reader = new FileReader();
  
      reader.readAsDataURL(event.target.files[0]); 
  
      reader.onload = () => {
        this.images.push(reader.result); 
        this.imagesScreenshots.push(reader.result);
      };
  
      const mediaUrl = file.name;
  
      const fileType = file.type;
      const fileSize = file.size;
  
  
       const newForm = this.fb.group({
        mediaUrl: [mediaUrl, Validators.required],
        fileType: [fileType, Validators.required],
        fileSize: [fileSize, Validators.required],
        gameMediaType: ['SCREENSHOT', Validators.required],
        game: this.fb.group({
          id: [this.numberOfGames + 1 , Validators.required]
        })
      });
  
  
      const formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
  
      this.filesToUpload.push(newForm);
      this.ftpFiles.push(formData);

      this._gameMediaService.uploadFileToFtp(formData).subscribe({
        next: (response) => {
          console.log('Upload success:', response);
          // You can store the result or update the form as needed
        },
        error: (err) => {
          console.error('Upload failed:', err);
        }
        
      })
  
    }
  }
  
  navigateToDashboard() {
    this._router.navigate(['/admin/games/list']);
    this.modalService.dismissAll(); // Close the modal after navigation
  }
  
  
  removeImage(index: number) {
    this.filesToUpload.splice(index, 1);
    this.ftpFiles.splice(index, 1);
    this.images.splice(index, 1);
    console.log(this.filesToUpload.length); 
  }

  removeImageFile(index: number) {
    this.filesToUpload.splice(index, 1);
    this.ftpFiles.splice(index, 1);
    this.images.splice(index, 1);
    this.imagesFile.splice(index, 1);
    console.log(this.filesToUpload.length); 
  }
  
  gameId? : number; 
  isEditMode: boolean = false;
  title: string = 'Create Emulated Game';
  
  
  
  get minRequirements() {
    return this.gameForm.get('minRequirements') as FormGroup;
  }
  
  get recommendedRequirements() {
    return this.gameForm.get('recommendedRequirements') as FormGroup;
  }
  
  
  
  
    ngOnInit(): void {
      this.gameId= 0 ;
      if (this._route.snapshot.paramMap.get('id'))
      this.gameId = Number(this._route.snapshot.paramMap.get('id'));
      this.isEditMode = !!this.gameId;  // If ID exists, it's edit mode
      this.gameForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],  // Name should be at least 3 characters long
        description: ['', [Validators.required, Validators.minLength(10)]],  // Description should be at least 10 characters long
        price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],  // Price should be a positive number, optional decimal with two digits
        platforms: [this.selectedPlatforms, [Validators.required]],  // Platforms should be required
        categories: [this.selectedCategories ,Validators.required],  // Categories should be required
      
        minRequirements: this.fb.group({
          os: ['Windows 10', [Validators.required, Validators.minLength(3)]],  // OS should be at least 3 characters long
          cpu: ['', [Validators.required, Validators.minLength(3)]],  // CPU should be at least 3 characters long
          gpu: ['', [Validators.required, Validators.minLength(3)]],  // GPU should be at least 3 characters long
          ram: ['', [Validators.required]],  // RAM should be a positive number, optional decimal with two digits
          storage: ['50 GB', [Validators.required]]  // Storage should be a number with "GB" suffix
        }),
      
        recommendedRequirements: this.fb.group({
          os: ['Windows 10', [Validators.required, Validators.minLength(3)]],  // OS should be at least 3 characters long
          cpu: ['', [Validators.required, Validators.minLength(3)]],  // CPU should be at least 3 characters long
          gpu: ['', [Validators.required, Validators.minLength(3)]],  // GPU should be at least 3 characters long
          ram: ['', [Validators.required]],  // RAM should be a positive number, optional decimal with two digits
          storage: ['50 GB', [Validators.required]]  // Storage should be a number with "GB" suffix
        })
      });

      this.authService.getLoggedInUserProfile().subscribe({
        next: (user: any) => {
          this.userId = user.id;
          console.log('User profile: id from create', this.userId);
          this.gameForm.patchValue({
            developer: {id: this.userId}
          });
  
        }});
      
      
  
  
      if (this.isEditMode) {
        this.title = 'Update Browser Game';
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
    
      
      if (this.selectedPlatforms.has(platform)) {
        this.selectedPlatforms.delete(platform);
      } else {
        this.selectedPlatforms.add(platform);
      }
      
    }
    
  
    toggleCategorySelection(event: any): void {
      const category = event.source.value; 
    
      
      if (this.selectedCategories.has(category)) {
        this.selectedCategories.delete(category);
      } else {
        this.selectedCategories.add(category);
      }
      
    }
    
  gpuOptions: string[] = [];
  cpuOptions: string[] = [];

  
  
  
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

      this._gameService.addGame(this.gameForm.value).subscribe((data) => {
        console.log('Game added:', data);
        this.uploadFiles(); 
      });
  
  
      if (this.gameForm.invalid) {
        // Loop through the controls and log errors
        for (const controlName in this.gameForm.controls) {
          if (this.gameForm.controls[controlName].errors) {
            console.log(`Errors in ${controlName}:`, this.gameForm.controls[controlName].errors);
          }
        }
      } else {
  
      if (this.isEditMode) {
        this.gameForm.value.id = this.gameId;
        this._gameService.updateGame( this.gameForm.value).subscribe((data) => {
          console.log('Game updated:', data);
        });
      }
      else {

    }
    }
  
  
    }
    uploadFiles() {
      
      for (let i = 0; i < this.ftpFiles.length; i++) {
        this._gameMediaService.addGameMedia(this.filesToUpload[i].value).subscribe({
          next: (response) => {
            console.log('Game Media Entity success:', response);
            // You can store the result or update the form as needed
          },
          error: (err) => {
            console.error('Game Media Entity success:', err);
          }
        }
        );   
       }
    }
  
  
  
    open(content: any) {
      this.modalService.open(content);
    }
  
    navigateToGamePage(n: number){
      this._router.navigate(['/games', n]); 
      this.modalService.dismissAll(); 
    }
  


}
