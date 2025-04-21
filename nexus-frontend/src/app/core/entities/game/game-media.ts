import { GameMediaType } from "src/app/game-media-type";
import { Game } from "./game";

export class GameMedia {
  id!: number;
  mediaUrl!: string;
  fileType!: string;
  fileSize!: number;
  createdAt!: Date;
  updatedAt!: Date;
  gameMediaType!: GameMediaType;
  game?: Game;
  gameCover?: Game;
  gameBanner?: Game;
  gameFile?: Game;

  constructor(
    mediaUrl: string,
    fileType: string,
    fileSize: number,
    createdAt: Date,
    updatedAt: Date,
    gameMediaType: string,
    game_id: Number
  ) {}
}
