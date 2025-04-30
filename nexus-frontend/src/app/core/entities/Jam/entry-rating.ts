export interface EntryRating {
  id?: number;
  graphicsScore: number;
  gameplayScore: number;
  musicScore: number;
  createdAt?: Date;
  updatedAt?: Date;
  entry: { id: number };
  user: {
    id: number;
    firstName?: string;
    lastName?: string;
  };
}
