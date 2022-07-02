import {NextFunction, Request, Response} from "express";
import {Buzz, BuzzStatus, EventTypes, Player} from "../../entities";
import {BadRequestError} from "../../errors/api";
import {BddService} from "../../services";
import {castToBuzzData, castToEventData} from "../../types/request/bodyData";
import {Controller} from "../Controller";

export class BuzzController extends Controller {
  constructor(bddService:BddService) {
    super("BuzzController", bddService);
  }

  async createBuzz(req: Request, res:Response, next:NextFunction) {
    const eventData = castToEventData(req.body);
    if (eventData === null) throw new BadRequestError("Invalid Event Data");
    const buzzData = castToBuzzData(req.body);
    if (buzzData === null) throw new BadRequestError("Invalid Buzz Data");

    const userId = req.currentUser.id;
    try {
      const player = <Player> await this.bdd.playerService.findPlayerByUser(userId);
      const game = player.game;
      const target = <Player> await this.bdd.playerService.findPlayerById(buzzData.targetId);
      const event = await this.bdd.eventService.createEvent(eventData, player, game, EventTypes.BUZZ);
      await this.bdd.buzzService.createBuzz(buzzData, player, target, event);
      // TODO: remove 5k from buzzer
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async getBuzz(req: Request, res:Response, next:NextFunction) {
    const idBuzz: number = +req.params.id;
    try {
      req.resPayload.dataToSend = <Buzz> await this.bdd.buzzService.findBuzzById(idBuzz);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }

  async updateBuzz(req: Request, res:Response, next:NextFunction) {
    const idBuzz: number = +req.params.id;
    try {
      const buzz = <Buzz> await this.bdd.buzzService.update(req.body, idBuzz);
      if (buzz.status === BuzzStatus.CORRECT) {
        await this.bdd.playerService.secretDiscovered(buzz.target.id);
      }
      req.resPayload.dataToSend = buzz;
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }
}
