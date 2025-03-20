import { User } from "../user/user.model";
import { Entry } from "./entry";

export class Jam {
    id!: number;
    name!: string;
    description!: string;
    createdAt!: Date;
    updatedAt!: Date;
    devStartDate!: Date;
    devEndDate!: Date;
    voteStartDate!: Date;
    voteEndDate!: Date;
    reward!: string;
    user!: User;  
    participants!: User[];  
    entries!: Entry[];  
    
    constructor(data?: Partial<Jam>) {
      Object.assign(this, data);
    }
}
