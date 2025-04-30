import { User } from "./user.model";

export interface ProfilePicture {
    id: number;
    imageUrl: string;
    fileType: string;
    fileSize: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
