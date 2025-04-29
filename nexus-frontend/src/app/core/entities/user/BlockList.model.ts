import { User } from "./user.model";

export class BlockList {
    idBlockList: number; // ID unique du blocage
    blockedUser: User;
    blockedAt: Date; // Date de début du blocage
    blockedUntil: Date; // Date de fin du blocage
    reason: string; // Raison du blocage

    constructor(idBlockList: number, blockedUser: User, blockedAt: Date, blockedUntil: Date, reason: string) {
        this.idBlockList = idBlockList;
        this.blockedUser = blockedUser;
        this.blockedAt = blockedAt;
        this.blockedUntil = blockedUntil;
        this.reason = reason;
    }
}
