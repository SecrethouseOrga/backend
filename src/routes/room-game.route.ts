import {authVerification, objectCreated} from "../middlewares";
import {BddService} from "../services";
import {Router} from "express";
import {RoomGameController} from "../controllers";


export default function(bddService:BddService): Router {
  const controller = new RoomGameController(bddService);
  const router = Router();

  router.post("/", authVerification, controller.createRoomGame, objectCreated);

  return router;
}
