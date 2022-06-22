import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Event} from "./Event";
import {Player} from "./Player";

@Entity()
export class Nomination {
    @PrimaryKey()
      id!: number;

    @ManyToOne()
      player!: Player;

    @ManyToOne()
      target!: Player;

    @Property()
      createdAt: Date = new Date();

    @Property()
      updatedAt: Date = new Date();

    @ManyToOne()
      event!: Event;

    constructor(player: Player, target: Player, event: Event) {
      this.player = player;
      this.target = target;
      this.event = event;
    }
}
