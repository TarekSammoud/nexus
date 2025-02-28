import { Game } from "./game";

export class GameMedia {
  id!: number;
  mediaUrl!: string;
  fileType!: string;
  fileSize!: number;
  createdAt!: Date;
  updatedAt!: Date;
  game!: Game;

  constructor(data?: Partial<GameMedia>) {
    Object.assign(this, data);
  }
}
