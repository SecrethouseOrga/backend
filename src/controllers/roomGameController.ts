import {Router} from "express";
import {Game, Room} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {objectCreated, authVerification} from "./commonMiddlewares";
import {ErrorService} from "../services/ErrorService";

const router = Router();

router.post("/", authVerification, async function(req, res, next) {
  try {
    const game = <Game> await BddService.gameHandler.findGameById(req.body.gameId);
    const room = <Room> await BddService.roomHandler.findRoomById(req.body.roomId);
    await BddService.roomGameHandler.createRoomGame(room, game);
  } catch (e) {
    ErrorService.handleError(e);
  }
  next();
}, objectCreated);

export {router as roomGameController};
