import {Router} from "express";
import {BddService} from "../services";
import {authVerification, checkId, objectCreated, returnData} from "../middlewares";
import {GameController} from "../controllers";


export default function(bddService:BddService): Router {
  const controller = new GameController(bddService);
  const router = Router();

  router.post("/", authVerification, controller.createGame, objectCreated);

  router.get("/:id", checkId, controller.getGame, returnData);

  router.get("/:id/players", checkId, controller.getGamePlayers, returnData);

  router.get("/:id/rooms", checkId, controller.getGameRooms, returnData);

  router.get("/:id/events", checkId, controller.getGameEvents, returnData);

  router.get("/:id/secrets", checkId, controller.getGameSecrets, returnData);

  return router;
}
