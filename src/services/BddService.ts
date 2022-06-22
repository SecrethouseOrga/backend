import {EntityManager, MySqlDriver} from "@mikro-orm/mysql";
import {MikroORM, Options} from "@mikro-orm/core";
import {BuzzService, EventService, GameService, PlayerService, RoomGameService, RoomService, UserService} from "./entityServices";
import mikroOrmConfig from "../mikroOrm.config";

export class BddService {
  static entityManager: EntityManager;
  private static user: UserService;
  private static orm: MikroORM<MySqlDriver>;
  private static game: GameService;
  private static player: PlayerService;
  private static event: EventService;
  private static room: RoomService;
  private static roomGame: RoomGameService;
  private static buzz: BuzzService;

  static async createOrm() {
    this.orm = await MikroORM.init<MySqlDriver>(<Options<MySqlDriver>>mikroOrmConfig());
    this.entityManager = this.orm.em as EntityManager;
  }

  static get gameHandler(): GameService {
    if (this.game == null) {
      this.game = new GameService(this.entityManager);
    }
    return this.game;
  }

  static get playerHandler(): PlayerService {
    if (this.player == null) {
      this.player = new PlayerService(this.entityManager);
    }
    return this.player;
  }

  static get userHandler(): UserService {
    if (this.user == null) {
      this.user = new UserService(this.entityManager);
    }
    return this.user;
  }

  static get roomHandler(): RoomService {
    if (this.room == null) {
      this.room = new RoomService(this.entityManager);
    }
    return this.room;
  }

  static get eventHandler(): EventService {
    if (this.event == null) {
      this.event = new EventService(this.entityManager);
    }
    return this.event;
  }

  static get roomGameHandler(): RoomGameService {
    if (this.roomGame == null) {
      this.roomGame = new RoomGameService(this.entityManager);
    }
    return this.roomGame;
  }

  static get buzzHandler(): BuzzService {
    if (this.buzz == null) {
      this.buzz = new BuzzService(this.entityManager);
    }
    return this.buzz;
  }
}
