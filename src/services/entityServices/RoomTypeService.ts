import {EntityService} from "./EntityService";
import {RoomType} from "../../entities";
import {RoomTypeData} from "../../types/request/bodyData";
import {EntityServiceData} from "../../types/api/services";
import {BddOperation} from "../../types/api/enums";

export class RoomTypeService extends EntityService {
  constructor(data: EntityServiceData) {
    super(data);
  }

  async createRoomType(payload: RoomTypeData) {
    const room = new RoomType(payload);
    try{
      await this.repository.persistAndFlush(room);
      return room;
    }catch (e){
      throw this.handleOperationError(BddOperation.CREATE, e);
    }

  }

  async findAll() {
    try {
      return await this.repository.findAll();
    }catch (e){
      throw this.handleOperationError(BddOperation.FIND, e);
    }

  }

  async findRoomTypeById(id: number) {
    try{
      return await this.repository.findOneOrFail({id: id});
    }catch (e){
      throw this.handleOperationError(BddOperation.FIND, e);
    }
  }
}
