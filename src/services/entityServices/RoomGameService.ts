import {Game, Room, RoomGame} from "../../entities";
import {LoadStrategy} from "@mikro-orm/core";
import {EntityService} from "./EntityService";
import {EntityServiceData} from "../../types/api/services";

export class RoomGameService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
  }

  async createRoomGame( room: Room, game: Game) {
    const roomGame = new RoomGame(room, game);
    await this.repository.persistAndFlush(roomGame);
    return roomGame;
  }

  async findRoomsByGame(id: number) {
    return await this.repository.find(
        {game: id},
        {
          populate: ["room"],
          strategy: LoadStrategy.SELECT_IN,
        },
    );
  }
}
