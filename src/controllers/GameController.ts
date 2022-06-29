import {NextFunction, Request, Response} from "express";
import {DelayUnities, Game, Player, Room, User} from "../entities";
import {BadRequestError} from "../errors/api";
import {castToGameData} from "../types/request/bodyData";
import {BddService} from "../services";
import {Controller} from "./Controller";


export class GameController extends Controller {
  constructor(bddService:BddService) {
    super("GameController", bddService);
  }

  async createGame(req:Request, res:Response, next:NextFunction) {
    const gameData = castToGameData(req.body);
    if (gameData === null) throw new BadRequestError("Invalid Game Data");

    try {
      const user = <User> await this.bdd.userService.findUserById(req.currentUser.id);
      const eliminationDelayUnity: DelayUnities = Game.castToDelayUnities(gameData.eliminationDelayUnity);
      const eventIntervalUnity: DelayUnities = Game.castToDelayUnities(gameData.eventIntervalUnity);
      let code = Date.now().toString(36).substr(2, 10);
      code = "#"+ code.toUpperCase();
      await this.bdd.gameService.createGame(gameData, user, code, eventIntervalUnity, eliminationDelayUnity);
      req.resPayload.dataToSend = code.toUpperCase();
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getGame(req:Request, res:Response, next:NextFunction) {
    const idGame: number = +req.params.id;
    try {
      req.resPayload.dataToSend = <Game> await this.bdd.gameService.findGameById(idGame);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getGamePlayers(req:Request, res:Response, next:NextFunction) {
    const idGame: number = +req.params.id;
    try {
      req.resPayload.dataToSend = <Player[]> await this.bdd.playerService.findPlayersByGame(idGame);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getGameRooms(req:Request, res:Response, next:NextFunction) {
    const idGame: number = +req.params.id;
    try {
      req.resPayload.dataToSend = <Room[]> await this.bdd.roomGameService.findRoomsByGame(idGame);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getGameEvents(req:Request, res:Response, next:NextFunction) {
    const idGame: number = +req.params.id;
    try {
      req.resPayload.dataToSend = await this.bdd.eventService.getCurrentEvents(idGame);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getGameSecrets(req:Request, res:Response, next:NextFunction) {
    const idGame: number = +req.params.id;
    try {
      req.resPayload.dataToSend = await this.bdd.playerService.getPlayerSecrets(idGame);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }
}
