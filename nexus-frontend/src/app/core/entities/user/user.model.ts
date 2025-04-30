import { RoleType } from './enums';

export class User {
    id: number | null = null;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = ''; // Important pour l'inscription
    phoneNumber: string | null = null;
    address: string | null = null;
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
    last_login: Date | null = null; // Note: snake_case pour correspondre au backend
    friends: User[] = [];
    roleType: RoleType = RoleType.PLAYER;; // Toujours initialisé avec un rôle par défaut
    profilePictures: string[] = [];
    gameLibrary: string[] = [];

    constructor(data: Partial<User> = {}) {
        Object.assign(this, data);

        // Initialisation propre des tableaux
        this.friends = data.friends || [];
        this.profilePictures = data.profilePictures || [];
        this.gameLibrary = data.gameLibrary || [];


    }
}