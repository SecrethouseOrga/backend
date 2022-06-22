import {Router} from "express";
import {Game, Room} from "../entities";
import {BddService, ErrorService} from "../services";
import {objectCreated, authVerification} from "./commonMiddlewares";

const router = Router();

router.post("/", authVerification, async function(req, res, next) {
  try {
    const game = <Game> await BddService.gameHandler.findGameById(req.body.gameId);
    const room = <Room> await BddService.roomHandler.findRoomById(req.body.roomId);
    await BddService.roomGameHandler.createRoomGame(room, game);
  } catch (e) {
    throw ErrorService.handleError(e);
  }
  next();
}, objectCreated);

export {router as roomGameController};
