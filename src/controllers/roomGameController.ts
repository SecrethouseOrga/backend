import {Router} from "express";
import {Game, Room} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";
import {BadRequestError} from "../errors";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
  const game = <Game> await BddService.gameHandler.findGameById(req.body.gameId);

  if (game === null) {
    throw new BadRequestError("Invalid Game Data");
  }

  const room = <Room> await BddService.roomHandler.findRoomById(req.body.roomId);

  if (room === null) {
    throw new BadRequestError("Invalid Room Data");
  }

  const roomGame = await BddService.roomGameHandler.createRoomGame(room, game);

  if (roomGame != null) {
    return res.status(200).send(roomGame);
  } else {
    throw new BadRequestError("Invalid Room of Game Data");
  }
});

export {router as roomGameController};
