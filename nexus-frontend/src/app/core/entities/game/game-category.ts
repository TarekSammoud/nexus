import { Game } from "./game";

export class GameCategory {
  id!: number;
  name!: string;
  description!: string;
  games?: Game[]; // Optional to prevent circular dependencies

  constructor(data?: Partial<GameCategory>) {
    Object.assign(this, data);
  }
}
