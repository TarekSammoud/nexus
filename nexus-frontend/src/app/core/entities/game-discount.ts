import { Game } from "./game/game";


export class GameDiscount {
    id!: number;
    game!: Game;
    discountPercentage?: number;
    saleStartDate?: Date;
    saleEndDate?: Date;
    isActive?: boolean;
  
    constructor(init?: Partial<GameDiscount>) {
      Object.assign(this, init);
    }
  }