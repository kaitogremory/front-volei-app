import { Component } from '@angular/core';
import { SessaoDia } from 'src/app/interfaces/SessaoDia';

@Component({
  selector: 'app-iniciar-sessao',
  templateUrl: './iniciar-sessao.component.html'
})
export class IniciarSessaoComponent {
  data = new Date().toISOString().split('T')[0];

  todosJogadores = [
    { id: '1', name: 'Caio', presente: false },
    { id: '2', name: 'Pedro', presente: false },
    { id: '3', name: 'Ana', presente: false },
  ];

  criarSessao() {
    const jogadoresPresentes = this.todosJogadores
      .filter(j => j.presente)
      .map(j => ({ id: j.id, name: j.name, saiu: false }));

    const novaSessao: SessaoDia = {
      id: crypto.randomUUID(),
      data: this.data,
      jogadores: [],
      times: [],
      partidas: [],
    };

    // Aqui você pode salvar a sessão (ex: this.api.salvarSessao(novaSessao))
    console.log('Sessão criada:', novaSessao);
  }
}
