import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/services/community/category.service';
import { CommunityService } from 'src/app/core/services/community/community.service';
import { Category } from 'src/app/core/entities/community/category';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  // Statistiques pie chart
  categoryLabels: string[] = [];
  categoryCounts: number[] = [];
  pieChartData: any;
  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: '📊 Répartition des Publications par Catégorie',
        color: '#ea7a9a',
        font: {
          size: 20,
          weight: 'bold'
        }
      }
    }
  };

  constructor(
    private categoryService: CategoryService,
    private communityService: CommunityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadChartData();
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

  loadChartData(): void {
    this.communityService.getPublicationStatsByCategory().subscribe(stats => {
      this.categoryLabels = Object.keys(stats);
      this.categoryCounts = Object.values(stats);

      this.pieChartData = {
        labels: this.categoryLabels,
        datasets: [
          {
            data: this.categoryCounts,
            backgroundColor: [
              '#ea7a9a', '#7f5af0', '#3ddc97',
              '#ffb400', '#00bcd4', '#ff6f61'
            ],
            borderColor: '#1f1f1f',
            borderWidth: 2
          }
        ]
      };
    });
  }
}
