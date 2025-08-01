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
  cooldownQueue: any;

  constructor(
    private sessionService: SessionService,
    private matchService: MatchService,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    await this.init();
  }

  async init() {
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
    const cooldownQueue: { team: Team, restRounds: number }[] = [];

    const getKey = (team: any) =>
      JSON.stringify(team.players.map((p: any) => p._id || p.id).sort());

    // Começa com todos os times
    for (const team of initialTeams) {
      queue.push({ ...team });
    }

    for (const match of matches) {
      const winnerTeam = match.winner === 'A' ? match.teamA : match.teamB;
      const loserTeam = match.winner === 'A' ? match.teamB : match.teamA;

      const winnerKey = getKey(winnerTeam);
      const isKingMode = initialTeams.length >= 4;
      const currentWins = winCounter.get(winnerKey) || 0;

      const removeTeam = (teamToRemove: any) => {
        const index = queue.findIndex(t => getKey(t) === getKey(teamToRemove));
        if (index !== -1) queue.splice(index, 1);
      };
      removeTeam(match.teamA);
      removeTeam(match.teamB);

      // Processar cooldown antes da próxima partida
      for (let i = cooldownQueue.length - 1; i >= 0; i--) {
        cooldownQueue[i].restRounds -= 1;
        if (cooldownQueue[i].restRounds <= 0) {
          const restingTeam = cooldownQueue[i].team;
          // Inserir no topo da fila para jogar na próxima
          queue.unshift(restingTeam);
          cooldownQueue.splice(i, 1);
        }
      }


      // Perdedor vai para o fim
      queue.push(loserTeam);

      // Vencedor segue lógica de rei da quadra
      if (isKingMode && currentWins + 1 === 2) {
        winCounter.set(winnerKey, 0);
        cooldownQueue.push({ team: winnerTeam, restRounds: 1 });
      } else {
        winCounter.set(winnerKey, currentWins + 1);
        queue.unshift(winnerTeam);
      }
    }

    this.teamQueue = queue;
    this.winCounter = winCounter;
    this.cooldownQueue = cooldownQueue.map(c => c.team); // Para destacar no HTML
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
      await this.init();
    } catch (err: any) {
      this.toastService.show('Erro ao registrar a partida.', 'error');
    } finally {
      this.loadingService.hideLoading('registerMatch');
    }
  }

  getWinCount(team: Team): number {
    const key = JSON.stringify(team.players.map(p => p.id).sort());
    return this.winCounter.get(key) || 0;
  }

  isSameTeam(team1: any, team2: any): boolean {
    const key1 = JSON.stringify(team1.players.map((p: any) => p._id || p.id).sort());
    const key2 = JSON.stringify(team2.players.map((p: any) => p._id || p.id).sort());
    return key1 === key2;
  }

  isTeamReturningFromCooldown(team: Team): boolean {
    return this.cooldownQueue?.some((c: any) => this.isSameTeam(c, team)) ?? false;
  }

}
