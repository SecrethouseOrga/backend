import {
  authVerification,
  checkId,
  objectCreated,
  returnData,
} from "../middlewares";
import {BddService} from "../services";
import {Router} from "express";
import {PlayerController} from "../controllers";

export default function(bddService:BddService): Router {
  const controller = new PlayerController(bddService);
  const router = Router();

  router.post("/", authVerification, controller.createPlayer.bind(controller), objectCreated);

  router.get("/:id", checkId, controller.getPlayer.bind(controller), returnData);

  return router;
}
