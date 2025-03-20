import { User } from "../user/user.model";
import { Jam } from "./jam";

export class Entry {
    id!: number;
    nameEntry!: string;
    descriptionEntry!: string;
    createdAt!: Date;
    updatedAt!: Date;
    user!: User;
    jam!: Jam;

    constructor(data?: Partial<Entry>) {
        Object.assign(this, data);
    }
}
