import { User } from "./user.model";

export interface BlockList {
    idBlockList: number;
    blockedUser: User;
    blockedAt: Date;
    reason: string;
}
