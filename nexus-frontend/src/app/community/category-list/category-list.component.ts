import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/community/category.service';
import { Category } from 'src/app/core/entities/community/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur de chargement des catégories', err);
      }
    });
  }

  editCategory(id: number): void {
    this.router.navigate(['/admin/community/categories/edit', id]);
  }

  deleteCategory(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.loadCategories()
      });
    }
  }

}
