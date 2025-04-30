import { User } from "./user.model";
import { NotificationType } from "./enums";

export interface Notification {
    idNotification: number;
    user: User;
    message: string;
    isRead: boolean;
    notificationType: NotificationType;
}
