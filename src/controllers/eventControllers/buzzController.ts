import {Router} from "express";
import {Buzz, BuzzStatus, EventTypes, Player} from "../../bdd/entities";
import {BadRequestError} from "../../errors";
import {BddService} from "../../services/BddService";
import {authVerification} from "../commonMiddlewares/authMiddlewares";
import {castToBuzzData, castToEventData} from "../../types/request/bodyData";
import {checkId} from "../commonMiddlewares/paramMiddleware";

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
    const buzz = await BddService.buzzHandler.createBuzz(buzzData, player, target, event);
    // TODO: remove 5k from buzzer
    return res.status(200).send(buzz);
  } catch (e) {
    console.log(e);
    throw new BadRequestError("Could not create Buzz Event");
  }
});

router.get("/:id", checkId, async function(req, res, next) {
  const idBuzz: number = +req.params.id;
  try {
    const buzz = <Buzz> await BddService.buzzHandler.findBuzzById(idBuzz);
    return res.status(200).send(buzz);
  } catch (e) {
    console.log(e);
    throw new BadRequestError("Buzz not Found");
  }
});

router.put("/:id", checkId, async function(req, res, next) {
  const idBuzz: number = +req.params.id;
  try {
    const buzz = <Buzz> await BddService.buzzHandler.update(req.body, idBuzz);
    if (buzz.status === BuzzStatus.CORRECT) {
      await BddService.playerHandler.secretDiscovered(buzz.target.id);
    }
    return res.status(200).send(buzz);
  } catch (e) {
    console.log(e);
    throw new BadRequestError("Buzz could not be updated");
  }
});

export {router as buzzController};
