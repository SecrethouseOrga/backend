import {EntityService} from "./EntityService";
import {Game, DelayUnities, User} from "../../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {GameData} from "../../types/request/bodyData";

export class GameService extends EntityService {
  constructor(entityManager: EntityManager) {
    super(entityManager, Game);
  }

  async createGame(payload: GameData, user: User, code:string, eventIntervalUnity: DelayUnities, eliminationDelayUnity: DelayUnities) {
    const game = new Game(payload, user, code, eventIntervalUnity, eliminationDelayUnity);
    await this.repository.persistAndFlush(game);
    return game;
  }

  async findGameById(id:number) {
    return await this.repository.findOneOrFail({id: id});
  }

  async findGameByCode(code:string) {
    return await this.repository.findOneOrFail({code: code});
  }
}
