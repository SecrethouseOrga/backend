import {Router} from "express";
import {BddService} from "../services";
import {authVerification, checkId, objectCreated, returnData} from "../middlewares";
import {GameController} from "../controllers";


export default function(bddService:BddService): Router {
  const controller = new GameController(bddService);
  const router = Router();

  router.post("/", authVerification, controller.createGame.bind(controller), objectCreated);

  router.get("/:code", controller.getGame.bind(controller), returnData);

  router.get("/:id/players", checkId, controller.getGamePlayers.bind(controller), returnData);

  router.get("/:id/rooms", checkId, controller.getGameRooms.bind(controller), returnData);

  router.get("/:id/events", checkId, controller.getGameEvents.bind(controller), returnData);

  router.get("/:id/secrets", checkId, controller.getGameSecrets.bind(controller), returnData);

  return router;
}
