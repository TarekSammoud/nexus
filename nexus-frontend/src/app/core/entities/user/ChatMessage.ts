export class ChatMessage {
    id: number;               // Utilisation de number ici (correspond au Long côté backend)
    sendername: string;
    senderId: number;         // Utilisation de number pour correspondre à Long côté backend
    recipientId: number;      // Utilisation de number pour correspondre à Long côté backend
    content: string;
    timestamp: string = new Date().toISOString()
    type: string;

    constructor(
        senderId: number,
        recipientId: number,
        content: string,
        sendername: string,
        type: string,
        id: number = 0,
        timestamp: string = new Date().toISOString()
    ) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.sendername = sendername;
        this.type = type;
        this.id = id;
        this.timestamp = timestamp;
    }

}
