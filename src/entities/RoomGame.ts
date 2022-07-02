import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {RoomType} from "./RoomType";
import {Game} from "./Game";

@Entity()
export class RoomGame {
    @PrimaryKey()
      id!: number;

    @ManyToOne()
      room!: RoomType;

    @ManyToOne()
      game!: Game;

    @Property({default: false})
      isLocked = false;

    constructor(room: RoomType, game: Game) {
      this.room = room;
      this.game = game;
    }
}
