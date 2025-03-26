// commentaire.ts
import { User } from '../user/user.model';
import { Publication } from './publication';

export class Commentaire {
  id?: number; // ✅ rendre l'id optionnel
  content!: string;
  user!: Partial<User>;
  publication!: Partial<Publication>;
  createdAt?: Date;
  updatedAt?: Date;
  edited?: boolean;

  constructor(data?: Partial<Commentaire>) {
    Object.assign(this, data);
  }
}
