import { Component, OnInit } from '@angular/core';
import { SondageService } from 'src/app/core/services/community/sondage.service';
import { Streamer } from 'src/app/core/entities/community/streamer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-top-streamer',
  templateUrl: './top-streamer.component.html',
  styleUrls: ['./top-streamer.component.css'],
})
export class TopStreamerComponent implements OnInit {
  topStreamers: Streamer[] = [];

  constructor(
    private sondageService: SondageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTopStreamers();
  }

  // Fetch the top 3 streamers from the backend
  getTopStreamers(): void {
    this.sondageService.getTopStreamers().subscribe({
      next: (streamers) => {
        this.topStreamers = streamers;
      },
      error: () => {
        this.toastr.error('Error fetching top streamers');
      },
    });
  }

  // Return the appropriate trophy image based on the rank
  getTrophyImage(index: number): string {
    switch (index) {
      case 0:
        return 'assets/images/TG.png';  
      case 1:
        return 'assets/images/TSS.png';  
      case 2:
        return 'assets/images/TBE.png';  
      default:
        return '';
    }
  }


  getRankClass(index: number): string {
    return `rank-${index}`;
  }

  // Return a dynamic description for each streamer
  getStreamerDescription(index: number): string {
    const descriptions = [
      'The community’s top pick, delivering epic streams and unforgettable moments!',
      'A fan-favorite streamer known for thrilling content and engaging vibes!',
      'A rising star captivating audiences with skillful plays and charisma!'
    ];
    return descriptions[index] || 'An awesome streamer to watch!';
  }
}
