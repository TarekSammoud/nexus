import { User } from "../user/user.model";
import { GameCategory } from "./game-category";
import { GameItem } from "./game-item";
import { GameMedia } from "./game-media";
import { GamePlatform } from "./game-platform.enum";

export class Game {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    platforms!: GamePlatform;
    createdAt!: Date;
    updatedAt!: Date;
    gameItems!: GameItem[];
    users!: User[];
    categories!: GameCategory[];
    gameMediaList!: GameMedia[];
  
    constructor(data?: Partial<Game>) {
      Object.assign(this, data);
      this.gameMediaList = data?.gameMediaList ?? []; // Ensures it's always an array
    }
  }
  