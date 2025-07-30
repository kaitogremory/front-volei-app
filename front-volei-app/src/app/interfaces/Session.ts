import { Player } from './Player';
import { Team } from './Team';

export interface Session {
  id: string;
  date: string;
  players: Player[];
  playersGone: Player[];
  teams: Team[];
  closed: boolean;
}
