import { User } from "../user/user.model";
import { Entry } from "./entry";

export class Jam {
  id!: number;
  name!: string;
  imageUrl!: string; 
  description!: string;
  devStartDate!: Date;
  devEndDate!: Date;
  voteStartDate!: Date;
  voteEndDate!: Date;
  reward!: string;
  createdAt!: Date;
  updatedAt!: Date;
  user!: User;
  entries: Entry[] = [];
    
    constructor(data?: Partial<Jam>) {
      Object.assign(this, data);
    }
}
