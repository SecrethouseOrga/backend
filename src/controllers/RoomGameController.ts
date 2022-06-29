import {NextFunction, Request, Response} from "express";
import {Game, Room} from "../entities";
import {BddService} from "../services";
import {Controller} from "./Controller";


export class RoomGameController extends Controller {
  constructor(bddService:BddService) {
    super("RoomGameController", bddService);
  }

  async createRoomGame(req:Request, res:Response, next:NextFunction) {
    try {
      const game = <Game> await this.bdd.gameService.findGameById(req.body.gameId);
      const room = <Room> await this.bdd.roomTypeService.findRoomTypeById(req.body.roomId);
      await this.bdd.roomGameService.createRoomGame(room, game);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }
}

