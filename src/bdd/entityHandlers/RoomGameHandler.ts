import {Game, Room, RoomGame} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {LoadStrategy} from "@mikro-orm/core";
import {EntityHandler} from "./EntityHandler";

export class RoomGameHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, RoomGame);
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
