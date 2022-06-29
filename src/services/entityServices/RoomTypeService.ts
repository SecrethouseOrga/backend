import {EntityService} from "./EntityService";
import {Room} from "../../entities";
import {castToRoomData} from "../../types/request/bodyData";
import {EntityServiceData} from "../../types/api/services";

export class RoomTypeService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
  }

  async createRoomType(payload: any) {
    const roomData = castToRoomData(payload);
    if (roomData === null) return null;
    const room = new Room(roomData);
    await this.repository.persistAndFlush(room);
    return room;
  }

  async findAll() {
    return await this.repository.findAll();
  }

  async findRoomTypeById(id: number) {
    return await this.repository.findOne({id: id});
  }
}
