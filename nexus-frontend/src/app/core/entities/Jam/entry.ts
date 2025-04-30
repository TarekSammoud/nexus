import { User } from "../user/user.model";
import { Jam } from "./jam";
import { EntryRating } from './entry-rating'; // adjust the path as needed


export class Entry {
    id!: number;
    nameEntry!: string;
    descriptionEntry!: string;
    zipUrl?: string;      
  agree?: boolean;
    createdAt!: Date;
    updatedAt!: Date;
    user!: User;
    jam!: Partial<Jam>;
    entryMediaList?: any[];  
    ratings?: any[];         
    entryRatingList?: EntryRating[];


    constructor(data?: Partial<Entry>) {
        Object.assign(this, data);
    }
}
