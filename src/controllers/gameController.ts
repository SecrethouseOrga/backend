import {Router} from "express";
import {DelayUnities, Game, Player, Room, User} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {BadRequestError} from "../errors";
import {castToGameData} from "../types/request/bodyData";
import {ErrorService, Operation} from "../services/ErrorService";
import {checkId, sendData, objectCreated, authVerification} from "./commonMiddlewares";

const router = Router();

router.post("/", authVerification, async function(req, res, next) {
  const gameData = castToGameData(req.body);
  if (gameData === null) throw new BadRequestError("Invalid Game Data");

  // FIXME : Serialize data of user
  try {
    const user = <User> await BddService.userHandler.findUserById(req.currentUser.id);
    const eliminationDelayUnity: DelayUnities = Game.castToDelayUnities(gameData.eliminationDelayUnity);
    const eventIntervalUnity: DelayUnities = Game.castToDelayUnities(gameData.eventIntervalUnity);
    await BddService.gameHandler.createGame(gameData, user, eventIntervalUnity, eliminationDelayUnity);
    // TODO: send a code
    req.dataToSend = "code";
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, objectCreated);

router.get("/:id", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  try {
    req.dataToSend = <Game> await BddService.gameHandler.findGameById(idGame);
  } catch (e) {
    throw ErrorService.handleError(e, Operation.FIND);
  }
  next();
}, sendData);

router.get("/:id/players", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  try {
    req.dataToSend = <Player[]> await BddService.playerHandler.findPlayersByGame(idGame);
  } catch (e) {
    throw ErrorService.handleError(e, Operation.FIND);
  }
  next();
}, sendData);

router.get("/:id/rooms", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  try {
    req.dataToSend = <Room[]> await BddService.roomGameHandler.findRoomsByGame(idGame);
  } catch (e) {
    throw ErrorService.handleError(e, Operation.FIND);
  }
  next();
}, sendData);

router.get("/:id/events", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  try {
    req.dataToSend = await BddService.eventHandler.getCurrentEvents(idGame);
  } catch (e) {
    throw ErrorService.handleError(e, Operation.FIND);
  }
  next();
}, sendData);

router.get("/:id/secrets", checkId, async function(req, res, next) {
  const idGame: number = +req.params.id;
  try {
    req.dataToSend = await BddService.playerHandler.getPlayerSecrets(idGame);
  } catch (e) {
    throw ErrorService.handleError(e, Operation.FIND);
  }
  next();
}, sendData);

export {router as gameController};
