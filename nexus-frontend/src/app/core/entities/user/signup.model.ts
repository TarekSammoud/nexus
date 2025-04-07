import { RoleType } from './enums';
export class SignUp {
    id?: number;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    phoneNumber?: string;
    address?: string;
    roleType: RoleType = RoleType.PLAYER;  // Utilisation de RoleType directement

    constructor(data: Partial<SignUp> = {}) {
        Object.assign(this, data);
    }
}
