import {Entity, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {User} from "./User";
import {Game} from "./Game";
import {PlayerData} from "../types/request/bodyData/PlayerData";

@Entity()
export class Player {
    @PrimaryKey()
      id!: number;

    @Property()
      name!: string;

    @Property({default: 10000})
      jackpot = 10000;

    @Property()
      secret!: string;

    @Property({default: ""})
      avatar = "";

    @Property({default: false})
      isReady = false;

    @Property({default: false})
      isBuzzed = false;

    @Property({default: true})
      canBuzz = true;

    @Property({default: true})
      canBeBuzzed = true;

    @Property({default: false})
      isNominated = false;

    @Property({default: false})
      isEliminated = false;

    @Property({default: false})
      secretDiscovered = false;

    @Property()
      gender!: string;

    @ManyToOne()
      user: User;

    @ManyToOne()
      game: Game;

    constructor(playerData: PlayerData, user: User, game: Game) {
      this.name = playerData.name;
      this.secret = playerData.secret;
      this.user = user;
      this.game = game;
      this.gender = playerData.gender.toString();
    }
}
