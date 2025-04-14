import { Game } from "./game";

export class GameMedia {
  id!: number;
  mediaUrl!: string;
  fileType!: string;
  fileSize!: number;
  createdAt!: Date;
  updatedAt!: Date;
  gameMediaType!: string;
  game_id!: Number;

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
