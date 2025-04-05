import { Streamer } from './streamer';

export interface Sondage {
  id?: number;
  question: string;
  active?: boolean;
  createdAt?: string;
  streamer?: Streamer;
}
