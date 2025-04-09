import { Sondage } from './sondage';
import { User } from '../user/user.model';

export interface Vote {
  id?: number;
  voteOui: boolean;
  user: User;
  sondage: Sondage;
}

