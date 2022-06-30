import {EntityService} from "./EntityService";
import {Game, DelayUnities, User} from "../../entities";
import {GameData} from "../../types/request/bodyData";
import {EntityServiceData} from "../../types/api/services";
import {BddOperation} from "../../types/api/enums";

export class GameService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
  }

  async createGame(payload: GameData, user: User, code:string, eventIntervalUnity: DelayUnities, eliminationDelayUnity: DelayUnities) {
    const game = new Game(payload, user, code, eventIntervalUnity, eliminationDelayUnity);
    try {
      await this.repository.persistAndFlush(game);
      return game;
    } catch (e) {
      throw this.handleOperationError(BddOperation.CREATE, e);
    }
  }

  async findGameById(id:number) {
    try {
      return await this.repository.findOneOrFail({id: id});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }

  async findGameByCode(code:string) {
    try {
      return await this.repository.findOneOrFail({code: code});
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }
}
