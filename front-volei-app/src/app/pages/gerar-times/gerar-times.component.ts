import { Component, Input } from '@angular/core';
import { SessaoJogador } from 'src/app/interfaces/SessaoJogador';
import { Time } from 'src/app/interfaces/Time';

@Component({
  selector: 'app-gerar-times',
  templateUrl: './gerar-times.component.html'
})

export class GerarTimesComponent {
  @Input() jogadoresDaSessao: SessaoJogador[] = [];

  numeroDeTimes = 4;
  cabecasDeChave: SessaoJogador[] = [];
  timesGerados: Time[] = [];

  get jogadoresAtivos(): SessaoJogador[] {
    return this.jogadoresDaSessao.filter(j => !j.saiu);
  }

  selecionarCabeca(jogador: SessaoJogador) {
    if (this.cabecasDeChave.length < this.numeroDeTimes && !this.cabecasDeChave.includes(jogador)) {
      this.cabecasDeChave.push(jogador);
    }
  }

  removerCabeca(jogador: SessaoJogador) {
    this.cabecasDeChave = this.cabecasDeChave.filter(j => j.id !== jogador.id);
  }

  gerarTimes() {
    if (this.cabecasDeChave.length !== this.numeroDeTimes) {
      alert(`Você deve selecionar exatamente ${this.numeroDeTimes} cabeças de chave.`);
      return;
    }

    const jogadoresRestantes = this.jogadoresAtivos.filter(j => !this.cabecasDeChave.includes(j));
    const embaralhados = this.shuffle(jogadoresRestantes);

    const times: Time[] = this.cabecasDeChave.map((j, i) => ({
      id: i + 1,
      jogadores: [j]
    }));

    let index = 0;
    for (const jogador of embaralhados) {
      times[index % this.numeroDeTimes].jogadores.push(jogador);
      index++;
    }

    this.timesGerados = times;
  }

  shuffle(arr: SessaoJogador[]): SessaoJogador[] {
    return arr.slice().sort(() => Math.random() - 0.5);
  }
}
