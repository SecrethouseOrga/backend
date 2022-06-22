import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Room} from "./Room";
import {Game} from "./Game";

@Entity()
export class RoomGame {
    @PrimaryKey()
      id!: number;

    @ManyToOne()
      room!: Room;

    @ManyToOne()
      game!: Game;

    @Property({default: false})
      isLocked = false;

    constructor(room: Room, game: Game) {
      this.room = room;
      this.game = game;
    }
}
