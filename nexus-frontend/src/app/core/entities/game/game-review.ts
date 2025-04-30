import { User } from "../user/user.model";
import { Game } from "./game";

export class GameReview {
    id: number;
    rating: number;
    reviewText: string;
    createdAt: Date;
    updatedAt: Date;
    game: Game;
    user: User; 

    constructor(id: number, rating: number, reviewText: string, createdAt: Date, updatedAt: Date, game:Game, user:User) {
        this.id = id;
        this.rating = rating;
        this.reviewText = reviewText;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.game = game;
        this.user = user;
    }
}
