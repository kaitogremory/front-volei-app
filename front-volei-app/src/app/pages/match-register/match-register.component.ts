import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { MatchService } from 'src/app/services/match.service';
import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Session } from 'src/app/interfaces/Session';
import { Team } from 'src/app/interfaces/Team';
import { Match } from 'src/app/interfaces/Match';

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
  showHistory = true;
  matchHistory: Match[] = [];

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
      const matches = await this.matchService.getMatchesBySession(this.session.id);

      if (matches.length > 0) {
        this.matchHistory = await this.matchService.getMatchesBySession(this.session.id);
        this.reconstructQueueFromMatches(this.matchHistory);
        this.prepareNextMatch();
      } else {
        this.teamQueue = [...this.session.teams];
        this.prepareNextMatch();
      }
    }
  }

  reconstructQueueFromMatches(matches: any[]) {
    const initialTeams = [...this.session.teams];
    const queue: Team[] = [];
    const winCounter = new Map<string, number>();

    // Começa com os times da sessão, garantindo todos presentes
    for (const team of initialTeams) {
      queue.push({ ...team });
    }

    for (const match of matches) {
      const winnerTeam = match.winner === 'A' ? match.teamA : match.teamB;
      const loserTeam = match.winner === 'A' ? match.teamB : match.teamA;

      const winnerKey = JSON.stringify(winnerTeam.players);

      const currentWins = winCounter.get(winnerKey) || 0;
      const isKingMode = initialTeams.length >= 4;

      // Remove ambos da fila
      const removeTeam = (teamToRemove: any) => {
        const index = queue.findIndex(t => JSON.stringify(t.players.map((p: any) => p._id || p.id)) === JSON.stringify(teamToRemove.players.map((p: any) => p._id || p.id)));
        if (index !== -1) queue.splice(index, 1);
      };

      removeTeam(match.teamA);
      removeTeam(match.teamB);

      // Adiciona com base na regra
      queue.push(loserTeam);

      if (isKingMode && currentWins + 1 === 2) {
        winCounter.set(winnerKey, 0);
        queue.push(winnerTeam); // Sai da quadra
      } else {
        winCounter.set(winnerKey, currentWins + 1);
        queue.unshift(winnerTeam); // Continua na frente
      }
    }

    this.teamQueue = queue;
    this.winCounter = winCounter;
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

      const winnerId = JSON.stringify(this.match.winner.players.map(p => p.id));
      const currentWins = this.winCounter.get(winnerId) || 0;
      this.winCounter.set(winnerId, currentWins + 1);

      const isKingMode = this.session.teams.length >= 4;
      const loser = this.match.winner === this.match.teamA ? this.match.teamB : this.match.teamA;

      // Remove os dois da fila
      this.teamQueue.splice(0, 2);
      this.teamQueue.push(loser);

      if (isKingMode && this.winCounter.get(winnerId) === 2) {
        this.teamQueue.push(this.match.winner);
        this.winCounter.set(winnerId, 0);
      } else {
        this.teamQueue.unshift(this.match.winner);
      }

      this.prepareNextMatch();
    } catch (err: any) {
      this.toastService.show('Erro ao registrar a partida.', 'error');
    } finally {
      this.loadingService.hideLoading('registerMatch');
    }
  }
}
