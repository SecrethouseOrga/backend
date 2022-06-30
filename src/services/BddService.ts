import {EntityManager, MySqlDriver} from "@mikro-orm/mysql";
import {AnyEntity, EntityName, MikroORM, Options} from "@mikro-orm/core";
import {BuzzService, EventService, GameService, PlayerService, RoomGameService, RoomTypeService, UserService} from "./entityServices";
import mikroOrmConfig from "../configs/mikro-orm.config";
import {Service} from "./Service";
import {EntityServiceData} from "../types/api/services";
import {Buzz, Event, Game, Player, RoomType, RoomGame, User} from "../entities";
import {LoggerService} from "./LoggerService";

export class BddService extends Service {
  private em!: EntityManager;
  private orm!: MikroORM<MySqlDriver>;
  private game!: GameService;
  private player!: PlayerService;
  private user!: UserService;
  private event!: EventService;
  private roomType!: RoomTypeService;
  private roomGame!: RoomGameService;
  private buzz!: BuzzService;

  constructor(logger: LoggerService) {
    super("BddService", logger);
    this.createOrm().then( (r) =>{
      this.game = new GameService(this.getEntityServiceData(Game));
      this.player = new PlayerService(this.getEntityServiceData(Player));
      this.user = new UserService(this.getEntityServiceData(User));
      this.roomType = new RoomTypeService(this.getEntityServiceData(RoomType));
      this.event = new EventService(this.getEntityServiceData(Event));
      this.roomGame = new RoomGameService(this.getEntityServiceData(RoomGame));
      this.buzz = new BuzzService(this.getEntityServiceData(Buzz));
    });
  }

  async createOrm() {
    this.orm = await MikroORM.init<MySqlDriver>(<Options<MySqlDriver>>mikroOrmConfig());
    this.em = this.orm.em as EntityManager;
  }

  getEntityServiceData(entity:EntityName<AnyEntity>): EntityServiceData {
    return {
      entityManager: this.em,
      entityName: entity,
      logger: this.logger,
    };
  }

  get entityManager(): EntityManager {
    return this.em;
  }

  get gameService(): GameService {
    return this.game;
  }

  get playerService(): PlayerService {
    return this.player;
  }

  get userService(): UserService {
    return this.user;
  }

  get roomTypeService(): RoomTypeService {
    return this.roomType;
  }

  get eventService(): EventService {
    return this.event;
  }

  get roomGameService(): RoomGameService {
    return this.roomGame;
  }

  get buzzService(): BuzzService {
    return this.buzz;
  }
}
