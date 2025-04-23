import { GameDiscount } from "../game-discount";
import { User } from "../user/user.model";
import { GameCategory } from "./game-category";
import { GameItem } from "./game-item";
import { GameMedia } from "./game-media";
import { GamePlatform } from "./game-platform.enum";
import { GameReview } from "./game-review";
import { SystemRequirements } from "./system-requirements";

export class Game {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    platforms!: GamePlatform;
    createdAt!: Date;
    updatedAt!: Date;
    gameItems!: GameItem[];
    categories!: GameCategory[];
    gameMediaList!: GameMedia[];
    coverPicture?: GameMedia;
    gameFile?: GameMedia;
    bannerPicture?: GameMedia;
    screenshots?: GameMedia[];
    minRequirements?: SystemRequirements; 
    recommendedRequirements?: SystemRequirements;
    gameReviewList?: GameReview[]; 
    developer? : User;
    gameDiscount? : GameDiscount;


  
    constructor(data?: Partial<Game>) {
      Object.assign(this, data);
      this.gameMediaList = data?.gameMediaList ?? []; // Ensures it's always an array
    }
  }
  