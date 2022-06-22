import {Router} from "express";
import {Game, Player, User} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {BadRequestError} from "../errors";
import {castToPlayerData} from "../types/request/bodyData/PlayerData";
import {ErrorService, Operation} from "../services/ErrorService";
import {
  authVerification,
  checkId,
  objectCreated,
  sendData,
} from "./commonMiddlewares";

const router = Router();

router.post("/", authVerification, async function(req, res, next) {
  const playerData = castToPlayerData(req.body);
  if (playerData === null) throw new BadRequestError("Invalid Player Data");
  // FIXME : Serialize data of user
  const gender = Player.castToGenders(playerData.gender);

  try {
    const user = <User> await BddService.userHandler.findUserById(req.currentUser.id);
    const game = <Game> await BddService.gameHandler.findGameById(+req.body.gameId);
    await BddService.playerHandler.createPlayer(playerData, user, game, gender);
  } catch (e) {
    ErrorService.handleError(e);
  }
  next();
}, objectCreated);

router.get("/:id", checkId, async function(req, res, next) {
  const idPlayer: number = +req.params.id;
  try {
    req.dataToSend = <Player> await BddService.playerHandler.findPlayerById(idPlayer);
  } catch (e) {
    ErrorService.handleError(e, Operation.FIND);
  }
  next();
}, sendData);

/* router.get("/", authVerification, async function(req, res, next) {
  const idUser: number = req.currentUser.id;

  if (isNaN(idUser) || idUser === 0) {
    throw new BadRequestError("User id not valid");
  }

  const player = <Player> await BddService.playerHandler.findPlayerByUser(idUser);
  return res.status(200).send(player);
});*/

export {router as playerController};
