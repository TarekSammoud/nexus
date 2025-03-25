import { User } from '../user/user.model';
import { Publication } from './publication';

export class Commentaire {
  id!: number;
  content!: string;
  user!: User;
  publication!: Publication;
  createdAt!: Date;
  updatedAt?: Date;
  edited?: boolean;

  constructor(data?: Partial<Commentaire>) {
    Object.assign(this, data);
  }
}
