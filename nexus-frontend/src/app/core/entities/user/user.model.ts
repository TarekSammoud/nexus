export class User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    address?: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;
    friends?: User[];
    role?: string;
    profilePictures?: string[];
    gameLibrary?: string[];

    constructor(data: Partial<User> = {}) {
        Object.assign(this, data);
    }
}
