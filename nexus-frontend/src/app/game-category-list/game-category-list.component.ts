import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChipListModule } from '@syncfusion/ej2-angular-buttons';
import { GridComponent, GridModule } from '@syncfusion/ej2-angular-grids';
import { GameCategory } from '../core/entities/game/game-category';
import { Router } from '@angular/router';
import { GameCategoryService } from '../core/services/gameCategory/game-category.service';

@Component({
  selector: 'app-game-category-list',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
      CommonModule,  // Required for built-in directives like *ngIf, *ngFor
      GridModule,
      ChipListModule,
  
    ],
  templateUrl: './game-category-list.component.html',
  styleUrls: ['./game-category-list.component.css']
})
export class GameCategoryListComponent implements OnInit {

  totalCategories: number = 0;
  mostPopularCategory: string = '';
  latestCategoryDate: string = '';
  latestEditedCategory: string = '';  
  lastEditedDate: string = '';
   data? : GameCategory[];
        constructor(private _router : Router,private _gameCategoryService: GameCategoryService) {
          this._gameCategoryService.getGameCategories().subscribe(gameCategories => {
            this.data = gameCategories; 
          });
    
        }

          @ViewChild('grid')
          public grid?: GridComponent;

 ngOnInit(): void {
  this.data = [];

 }

   OnSelect(gameCategory : GameCategory){
     this._router.navigate(['/categories', gameCategory.id]);
   }

   deleteGameCategory(data: GameCategory){
    if (confirm('Are you sure you want to delete this game category?')) {
      this._gameCategoryService.deleteGameCategory(data.id!).subscribe((response) => {
        console.log('Game category deleted successfully', response);
        this.data = this.data?.filter((category) => category.id !== data.id);
      }, (error) => {
        console.error('Error deleting game category', error);
      });
    }
   }

   editGameCategory(data: GameCategory){
    this._router.navigate(['/admin/update-game-category', data.id]);
   }

   navigateToCreate()
   {
    this._router.navigate(['/admin/games/categories/add-new-category']);
   }

}