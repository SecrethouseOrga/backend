import {Game, RoomType, RoomGame} from "../../entities";
import {LoadStrategy} from "@mikro-orm/core";
import {EntityService} from "./EntityService";
import {EntityServiceData} from "../../types/api/services";
import {BddOperation} from "../../types/api/enums";

export class RoomGameService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
  }

  async createRoomGame( room: RoomType, game: Game) {
    const roomGame = new RoomGame(room, game);
    try {
      await this.repository.persistAndFlush(roomGame);
      return roomGame;
    } catch (e) {
      throw this.handleOperationError(BddOperation.CREATE, e);
    }
  }

  async findRoomsByGame(id: number) {
    try {
      return await this.repository.find(
          {game: id},
          {
            populate: ["room"],
            strategy: LoadStrategy.SELECT_IN,
          },
      );
    } catch (e) {
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }
}
