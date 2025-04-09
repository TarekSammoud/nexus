// src/app/models/chat-message.ts

export class ChatMessage {
    senderId: number;       // Changer de string à number
    recipientId: number;    // Changer de string à number
    content: string;
    timestamp: Date;

    constructor(senderId: number, recipientId: number, content: string) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.timestamp = new Date();  // Ajoute la date et l'heure actuelles
    }
}
