import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { MatchService } from 'src/app/services/match.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Session } from 'src/app/interfaces/Session';
import { Team } from 'src/app/interfaces/Team';

@Component({
  selector: 'app-match-register',
  templateUrl: './match-register.component.html',
  styleUrls: ['./match-register.component.css']
})
export class MatchRegisterComponent implements OnInit {
  session!: Session;
  match = {
    teamA: null as Team | null,
    teamB: null as Team | null,
    winner: null as Team | null,
  };

  teamQueue: Team[] = [];
  winCounter = new Map<string, number>();

  constructor(
    private sessionService: SessionService,
    private matchService: MatchService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    const activeSession = await this.sessionService.getActiveSession();
    if (activeSession) {
      this.session = activeSession;
      this.teamQueue = [...this.session.teams];
      this.prepareNextMatch();
    }
  }

  prepareNextMatch() {
    if (this.teamQueue.length < 2) {
      this.match = { teamA: null, teamB: null, winner: null };
      return;
    }
    this.match.teamA = this.teamQueue[0];
    this.match.teamB = this.teamQueue[1];
    this.match.winner = null;
  }

  async registerMatch() {
    debugger
    if (!this.match.teamA || !this.match.teamB || !this.match.winner) return;

    const payload = {
      sessionId: this.session.id,
      teamA: {
        name: this.match.teamA.name,
        players: this.match.teamA.players.map(p => p.id)
      },
      teamB: {
        name: this.match.teamB.name,
        players: this.match.teamB.players.map(p => p.id)
      },
      winner: this.match.winner === this.match.teamA ? 'A' : 'B',
      date: new Date()
    };


    try {
      this.loadingService.showLoading('registerMatch');
      await this.matchService.registerMatch(payload);
      this.toastService.show('Partida registrada com sucesso!', 'success');

      const winnerId = this.match.winner._id;
      const currentWins = this.winCounter.get(winnerId) || 0;
      this.winCounter.set(winnerId, currentWins + 1);

      const isKingMode = this.session.teams.length >= 4;

      const loser = this.match.winner === this.match.teamA ? this.match.teamB : this.match.teamA;

      // Remove ambos
      this.teamQueue.splice(0, 2);
      this.teamQueue.push(loser); // perdedor vai para o fim

      if (isKingMode && this.winCounter.get(winnerId) === 2) {
        this.teamQueue.push(this.match.winner); // vencedor sai e volta depois
        this.winCounter.set(winnerId, 0);
      } else {
        this.teamQueue.unshift(this.match.winner); // vencedor continua na frente
      }

      this.prepareNextMatch();
    } catch (err: any) {
      this.toastService.show('Erro ao registrar a partida.', 'error');
    } finally {
      this.loadingService.hideLoading('registerMatch');
    }
  }
}
