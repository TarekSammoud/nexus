import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sondage } from 'src/app/core/entities/community/sondage';
import { Streamer } from 'src/app/core/entities/community/streamer';
import { SondageService } from 'src/app/core/services/community/sondage.service';
import { StreamerService } from 'src/app/core/services/community/streamer.service';
import { VoteService } from 'src/app/core/services/community/vote.service';

@Component({
  selector: 'app-sondage-live',
  templateUrl: './sondage-live.component.html',
  styleUrls: ['./sondage-live.component.css']
})
export class SondageLiveComponent implements OnInit {
  sondages: Sondage[] = [];
  percentOui: { [id: number]: number } = {};
  streamers: Streamer[] = [];
  selectedStreamer: { [id: number]: number } = {};

  constructor(
    private sondageService: SondageService,
    private voteService: VoteService,
    private streamerService: StreamerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSondages();
    this.streamerService.getAllStreamers().subscribe({
      next: (data) => this.streamers = data
    });
  }

  loadSondages(): void {
    this.sondageService.getAllSondages().subscribe(sondages => {
      this.sondages = sondages.filter(s => s.approved);
      this.sondages.forEach(s => this.calculateVotePercent(s.id!));
    });
  }

  calculateVotePercent(sondageId: number): void {
    this.voteService.countTotalVotes(sondageId).subscribe(total => {
      if (total === 0) {
        this.percentOui[sondageId] = 0;
        return;
      }

      this.voteService.countYesVotes(sondageId).subscribe(oui => {
        this.percentOui[sondageId] = Math.round((oui / total) * 100);
      });
    });
  }

  goToLiveMenu(sondageId: number): void {
    const selectedId = this.selectedStreamer[sondageId];
    const streamer = this.streamers.find(s => s.id === selectedId);
    if (streamer && streamer.streamUrl) {
      // ⬇️ Appel backend pour sauvegarder le lien dans liveUrl
      this.sondageService.startLive(sondageId, streamer.streamUrl).subscribe({
        next: () => {
          this.router.navigate(['/live-room', sondageId], {
            queryParams: { url: streamer.streamUrl }
          });
        },
        error: (err) => alert('Erreur lancement du live : ' + err.message)
      });
    } else {
      alert('⚠️ Veuillez sélectionner un streamer !');
    }
  }
  
}
