import { SessaoJogador } from "./SessaoJogador";

export interface Time {
  id: number;
  jogadores: SessaoJogador[]; // só jogadores da sessão ativa
}
