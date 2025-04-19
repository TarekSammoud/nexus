import { User } from '../user/user.model';
import { Publication } from './publication';

export interface Like {
  id?: number;
  user: User;
  publication: Publication;
}
