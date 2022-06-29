import {NextFunction, Request, Response} from "express";
import {Room} from "../entities";
import {BddService} from "../services";
import {Controller} from "./Controller";


export class RoomTypeController extends Controller {
  constructor(bddService:BddService) {
    super("RoomTypeController", bddService);
  }

  async createRoomType(req: Request, res: Response, next:NextFunction) {
    try {
      await this.bdd.roomTypeService.createRoomType(req.body);
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
      req.resPayload.dataToSend = <Room> await this.bdd.roomTypeService.findRoomTypeById(idRoom);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }
}
