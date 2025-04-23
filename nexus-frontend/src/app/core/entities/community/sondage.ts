import { Streamer } from './streamer';
import { User } from '../user/user.model';


export interface Sondage {
  id?: number;
  question: string;
  active?: boolean;
  approved: boolean;
  createdAt?: string;
  streamer?: Streamer;
  liveUrl?: string;
  endDate?: string;
  user?: User;
  

}
