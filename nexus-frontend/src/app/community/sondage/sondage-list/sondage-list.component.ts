import { Component, OnInit } from '@angular/core';
import { Sondage } from 'src/app/core/entities/community/sondage';
import { SondageService } from 'src/app/core/services/community/sondage.service';
import { VoteService } from 'src/app/core/services/community/vote.service';
import { TokenService } from 'src/app/core/services/user-management/token.service';
import { ToastrService } from 'ngx-toastr';



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

    userId: number | null = null;

new: any;

  constructor(
    private sondageService: SondageService,
    private voteService: VoteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.now = new Date(); 

    this.userId = TokenService.getUserId();
    if (this.userId === null) {
      console.error("Utilisateur non authentifié !");
     
      return;
    }

    
    this.sondageService.getAllSondages().subscribe({
      next: data => {
        this.sondages = data.filter(s => s.approved); 
        this.sondages.forEach(s => this.loadStats(s.id!));
      },
      error: err => console.error('Erreur chargement sondages', err)
    });
  }

  

  loadStats(sondageId: number): void {
    if (this.userId === null) {
      this.toastr.error("Utilisateur non authentifié !");
      return;
    }
  
    this.voteService.countYesVotes(sondageId).subscribe(v => this.votesOui[sondageId] = v);
    this.voteService.countTotalVotes(sondageId).subscribe(v => this.votesTotal[sondageId] = v);
  
    // Utiliser une vérification pour éviter l'erreur
    if (this.userId !== null) {
      this.voteService.hasUserVoted(sondageId, this.userId).subscribe(v => this.hasVotedMap[sondageId] = v);
    }
  }
  

  voter(id: number, voteOui: boolean): void {
    const sondage = this.sondages.find(s => s.id === id);
    if (!sondage) return;

    const endDate = sondage.endDate ? new Date(sondage.endDate) : null;

    if (endDate && this.now > endDate) {
      this.toastr.warning("🚫 Ce sondage est terminé !");
      return;
    }

    if (this.hasVotedMap[id]) {
      this.toastr.info("⚠️ Vous avez déjà voté.");
      return;
    }

    this.voteService.vote(id, this.userId!, voteOui).subscribe({
      next: () => {
        this.loadStats(id);
        this.toastr.success("✅ Vote enregistré !");
      },
      error: err => {
        const message = err.error?.message || err.message || 'Erreur inconnue';
        this.toastr.error("❌ Erreur lors du vote : " + message);
      }
    });
  }

  getPourcentageOui(id: number): number {
    const total = this.votesTotal[id] || 0;
    const oui = this.votesOui[id] || 0;
    return total === 0 ? 0 : Math.round((oui / total) * 100);
  }



  isPollEnded(endDate: string | null): boolean {
    if (!endDate) return false;
    const end = new Date(endDate);
    return this.now > end;
  }
}
