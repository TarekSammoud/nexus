import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/core/services/community/category.service';
import { Category } from 'src/app/core/entities/community/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  category: Category = new Category();
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.categoryService.getCategoryById(+id).subscribe({
        next: (data) => this.category = data,
        error: (err) => console.error('Erreur de chargement', err)
      });
    }
  }

  saveCategory(): void {
    if (this.isEdit && this.category.id) {
      this.categoryService.updateCategory(this.category.id, this.category).subscribe({
        next: () => this.router.navigate(['/admin/community/categories']),
        error: (err) => console.error('Erreur de mise à jour', err)
      });
    } else {
      this.categoryService.addCategory(this.category).subscribe({
        next: () => this.router.navigate(['/admin/community/categories']),
        error: (err) => console.error('Erreur d\'ajout', err)
      });
    }
  }

}
