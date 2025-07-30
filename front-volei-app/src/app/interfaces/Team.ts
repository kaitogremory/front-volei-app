import { Player } from "./Player";

export interface Team {
  name: string;           // Ex: "Time 1"
  players: Player[];      // IDs dos jogadores
}
