import { User } from '../user/user.model';
import { Category } from './category';
import { Commentaire } from './commentaire';
import { Report } from './report'; 

export class Publication {
  id!: number;
  title!: string;
  content!: string;
  pinned!: boolean; 
  locked!: boolean; 
  category!: Category;
  imageUrl?: string;
  user!: User;
  commentaires: Commentaire[] = [];
  reports: Report[] = []; 
  constructor(data?: Partial<Publication>) {
    Object.assign(this, data);
    this.commentaires = data?.commentaires ?? [];
    this.reports = data?.reports ?? [];
  }
}
