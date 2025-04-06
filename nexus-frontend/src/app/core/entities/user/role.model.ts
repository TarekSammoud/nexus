import { RoleType } from "./enums";

export class Role {
    id?: number | null = null;
    roleType: RoleType = RoleType.DEVELOPER;

    constructor(data: Partial<Role> = {}) {
        Object.assign(this, data);
    }
}

