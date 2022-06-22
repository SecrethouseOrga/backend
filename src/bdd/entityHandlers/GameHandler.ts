import {EntityHandler} from "./EntityHandler";
import {Game, DelayUnities, User} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {GameData} from "../../types/request/bodyData";

export class GameHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Game);
  }

  async createGame(payload: GameData, user: User, eventIntervalUnity: DelayUnities, eliminationDelayUnity: DelayUnities) {
    const game = new Game(payload, user, eventIntervalUnity, eliminationDelayUnity);
    await this.repository.persistAndFlush(game);
    return game;
  }

  async findGameById(id:number) {
    return await this.repository.findOne({id: id});
  }
}
