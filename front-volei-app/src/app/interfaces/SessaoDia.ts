import { Time } from "@angular/common";
import { Partida } from "./Partida";
import { SessaoJogador } from "./SessaoJogador";


export interface SessaoDia {
  id: string;
  data: string; // ex: 2025-07-22
  jogadores: SessaoJogador[];
  times: Time[];
  partidas: Partida[];
}
