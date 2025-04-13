import { Component, OnInit } from '@angular/core';
import { Sondage } from 'src/app/core/entities/community/sondage';
import { SondageService } from 'src/app/core/services/community/sondage.service';
import { VoteService } from 'src/app/core/services/community/vote.service';

@Component({
  selector: 'app-sondage-list',
  templateUrl: './sondage-list.component.html',
  styleUrls: ['./sondage-list.component.css']
})
export class SondageListComponent implements OnInit {

  sondages: Sondage[] = [];
  votesOui: { [key: number]: number } = {};
  votesTotal: { [key: number]: number } = {};
  hasVotedMap: { [key: number]: boolean } = {};

  userId = 1; // 🔁 À rendre dynamique plus tard via auth

  constructor(
    private sondageService: SondageService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.sondageService.getAllSondages().subscribe({
      next: data => {
        this.sondages = data.filter(s => s.approved);
        this.sondages.forEach(s => this.loadStats(s.id!));
      },
      error: err => console.error('Erreur chargement sondages', err)
    });
  }

  loadStats(sondageId: number): void {
    this.voteService.countYesVotes(sondageId).subscribe(v => this.votesOui[sondageId] = v);
    this.voteService.countTotalVotes(sondageId).subscribe(v => this.votesTotal[sondageId] = v);
    this.voteService.hasUserVoted(sondageId, this.userId).subscribe(v => this.hasVotedMap[sondageId] = v);
  }

  voter(sondageId: number, voteOui: boolean): void {
    if (this.hasVotedMap[sondageId]) return;

    this.voteService.vote(sondageId, this.userId, voteOui).subscribe({
      next: () => {
        this.loadStats(sondageId);
        alert('✅ Vote enregistré !');
      },
      error: err => alert('❌ Erreur lors du vote : ' + err.message)
    });
  }

  getPourcentageOui(id: number): number {
    const total = this.votesTotal[id] || 0;
    const oui = this.votesOui[id] || 0;
    return total === 0 ? 0 : Math.round((oui / total) * 100);
  }
}
