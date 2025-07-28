import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from 'src/app/interfaces/Player';
import { BaseService } from 'src/app/services/base.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PlayerService } from 'src/app/services/player.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],  
})
export class PlayersComponent {
  name = '';
  isMonthly: boolean = false;
  showModal: boolean = false;
  players: Player[] = [];
  editingPlayerId: string | null = null;

  constructor(
    private http: HttpClient, 
    private playerService: PlayerService,
    private baseService: BaseService,
    private loadingService: LoadingService,
    private toastService: ToastService
  ) {
    this.getPlayers();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.name = '';
    this.editingPlayerId = '';
    this.isMonthly = false;
  }

  startEditing(player: Player) {
    this.editingPlayerId = player.id;
    this.isMonthly = player.isMonthly;  
    this.name = player.name;
    this.openModal();
  }


  public async getPlayers() {    
    try {
      this.loadingService.showLoading('getPlayers');
      const response = await this.playerService.getPlayers();
      this.players = response;      
    } catch (err: any) {      
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('getPlayers');
    }
  }  

  async savePlayer() {
    const request = { 
      name: this.name, 
      isMonthly: this.isMonthly 
    };
    try {
      this.loadingService.showLoading('savePlayer');

      if (this.editingPlayerId) {
        const updated = await this.playerService.updatePlayer(this.editingPlayerId, request);
        const index = this.players.findIndex(p => p.id === updated.id);
        if (index !== -1) this.players[index] = updated;

        this.toastService.show('Jogador atualizado com sucesso!', 'success');
      } else {        
        const created = await this.playerService.createPlayer(request);
        if(created) {
          this.players.push(created);
          this.toastService.show('Jogador criado com sucesso!', 'success');
        }
      }

      this.closeModal();

    } catch (err: any) {      
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('savePlayer');
    }
  }

  async deletePlayer(player: Player) {
    if (!confirm(`Deseja realmente remover o jogador ${player.name}?`)) return;

    try {
      this.loadingService.showLoading('deletePlayer');
      await this.playerService.deletePlayer(player.id);
      this.players = this.players.filter(p => p.id !== player.id);
      this.toastService.show('Jogador removido com sucesso', 'success');
    } catch (err: any) {    
      this.baseService.processError(err);
    } finally {
      this.loadingService.hideLoading('deletePlayer');
    }
  }
}
