import { Component, OnInit } from '@angular/core';
import { CommunityService } from 'src/app/core/services/community/community.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-publication-stats',
  templateUrl: './publication-stats.component.html',
  styleUrls: ['./publication-stats.component.css']
})
export class PublicationStatsComponent implements OnInit {
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

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
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
