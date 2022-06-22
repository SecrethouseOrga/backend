import {Entity, Enum, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {User} from "./User";
import {GameData} from "../../types/request/bodyData";

@Entity()
export class Game {
    @PrimaryKey()
      id!: number;

    @Property({default: 16})
      maxPlayers!: number;

    @Property({default: null, nullable: true})
      startDate!: Date;

    @Property({default: null, nullable: true})
      endDate!: Date;

    @Property()
      eventIntervalQty!: number;

    @Enum(() => DelayUnities)
      eventIntervalUnity: DelayUnities = DelayUnities.HOURS;

    @Property()
      eliminationDelayQty!: number;

    @Enum(() => DelayUnities)
      eliminationDelayUnity: DelayUnities = DelayUnities.HOURS;

    @ManyToOne()
      owner: User;

    constructor(gameData: GameData, owner: User, eventIntervalUnity: DelayUnities, eliminationDelayUnity: DelayUnities) {
      this.maxPlayers = gameData.maxPlayers;
      this.owner = owner;
      this.eventIntervalUnity = eventIntervalUnity;
      this.eventIntervalQty = gameData.eventIntervalQty;
      this.eliminationDelayUnity = eliminationDelayUnity;
      this.eliminationDelayQty = gameData.eliminationDelayQty;
    }

    static castToDelayUnities(value: string): DelayUnities {
      let unity: DelayUnities = DelayUnities.MINUTES;
      try {
        const unityName: keyof typeof DelayUnities = value as keyof typeof DelayUnities;
        unity = DelayUnities[unityName];
      } catch (e) {
        console.error(e);
        return DelayUnities.MINUTES;
      }
      return unity;
    }
}


export enum DelayUnities{
    "MINUTES" = "min",
    "HOURS" = "h",
    "DAYS" = "d",
}
