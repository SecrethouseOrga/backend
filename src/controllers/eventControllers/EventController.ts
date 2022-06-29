import {Controller} from "../Controller";
import {BddService} from "../../services";
import {NextFunction, Request, Response} from "express";

export class EventController extends Controller {
  constructor(bddService:BddService) {
    super("EventController", bddService);
  }

  async updateEvent(req:Request, res:Response, next:NextFunction) {
    const eventId = +req.params.id;
    try {
      req.resPayload.dataToSend = await this.bdd.eventService.updateEvent(eventId, req.body);
    } catch (e) {
      throw this.handleMiddleWareError(e);
    }
    next();
  }
}
