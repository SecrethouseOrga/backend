import {Entity, Enum, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {BuzzData} from "../../types/request/bodyData/BuzzData";
import {Event} from "./Event";
import {Player} from "./Player";

@Entity()
export class Buzz {
    @PrimaryKey()
      id!: number;

    @ManyToOne()
      buzzer!: Player;

    @ManyToOne()
      event!: Event;

    @ManyToOne()
      target!: Player;

    @Property()
      createdAt: Date = new Date();

    @Property({onUpdate: () => new Date()})
      updatedAt: Date = new Date();

    @Property()
      secret!: string;

    @Enum(() => BuzzStatus)
      status!: string;

    constructor(buzzData: BuzzData, buzzer: Player, target: Player, event: Event) {
      this.buzzer = buzzer;
      this.event = event;
      this.target = target;
      this.secret = buzzData.secret;
      this.status = BuzzStatus.PENDING;
    }

    static castToBuzzStatus(value: string): BuzzStatus {
      let status: BuzzStatus = BuzzStatus.PENDING;
      try {
        const statusKey: keyof typeof BuzzStatus = value as keyof typeof BuzzStatus;
        status = BuzzStatus[statusKey];
      } catch (e) {
        console.error(e);
        return BuzzStatus.PENDING;
      }
      return status;
    }
}


export enum BuzzStatus{
    "PENDING" = "Pending",
    "CONFIRMED" = "confirmed",
    "CORRECT" = "correct",
    "SEMI-CORRECT" = "semi-correct",
    "WRONG" = "wrong",
}
