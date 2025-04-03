import { User } from "./user.model";
import { StatusFriendRequest } from "./enums";

export interface FriendRequest {
    idFriendRequest: number;
    sender: User;
    recipient: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    status: StatusFriendRequest;
}
