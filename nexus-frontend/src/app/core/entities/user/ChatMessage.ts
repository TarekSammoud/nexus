export class ChatMessage {
    id: number;
    senderId: number;       // ID de l'expéditeur, type number
    recipientId: number;    // ID du destinataire, type number
    content: string;
    timestamp: Date;

    constructor(senderId: number, recipientId: number, content: string, id: number = 0) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.timestamp = new Date();  // Ajoute la date et l'heure actuelles
        this.id = id; // Initialisation de l'ID
    }
}
