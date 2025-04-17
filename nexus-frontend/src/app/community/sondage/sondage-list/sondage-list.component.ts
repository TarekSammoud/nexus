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
  now: Date = new Date();

  userId = 1; // À rendre dynamique plus tard avec l'authentification
new: any;

  constructor(
    private sondageService: SondageService,
    private voteService: VoteService
  ) {}

  ngOnInit(): void {
    this.now = new Date(); // 🕒 utile pour comparer à endDate
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

  voter(id: number, voteOui: boolean): void {
    const sondage = this.sondages.find(s => s.id === id);
    if (!sondage) return;

    const endDate = sondage.endDate ? new Date(sondage.endDate) : null;

    if (endDate && this.now > endDate) {
      alert("🚫 Ce sondage est terminé !");
      return;
    }

    if (this.hasVotedMap[id]) {
      alert("⚠️ Vous avez déjà voté.");
      return;
    }

    this.voteService.vote(id, this.userId, voteOui).subscribe({
      next: () => {
        this.loadStats(id);
        alert("✅ Vote enregistré !");
      },
      error: err => {
        const message = err.error?.message || err.message || 'Erreur inconnue';
        alert("❌ Erreur lors du vote : " + message);
      }
    });
  }

  getPourcentageOui(id: number): number {
    const total = this.votesTotal[id] || 0;
    const oui = this.votesOui[id] || 0;
    return total === 0 ? 0 : Math.round((oui / total) * 100);
  }
}
