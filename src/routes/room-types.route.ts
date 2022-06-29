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

  router.post("/", authVerification, controller.createRoomType, objectCreated);

  router.get("/", authVerification, controller.getAllRoomTypes, returnData);

  router.get("/:id", authVerification, checkId, controller.getRoomType, returnData);

  return router;
}
