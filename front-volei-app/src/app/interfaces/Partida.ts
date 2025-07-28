import { Time } from "./Time";

export interface Partida {
  id: string;
  timeA: Time;
  timeB: Time;
  vencedor: 'A' | 'B' | null; // null se ainda não jogaram
  dataHora: string; // ISO 8601 opcionalmente
}
