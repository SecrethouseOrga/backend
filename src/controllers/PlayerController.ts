import {NextFunction, Request, Response} from "express";
import {Game, Player, User} from "../entities";
import {BadRequestError} from "../errors/api";
import {castToPlayerData} from "../types/request/bodyData/PlayerData";
import {BddService} from "../services";
import {Controller} from "./Controller";


export class PlayerController extends Controller {
  constructor(bddService: BddService) {
    super("PlayerController", bddService);
  }

  async createPlayer(req:Request, res:Response, next:NextFunction) {
    const playerData = castToPlayerData(req.body);
    if (playerData === null) throw new BadRequestError("Invalid Player Data");
    // FIXME : Serialize data of user
    const gender = Player.castToGenders(playerData.gender);

    try {
      const user = <User> await this.bdd.userService.findUserById(req.currentUser.id);
      const game = <Game> await this.bdd.gameService.findGameByCode(playerData.gameCode);
      await this.bdd.playerService.createPlayer(playerData, user, game, gender);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getPlayer(req:Request, res:Response, next:NextFunction) {
    const idPlayer: number = +req.params.id;
    try {
      req.resPayload.dataToSend = <Player> await this.bdd.playerService.findPlayerById(idPlayer);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }
}
