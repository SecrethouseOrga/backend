import {NextFunction, Request, Response} from "express";
import {RoomType} from "../entities";
import {BddService} from "../services";
import {Controller} from "./Controller";
import {castToRoomTypeData} from "../types/request/bodyData";
import {BadRequestError} from "../errors/api";


export class RoomTypeController extends Controller {
  constructor(bddService:BddService) {
    super("RoomTypeController", bddService);
  }

  async createRoomType(req: Request, res: Response, next:NextFunction) {
    const roomData = castToRoomTypeData(req.body);
    if (roomData === null) throw new BadRequestError("Invalid RoomType Data");
    try {
      await this.bdd.roomTypeService.createRoomType(roomData);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getAllRoomTypes(req: Request, res: Response, next:NextFunction) {
    try {
      req.resPayload.dataToSend = await this.bdd.roomTypeService.findAll();
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getRoomType(req: Request, res: Response, next:NextFunction) {
    const idRoom: number = +req.params.id;
    try {
      req.resPayload.dataToSend = <RoomType> await this.bdd.roomTypeService.findRoomTypeById(idRoom);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }
}
