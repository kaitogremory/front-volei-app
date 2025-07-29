import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Player } from 'src/app/interfaces/Player';
import { Session } from 'src/app/interfaces/Session';
import { PlayerService } from 'src/app/services/player.service';
import { LoadingService } from 'src/app/services/loading.service';
import { BaseService } from 'src/app/services/base.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-active-session',
  templateUrl: './active-session.component.html'
})
export class ActiveSessionComponent  {
  allPlayers: Player[] = [];
  session: Session | null = null;
  selectedPlayerIds: string[] = [];
  showConfirmModal: boolean = false;

  constructor(
    private sessionService: SessionService,
    private playerService: PlayerService,
    private loadingService: LoadingService,
    private baseService: BaseService,
    private toastService: ToastService
  ) {
    this.getActiveSession();
  } 

  public async getActiveSession() {    
    try {
      this.loadingService.showLoading('getActiveSession');      
      const response = await this.sessionService.getActiveSession();      
      this.session = response;
      console.log(response)
      await this.getAllPlayers();

    } catch (err: any) {      
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('getActiveSession');
    }
  }

  public async getAllPlayers() {
    try {
      this.loadingService.showLoading('getAllPlayers');
      const response = await this.playerService.getPlayers();      
      this.allPlayers = response;
    } catch (err: any) {      
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('getAllPlayers');
    }
  }

  toggleSelection(player: Player) {
    player.isPresentToday = true;
    const index = this.selectedPlayerIds.indexOf(player.id);
    if (index === -1) {
      this.selectedPlayerIds.push(player.id);
    } else {
      this.selectedPlayerIds.splice(index, 1);
    }
  }

  async startSession() {    
    try {
      this.loadingService.showLoading('startSession');
      const request = {
        players: this.selectedPlayerIds
      };
      const newSession = await this.sessionService.createSession(request);
      this.toastService.show('Sessão criada com sucesso!', 'success');
      this.session = newSession;
      this.getActiveSession();
    } catch (err: any) {      
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('startSession');
    }    
  }

  async closeSession() {
    if (this.session) {
      await this.sessionService.closeSession(this.session.id);
      this.session = null;
    }
  }

  get monthlyPlayers(): Player[] {
    return this.allPlayers.filter(p => p.isMonthly);
  }

  get guestPlayers(): Player[] {
    return this.allPlayers.filter(p => !p.isMonthly);
  }

  get notPresentTodayPlayers(): Player[] {
    const sessionPlayerIds = this.session?.players?.map(p => p.id) || [];
    return this.allPlayers.filter(p => !sessionPlayerIds.includes(p.id));
  }

  isGroupFullySelected(isMonthly: boolean): boolean {
    return this.allPlayers
    .filter(p => p.isMonthly === isMonthly)
    .every(p => this.selectedPlayerIds.includes(p.id));
  }

  toggleGroupSelection(isMonthly: boolean) {
    const group = this.allPlayers.filter(p => p.isMonthly === isMonthly);
    const allSelected = group.every(p => this.selectedPlayerIds.includes(p.id));

    if (allSelected) {
      this.selectedPlayerIds = this.selectedPlayerIds.filter(
        id => !group.some(p => p.id === id)
      );

      group.forEach(p => {
        p.isPresentToday = false;
      });
    } else {
      const updated = [...this.selectedPlayerIds];
      group.forEach(p => {
        if (!updated.includes(p.id)) {
          updated.push(p.id);
          p.isPresentToday = true;
        } 
      });
      this.selectedPlayerIds = updated;
    }
  }

  async addToSession(player: Player) {
    if (this.session?.players) {
      this.session.players.push(player);      
    }

    if (this.session?.playersGone) {
      const indexGone = this.session.playersGone.findIndex(p => p.id === player.id);
      
      if (indexGone !== -1) {
        this.session.playersGone.splice(indexGone, 1); 
      }

      await this.updateSession();
    }  
  }

  async removeFromSession(player: Player) {
    if (!this.session) return;

    if (this.session.players) {
      this.session.players = this.session.players.filter(p => p.id !== player.id);                
    }  

    const alreadyGone = this.session.playersGone.some(p => p.id === player.id);

    if (!alreadyGone) {
      this.session.playersGone.push(player);
    }

    await this.updateSession();
  } 

  async updateSession() {
    if (!this.session) return;

    try {
      this.loadingService.showLoading('updateSession');
      
      const request = {
        id: this.session.id,
        players: this.session.players.map(p => p.id),
        playersGone: this.session.playersGone.map(p => p.id)
      };
      console.log('request:', request)
      const updatedSession = await this.sessionService.updateSession(request);      
      this.toastService.show('Sessão atualizada com sucesso!', 'success');
    } catch (err: any) {
      this.toastService.show('Erro ao atualizar a sessão.', 'error');
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('updateSession');
    }
  }
}
