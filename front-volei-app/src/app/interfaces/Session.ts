import { Player } from './Player';

export interface Session {
  id: string;
  date: string;
  players: Player[];
  playersGone: Player[];
  closed: boolean;
}
