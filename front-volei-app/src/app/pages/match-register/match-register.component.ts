import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/interfaces/Session';
import { Team } from 'src/app/interfaces/Team';
import { MatchService } from 'src/app/services/match.service';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-match-register',
  templateUrl: './match-register.component.html',
  styleUrls: ['./match-register.component.css']
})
export class MatchRegisterComponent implements OnInit {
  session!: Session;
  match: { teamA: Team | null, teamB: Team | null, winner: Team | null } = {
    teamA: null,
    teamB: null,
    winner: null
  };

  constructor(
    private sessionService: SessionService,
    private matchService: MatchService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {
    this.session = await this.sessionService.getActiveSession();
  }

  async registerMatch() {
    if (!this.match.teamA || !this.match.teamB || !this.match.winner) return;

    const payload = {
      sessionId: this.session.id,
      teamA: this.match.teamA._id,
      teamB: this.match.teamB._id,
      winner: this.match.winner._id,
      date: new Date()
    };

    try {
      await this.matchService.createMatch(payload);
      this.toastService.show('Partida registrada com sucesso!', 'success');
      this.match = { teamA: null, teamB: null, winner: null }; // reset
    } catch (error) {
      this.toastService.show('Erro ao registrar partida', 'error');
    }
  }
}
