import {checkId, objectCreated,} from "../middlewares";
import {BddService} from "../services";
import {Router} from "express";
import {EventController} from "../controllers";

export default function(bddService:BddService): Router {
  const controller = new EventController(bddService);
  const router = Router();

  router.put("/:id", checkId, controller.updateEvent, objectCreated);

  return router;
}
