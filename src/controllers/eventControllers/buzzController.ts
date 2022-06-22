import {Router} from "express";
import {Buzz, BuzzStatus, EventTypes, Player} from "../../bdd/entities";
import {BadRequestError} from "../../errors";
import {BddService} from "../../services/BddService";
import {castToBuzzData, castToEventData} from "../../types/request/bodyData";
import {
  checkId,
  authVerification,
  sendData,
  objectCreated,
} from "../commonMiddlewares";
import {ErrorService} from "../../services/ErrorService";

const router = Router();

router.post("/", authVerification, async function(req, res, next) {
  const eventData = castToEventData(req.body);
  if (eventData === null) throw new BadRequestError("Invalid Event Data");
  const buzzData = castToBuzzData(req.body);
  if (buzzData === null) throw new BadRequestError("Invalid Buzz Data");

  const userId = req.currentUser.id;
  try {
    const player = <Player> await BddService.playerHandler.findPlayerByUser(userId);
    const game = player.game;
    const target = <Player> await BddService.playerHandler.findPlayerById(buzzData.targetId);
    const event = await BddService.eventHandler.createEvent(eventData, player, game, EventTypes.BUZZ);
    await BddService.buzzHandler.createBuzz(buzzData, player, target, event);
    // TODO: remove 5k from buzzer
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, objectCreated);

router.get("/:id", checkId, async function(req, res, next) {
  const idBuzz: number = +req.params.id;
  try {
    req.dataToSend = <Buzz> await BddService.buzzHandler.findBuzzById(idBuzz);
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, sendData);

router.put("/:id", checkId, async function(req, res, next) {
  const idBuzz: number = +req.params.id;
  try {
    const buzz = <Buzz> await BddService.buzzHandler.update(req.body, idBuzz);
    if (buzz.status === BuzzStatus.CORRECT) {
      await BddService.playerHandler.secretDiscovered(buzz.target.id);
    }
    req.dataToSend = buzz;
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, objectCreated);

export {router as buzzController};
