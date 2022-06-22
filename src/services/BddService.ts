import {EntityManager, MySqlDriver} from "@mikro-orm/mysql";
import {MikroORM, Options} from "@mikro-orm/core";
import {BuzzHandler, EventHandler, GameHandler, NominationHandler, PlayerHandler, RoomGameHandler, RoomHandler, UserHandler, VoteHandler} from "../bdd/entityHandlers";
import mikroOrmConfig from "../mikroOrm.config";

export class BddService {
  static entityManager: EntityManager;
  private static user: UserHandler;
  private static orm: MikroORM<MySqlDriver>;
  private static game: GameHandler;
  private static player: PlayerHandler;
  private static event: EventHandler;
  private static room: RoomHandler;
  private static roomGame: RoomGameHandler;
  private static buzz: BuzzHandler;
  private static vote: VoteHandler;
  private static nomination: NominationHandler;

  static async createOrm() {
    this.orm = await MikroORM.init<MySqlDriver>(<Options<MySqlDriver>>mikroOrmConfig());
    this.entityManager = this.orm.em as EntityManager;
  }

  static get gameHandler(): GameHandler {
    if (this.game == null) {
      this.game = new GameHandler(this.entityManager);
    }
    return this.game;
  }

  static get playerHandler(): PlayerHandler {
    if (this.player == null) {
      this.player = new PlayerHandler(this.entityManager);
    }
    return this.player;
  }

  static get userHandler(): UserHandler {
    if (this.user == null) {
      this.user = new UserHandler(this.entityManager);
    }
    return this.user;
  }

  static get roomHandler(): RoomHandler {
    if (this.room == null) {
      this.room = new RoomHandler(this.entityManager);
    }
    return this.room;
  }

  static get eventHandler(): EventHandler {
    if (this.event == null) {
      this.event = new EventHandler(this.entityManager);
    }
    return this.event;
  }

  static get roomGameHandler(): RoomGameHandler {
    if (this.roomGame == null) {
      this.roomGame = new RoomGameHandler(this.entityManager);
    }
    return this.roomGame;
  }

  static get buzzHandler(): BuzzHandler {
    if (this.buzz == null) {
      this.buzz = new BuzzHandler(this.entityManager);
    }
    return this.buzz;
  }

  static get nominationHandler(): NominationHandler {
    if (this.nomination == null) {
      this.nomination = new NominationHandler(this.entityManager);
    }
    return this.nomination;
  }

  static get voteHandler(): VoteHandler {
    if (this.vote == null) {
      this.vote = new VoteHandler(this.entityManager);
    }
    return this.vote;
  }
}
