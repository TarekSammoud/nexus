import { Game } from "./game/game";
import { User } from "./user/user.model";

export class GameKey {
    id: number;
    keyCode: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    // status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
    expiresAt: Date;
    game: Game; // Assuming 'Game' class is defined elsewhere
    user: User; // Assuming 'User' class is defined elsewhere
  
    constructor(id: number, keyCode: string, createdAt: Date, status: string,updatedAt: Date,expiresAt:Date, game: Game, user: User) {
      this.id = id;
      this.keyCode = keyCode;
      this.status = status;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.expiresAt = expiresAt;
      this.game = game;
      this.user = user;
    }

    
  
 
  }
  