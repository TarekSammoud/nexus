import { User } from '../user/user.model';
import { Publication } from './publication';

export class Report {
  id?: number;
  reason!: string;
  status!: string;
  user!: Partial<User>;
  publication!: Publication;

  constructor(data?: Partial<Report>) {
    Object.assign(this, data);
  }
}
