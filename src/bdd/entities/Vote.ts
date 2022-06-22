import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {Event} from "./Event";
import {Player} from "./Player";
import {User} from "./User";

@Entity()
export class Vote {
    @PrimaryKey()
      id!: number;

    @ManyToOne()
      user!: User;

    @ManyToOne()
      target!: Player;

    @Property()
      createdAt: Date = new Date();

    @Property()
      updatedAt: Date = new Date();

    @ManyToOne()
      event!: Event;

    constructor(user: User, target: Player, event: Event) {
      this.user = user;
      this.target = target;
      this.event = event;
    }
}
