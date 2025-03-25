import { User } from '../user/user.model';
import { Category } from './category';
import { Commentaire } from './commentaire';

export class Publication {
  id!: number;
  title!: string;
  content!: string;
  pinned!: boolean; 
  locked!: boolean; 
  category!: Category;
  user!: User;
  commentaires: Commentaire[] = [];

  constructor(data?: Partial<Publication>) {
    Object.assign(this, data);
    this.commentaires = data?.commentaires ?? [];
  }
}
