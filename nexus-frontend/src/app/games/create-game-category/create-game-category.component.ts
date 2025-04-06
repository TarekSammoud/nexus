import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GameCategoryService } from 'src/app/core/services/gameCategory/game-category.service';

@Component({
  selector: 'app-create-game-category',
  templateUrl: './create-game-category.component.html',
  styleUrls: ['./create-game-category.component.css']
})
export class CreateGameCategoryComponent implements OnInit {
  constructor(private _gameCategoryService: GameCategoryService,private fb: FormBuilder) { }
  gameCategoryForm!: FormGroup;
  
  ngOnInit(): void {
    this.gameCategoryForm = this.fb.group({
      name: [''],
      description: ['']
    });
    
  }

  onSubmit() {
    console.log(this.gameCategoryForm.value);
    this._gameCategoryService.createGameCategory(this.gameCategoryForm.value).subscribe((response) => {
      console.log('Game category created successfully', response);
      this.gameCategoryForm.reset();
    }, (error) => {
      console.error('Error creating game category', error);
    });

}
}
