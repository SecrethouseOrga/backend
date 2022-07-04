import {
  authVerification,
  checkId,
  objectCreated,
  returnData,
} from "../middlewares";
import {BddService} from "../services";
import {Router} from "express";
import {RoomTypeController} from "../controllers";


export default function(bddService:BddService): Router {
  const controller = new RoomTypeController(bddService);
  const router = Router();

  router.post("/", authVerification, controller.createRoomType.bind(controller), objectCreated);

  router.get("/", controller.getAllRoomTypes.bind(controller), returnData);

  router.get("/:id", checkId, controller.getRoomType.bind(controller), returnData);

  return router;
}
