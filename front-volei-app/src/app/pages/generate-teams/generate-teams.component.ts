import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/interfaces/Session';
import { Player } from 'src/app/interfaces/Player';
import { SessionService } from 'src/app/services/session.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { BaseService } from 'src/app/services/base.service';
import { Team } from 'src/app/interfaces/Team';

@Component({
  selector: 'app-generate-teams',
  templateUrl: './generate-teams.component.html',
  styleUrls: ['./generate-teams.component.css']
})
export class GenerateTeamsComponent {
  session!: Session;
  teamCount = 4;
  keyPlayers: string[] = [];
  showKeySelection = true;

  constructor(
    private sessionService: SessionService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private baseService: BaseService
  ) {
    this.getActiveSession();
  }

  async ngAfterViewInit() {
    //this.getActiveSession();
  }

  public async getActiveSession() {    
    try {
      this.loadingService.showLoading('getActiveSession');      
      const response = await this.sessionService.getActiveSession();      
      this.session = response;
    } catch (err: any) {      
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('getActiveSession');
    }
  }

  toggleKeyPlayer(id: string) {
    if (this.keyPlayers.includes(id)) {
      this.keyPlayers = this.keyPlayers.filter(p => p !== id);
    } else {
      this.keyPlayers.push(id);
    }
  }

  generateTeams() {
    if (!this.session?.players || this.teamCount < 2) return;

    const shuffled = this.session.players
      .filter(p => !this.keyPlayers.includes(p.id))
      .sort(() => Math.random() - 0.5);

    const result: Team[] = Array.from({ length: this.teamCount }, (_, index) => ({
      name: `Time ${index + 1}`,
      players: []
    }));

    this.keyPlayers.forEach((id, index) => {
      const player = this.session.players.find(p => p.id === id);
      if (player) {
        result[index % this.teamCount].players.push(player);
      }
    });

    shuffled.forEach((player, i) => {
      result[i % this.teamCount].players.push(player);
    });

    this.session.teams = result;
  }

  movePlayer(player: Player, fromTeamIndex: number, toTeamIndex: number) {
    if (fromTeamIndex === toTeamIndex) return;

    const fromTeam = this.session.teams[fromTeamIndex];
    const toTeam = this.session.teams[toTeamIndex];

    const playerIndex = fromTeam.players.findIndex(p => p.id === player.id);
    if (playerIndex !== -1) {
      fromTeam.players.splice(playerIndex, 1);
      toTeam.players.push(player);
    }
  }

  addPlayerToTeam(player: Player, teamIndex: number) {
    this.session.teams[teamIndex].players.push(player);
  }

  get notInAnyTeam(): Player[] {
    const assignedIds = this.session.teams.flatMap(team => team.players.map(p => p.id));
    return this.session.players.filter(p => !assignedIds.includes(p.id));
  }

  toggleKeySelection() {
    this.showKeySelection = !this.showKeySelection;
  }

  async saveTeams() {
    if (!this.session || !this.session.id) return;

    const teamsPayload = this.session.teams.map(team => ({
      name: team.name,
      players: team.players.map(p => p.id)
    }));

    try {
      this.loadingService.showLoading('saveTeams');
      const updatedSession = await this.sessionService.updateTeams(this.session.id, teamsPayload);
      this.session = updatedSession;
      this.toastService.show('Times salvos com sucesso!', 'success');
    } catch (err: any) {
      this.toastService.show('Erro ao salvar os times.', 'error');
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('saveTeams');
    }
  }

  get displayedTeams(): Team[] {
    return this.session.teams;
  }
}
