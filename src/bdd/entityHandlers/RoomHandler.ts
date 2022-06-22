import {EntityHandler} from "./EntityHandler";
import {Room} from "../entities";
import {EntityManager} from "@mikro-orm/mysql";
import {castToRoomData} from "../../types/request/bodyData";

export class RoomHandler extends EntityHandler {
  constructor(entityManager: EntityManager) {
    super(entityManager, Room);
  }

  async createRoom(payload: any) {
    const roomData = castToRoomData(payload);
    if (roomData === null) return null;
    const room = new Room(roomData);
    await this.repository.persistAndFlush(room);
    return room;
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findRoomById(id: number) {
    return await this.repository.findOne({id: id});
  }
}
