import { Component } from '@angular/core';
import { Player } from 'src/app/interfaces/Player';
import { SessaoDia } from 'src/app/interfaces/SessaoDia';
import { SessaoJogador } from 'src/app/interfaces/SessaoJogador';


@Component({
  selector: 'app-presenca',
  templateUrl: './presenca.component.html'
})
export class PresencaComponent {
  data = new Date().toISOString().split('T')[0];

  // Todos os jogadores cadastrados no sistema
  todosJogadores: (Player & { presente: boolean })[] = [
    
  ];

  sessaoCriada: SessaoDia | null = null;

  iniciarSessao() {
    // const jogadoresPresentes: SessaoJogador[] = this.todosJogadores
    //   .filter(j => j.presente)
    //   .map(j => ({
    //     id: j.id,
    //     name: j.name,
    //     saiu: false
    //   }));

    this.sessaoCriada = {
      id: crypto.randomUUID(),
      data: this.data,
      jogadores: [],//jogadoresPresentes,
      times: [],
      partidas: []
    };

    console.log('Sessão criada:', this.sessaoCriada);
    // Você pode salvar a sessão no backend aqui
  }
}
