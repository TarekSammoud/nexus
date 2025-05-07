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
import { ExcelService } from 'src/app/core/services/excel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/core/services/user-management/auth.service';
import * as XLSX from 'xlsx';



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
  userId? : number ;

  hardwareData = [
    { gpu: 'GeForce GTS 150', cpu: 'i7-7Y75' },
    { gpu: 'Radeon HD 2900 XT 512MB', cpu: 'i5-8250U' },
    { gpu: 'Radeon HD 2900 Pro', cpu: 'i7-8550U' },
    { gpu: 'Radeon HD 2600 XT Diamond Edition', cpu: 'i7-3820' },
    { gpu: 'Radeon HD 2600 XT', cpu: 'i5-7Y57' },
    { gpu: 'Radeon HD 2600 XT 256MB GDDR4', cpu: '3205U' },
    { gpu: 'Radeon HD 4890 Sapphire Vapor-X OC 2GB Edition', cpu: 'N2805' },
    { gpu: 'Radeon HD 2900 GT', cpu: 'J1750' },
    { gpu: 'FirePro D300', cpu: 'G1610' },
    { gpu: 'Radeon 7000 64mb', cpu: '518' },
    { gpu: 'Quadro4 980 XGL', cpu: '2020M' },
    { gpu: 'Tesla M2090', cpu: '773' },
    { gpu: 'Tesla K20', cpu: '3825U' },
    { gpu: 'Tesla K40c', cpu: '4405U' },
    { gpu: 'All-in-Wonder Radeon 7500', cpu: 'N3710' },
    { gpu: 'Radeon R7 250 v2 MSI OC 2GB + Radeon R7 7870K Dual', cpu: 'C1000' },
    { gpu: 'Tesla K10', cpu: 'J2850' },
    { gpu: 'Tesla K20X', cpu: 'J2900' },
    { gpu: 'Iris i3 6167U', cpu: 'J3710' },
    { gpu: 'Radeon 9800 XT', cpu: 'J4205' },
    { gpu: 'Tesla C2070', cpu: 'N3700' },
    { gpu: 'Tesla C2075', cpu: 'N3510' },
    { gpu: 'Quadro4 750 XGL', cpu: 'N3520' },
    { gpu: 'Quadro4 900 XGL', cpu: 'N3530' },
    { gpu: 'Iris i5 6360U', cpu: 'N3540' },
    { gpu: 'Quadro4 780 XGL', cpu: 'N4200' },
    { gpu: 'Tesla C2050', cpu: '4405Y' },
    { gpu: 'Iris i5 6267U', cpu: '4415Y' },
    { gpu: 'Iris i5 6260U', cpu: '4410Y' },
    { gpu: 'Iris i5 4258U', cpu: '4415U' },
    { gpu: 'Quadro4 580 XGL', cpu: '3805U' },
    { gpu: 'Iris i5 5350H', cpu: '3561Y' },
    { gpu: 'Quadro4 550 XGL', cpu: '3560M' },
    { gpu: 'Quadro4 380 XGL', cpu: '3560Y' },
    { gpu: 'Quadro4 700 XGL', cpu: '3558U' },
    { gpu: 'Iris i5 6287U', cpu: '3556U' },
    { gpu: 'Iris i7 6650U', cpu: '3550M' },
    { gpu: 'Quadro4 500 XGL', cpu: '2117U' },
    { gpu: 'Iris i7 6567U', cpu: '2030M' },
    { gpu: 'Iris i7 6560U', cpu: '2127U' },
    { gpu: 'Iris i7 5950HQ', cpu: '2129Y' },
    { gpu: 'Iris i7 5850EQ', cpu: '753' },
    { gpu: 'Titan X Pascal 2016', cpu: '733' },
    { gpu: 'Iris i7 5850HQ', cpu: '723' },
    { gpu: 'Iris i7 5750HQ', cpu: '713' }
  ];

  // Options for the select form controls
  gpuOptions: string[] = this.hardwareData.map(item => item.gpu);
  cpuOptions: string[] = this.hardwareData.map(item => item.cpu);


  constructor(private authService: AuthService,public modalService: NgbModal,private _excelService: ExcelService,private _router: Router,private _gameMediaService: GameMediaService,private _route: ActivatedRoute
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




  excelData: any[] = [];
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


filesToUpload: FormGroup[] = [];
ftpFiles: FormData[] = [];

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

removeImageFile(index: number) {
  this.filesToUpload.splice(index, 1);
  this.ftpFiles.splice(index, 1);
  this.images.splice(index, 1);
  this.imagesFile.splice(index, 1);
  console.log(this.filesToUpload.length); 
}

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




gameId? : number; 
isEditMode: boolean = false;
title: string = 'Create Game';



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
      developer: this.fb.group({
        id: [this.userId , Validators.required]
      }),
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
      this.title = 'Update Game';
      this._gameService.getGame(this.gameId).subscribe((game) => {
        this.gameForm.patchValue({
          name: game.name,
          description: game.description,
          price: game.price,
          developer: {
            id: this.userId
          }
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
  

loadExcelData(fileName: string): void {
 
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
   // this.gameForm.value.developer.id = this.userId;


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
    this._gameService.addGame(this.gameForm.value).subscribe((data) => {
      console.log('Game added:', data);
      this.uploadFiles(); // Call the upload function after adding the game
    });
  }
  }


  }
  uploadFiles() {
    
    for (let i = 0; i < this.images.length; i++) {
      this._gameMediaService.uploadFileToFtp(this.ftpFiles[i]).subscribe((data) => {
      });
      this._gameMediaService.addGameMedia(this.filesToUpload[i].value).subscribe((data) => {
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

