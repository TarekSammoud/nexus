import { Rarity } from "./rarity.enum";

export class GameItem {
  id!: number;
  name!: string;
  description!: string;
  rarity!: Rarity;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(data?: Partial<GameItem>) {
    Object.assign(this, data);
  }
}
