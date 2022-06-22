import {Router} from "express";
import {Game, Player, User} from "../bdd/entities";
import {BddService} from "../services/BddService";
import {authVerification} from "./commonMiddlewares/authMiddlewares";
import {BadRequestError, ServerSideError} from "../errors";
import {castToPlayerData} from "../types/request/bodyData/PlayerData";
import {checkId} from "./commonMiddlewares/paramMiddleware";

const router = Router();

router.post("/create", authVerification, async function(req, res, next) {
  const playerData = castToPlayerData(req.body);
  if (playerData === null) throw new BadRequestError("Invalid Player Data");
  // FIXME : Serialize data of user
  const gender = Player.castToGenders(playerData.gender);

  let user;
  let game;
  try {
    user = <User> await BddService.userHandler.findUserById(req.currentUser.id);
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  if (user === null) throw new BadRequestError("No User Found");

  try {
    game = <Game> await BddService.gameHandler.findGameById(+req.body.gameId);
  } catch (e) {
    console.log(e);
    throw new ServerSideError();
  }
  if (game === null) throw new BadRequestError("No Game Found");

  const player = await BddService.playerHandler.createPlayer(playerData, user, game, gender);

  if (player != null) return res.status(200).send(player);
  else throw new ServerSideError();
});

router.get("/player/:id", checkId, async function(req, res, next) {
  const idPlayer: number = +req.params.id;

  const player = <Player> await BddService.playerHandler.findPlayerById(idPlayer);
  return res.status(200).send(player);
});

router.get("/", authVerification, async function(req, res, next) {
  const idUser: number = req.currentUser.id;

  if (isNaN(idUser) || idUser === 0) {
    throw new BadRequestError("User id not valid");
  }

  const player = <Player> await BddService.playerHandler.findPlayerByUser(idUser);
  return res.status(200).send(player);
});

export {router as playerController};
