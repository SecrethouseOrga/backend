import {Entity, Enum, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {EventData} from "../../types/request/bodyData";
import {Game} from "./Game";
import {Player} from "./Player";

@Entity()
export class Event {
    @PrimaryKey()
      id!: number;

    @Property()
      createdAt: Date = new Date();

    @Property({onUpdate: () => new Date()})
      updatedAt: Date = new Date();

    @Property()
      content!: string;

    @ManyToOne()
      player!: Player;

    @ManyToOne()
      game!: Game;

    @Enum(() => EventTypes)
      type!: string;

    @Enum(() => EventStatus)
      status!: string;

    constructor(eventData: EventData, player: Player, game: Game, eventType: EventTypes) {
      this.content = eventData.content;
      this.player = player;
      this.game = game;
      this.type = eventType;
      this.status = EventStatus.STARTED;
    }

    // @FIXME : Si la requête ne contient pas ces types, ça renvoie une erreur vide de sens et ne remplit pas type/status
    static castToEventTypes(value: string): EventTypes {
      let type: EventTypes = EventTypes.EVENT;
      try {
        const typeKey: keyof typeof EventTypes = value as keyof typeof EventTypes;
        type = EventTypes[typeKey];
      } catch (e) {
        console.error(e);
        return EventTypes.EVENT;
      }
      return type;
    }

    static castToEventStatus(value: string): EventStatus {
      let type: EventStatus = EventStatus.STARTED;
      try {
        const typeKey: keyof typeof EventStatus = value as keyof typeof EventStatus;
        type = EventStatus[typeKey];
      } catch (e) {
        console.error(e);
        return EventStatus.STARTED;
      }
      return type;
    }
}


export enum EventTypes{
    "EVENT" = "event",
    "NOMINATION" = "nomination",
    "BUZZ" = "buzz",
    "ELIMINATION" = "elimination"
}

export enum EventStatus{
    "STARTED" = "started",
    "ENDED" = "ended",
    "CANCELLED" = "cancelled",
}
