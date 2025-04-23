import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sondage } from 'src/app/core/entities/community/sondage';
import { Streamer } from 'src/app/core/entities/community/streamer';
import { SondageService } from 'src/app/core/services/community/sondage.service';
import { StreamerService } from 'src/app/core/services/community/streamer.service';
import { VoteService } from 'src/app/core/services/community/vote.service';
import { ToastrService } from 'ngx-toastr'; 


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
    private router: Router,
    private toastr: ToastrService
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
    const streamerId = this.sondages.find(s => s.id === sondageId)?.streamer?.id;
    const streamer = this.streamers.find(s => s.id === streamerId);
  
    if (!streamer) {
      alert("❌ Aucun streamer sélectionné.");
      return;
    }
  
    if (!streamer.available) {
      alert("⚠️ Ce streamer n'est pas disponible actuellement.");
      return;
    }
  
    if (streamer.streamUrl) {
      this.sondageService.startLive(sondageId, streamer.streamUrl).subscribe({
        next: () => {
          this.router.navigate(['/live-room', sondageId], {
            queryParams: { url: streamer.streamUrl }
          });
        },
        error: err => alert('Erreur lancement du live : ' + err.message)
      });
    } else {
      alert('❌ Ce streamer n’a pas de lien de stream.');
    }
  }
  
  
  
}
