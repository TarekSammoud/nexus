
import { RoleType } from './enums';

import { Role } from './role.model';

export class SignUp {
    id?: number;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    phoneNumber?: string;
    address?: string;
    role: Role = new Role({ roleType: RoleType.PLAYER });

    constructor(data: Partial<SignUp> = {}) {
        Object.assign(this, data);
    }
}

