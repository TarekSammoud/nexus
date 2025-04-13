import { Streamer } from './streamer';

export interface Sondage {
  id?: number;
  question: string;
  active?: boolean;
  approved?: boolean;
  createdAt?: string;
  streamer?: Streamer;
  liveUrl?: string;
}
