import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameCategoryService } from 'src/app/core/services/gameCategory/game-category.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-game-category',
  templateUrl: './create-game-category.component.html',
  styleUrls: ['./create-game-category.component.css']
})
export class CreateGameCategoryComponent implements OnInit {
  constructor(public modalService: NgbModal,private _router: Router,private _route: ActivatedRoute,private _gameCategoryService: GameCategoryService,private fb: FormBuilder) { }
  gameCategoryForm!: FormGroup;
  gameCategoryId? : number; 
  isEditMode: boolean = false;
  title: string = 'Create Game Category';

  navigateToDashboard() {
    this._router.navigate(['/admin/games/categories']);
  }
  
  ngOnInit(): void {

    this.gameCategoryForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required]
    });
    

    if (this._route.snapshot.paramMap.get('id'))
      this.gameCategoryId = Number(this._route.snapshot.paramMap.get('id'));
      this.isEditMode = !!this.gameCategoryId;  // If ID exists, it's edit mode
  

      //console.log(this.isEditMode);



    if (this.isEditMode) {
      this.title = 'Update Game Category';
      this._gameCategoryService.getGameCategory(this.gameCategoryId!).subscribe((data) => {
        this.gameCategoryForm.patchValue({
          name: data.name,
          description: data.description
        });
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.gameCategoryForm.value.id = this.gameCategoryId;
      //console.log(this.gameCategoryForm.value);
      this._gameCategoryService.updateGameCategory(this.gameCategoryForm.value).subscribe((response) => {
        //console.log('Game category updated successfully', response);
        this.gameCategoryForm.reset();
      }, (error) => {
        console.error('Error updating game category', error);
      });
    } else {
      this._gameCategoryService.createGameCategory(this.gameCategoryForm.value).subscribe((response) => {
        //console.log('Game category created successfully', response);
        this.gameCategoryForm.reset();
      }, (error) => {
        console.error('Error creating game category', error);
      });
      }

}

open(content: any) {
  this.modalService.open(content);
}



closeModal() {
  this.modalService.dismissAll();
}
}
